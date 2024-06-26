class ScenarioReader extends PIXI.utils.EventEmitter {

    static instance = null
    _loader = PIXI.Assets

    constructor(pixiapp, config){
        super()

        if(ScenarioReader.instance != this) {
            ScenarioReader.instance = this
        }

        //Adv Managers and Contrller
        this._pixiapp = pixiapp
        this._L2dManager = new Live2dManager() //Live2d
        this._BGManager = new backgroundManager() //Background
        this._MessageManager = new MessageManager() //message dialogue
        this._StillManager = new StillManager() // image 
        this._MovieManager = new MoiveManager() // movie
        this._MiscManager = new MiscManager() // Transitions & Text
        this._FilterManager = new FilterManager() // Filter
        
        //Controller
        this._SoundManager = new SoundManager() // sound
        this._TranslateReader = new TranslateReader() //translate
        
        //add to main Container 
        this._pixiapp.mainContainer.addChild(            
            this._FilterManager.addContainer( // add to Filter Container 
                this._BGManager.backcontainer,
                this._L2dManager.container,
                this._BGManager.frontcontainer,
                this._StillManager.container,
            ),
            this._MessageManager.container,
            this._MovieManager.container,
            this._MiscManager.TextContainer,
            this._MiscManager.TranContainer,
        )

        //scenario Detail
        this._StoryType = ''
        this._StoryId = ''
        this._StoryPhase = 0
        this._StoryHeroine = 0
        this._Storytitle = ''
        this._CommandSet = []
        this._hasNext = false

        //Command Counter
        this._current = -1
        this._commIndex = -1
        this._autoplay = true

        //Loading Screen
        this._loadingContainer = LoadingContainer.create()
        this._isLoading = true

        //Translate
        this._isTranslate = false
        this._TranLang = ''

        this.emit('ReaderOnCreated')
    }

    static create(gameapp, config) {
        return new this(gameapp, config)
    }
  
    static loadMasterList(masterlist, language){
        return this.instance?._loadMasterList(masterlist, language)
    }

    async _loadMasterList(masterlist, language) {

        let {storyType, storyID, phase, heroineId, title, hasNext, mainCommands, Assets} = await this._loader.load(masterlist).catch(()=>{
            alert('wromg parameters or please check your network')
        })

        this._loadingContainer.addTo(this._pixiapp.mainContainer)
         
        this._StoryType = storyType
        this._StoryId = storyID
        this._StoryPhase = phase
        this._StoryHeroine = heroineId ?? 0
        this._Storytitle = title
        this._CommandSet = mainCommands 
        this._hasNext = hasNext

        if(language == 'zh' || language == 'eng' ) {
            this._isTranslate = true
            this._TranLang = language
        }

        let AudioUrlSet = { BGM : {}, Voice : {}, SE : {}}
        Assets.bgmIds.forEach(bgm => {
            let src = ResourcePath.getBGMAudioSrc(bgm)
            if(src){
                AudioUrlSet['BGM'][`${bgm}`] = src
            }
        });

        this._CommandSet.forEach((command)=>{
            let {commandType, values, voieCueName, subCommands} = command
            if(commandType == 4){
                let voiceIndex = values[0] == 0? voieCueName : values[0]
                let src = ResourcePath.getAudioSrc(voiceIndex, this._StoryType, this._StoryId, this._StoryPhase, this._StoryHeroine)
                if(src){
                    AudioUrlSet['Voice'][voiceIndex] = src
                }
            }
            if(commandType == 6){
                let isvoice =  values.length > 1 ? values[0] > 0 : false
                if(isvoice){
                    let src = ResourcePath.getAudioSrc(values[0], this._StoryType, this._StoryId, this._StoryPhase, this._StoryHeroine)
                    if(src){
                        AudioUrlSet['Voice'][values[0]] = src
                    }
                }
            }
            subCommands.forEach((sub)=>{
                let {commandType, id} = sub

                if(commandType == 23 || commandType == 24){
                    if(!AudioUrlSet['SE'][id]){
                        let src = ResourcePath.getSEAudioSrc(id)
                        if(src){
                            AudioUrlSet['SE'][id] = src
                        }
                    }
                }
            })
        })

        return Promise.all([
            this._L2dManager.initialize(Assets.heroines, this._checkHeroSort()),
            this._BGManager.initialize(Assets.backgrounds),
            this._MessageManager.initialize(Assets.heroines, this._TranLang),
            this._MovieManager.initialize(Assets.movieNames),
            this._SoundManager.initialize(AudioUrlSet),
            (this._isTranslate ? this._TranslateReader.initialize(ResourcePath.getTranslateSrc(storyType, storyID, phase, heroineId)) : async()=>{})
            // this._BGManager.initialize([{
            //     "id": 98,
            //     "subId": 1
            //   }
            // ]),
        ]).then(async ()=>{
            this.emit('AssestsOnSetUp')

            // this._BGManager.execute(98, 1)
            this._waitingTouch()
        })
    }


    async _waitingTouch(){
        this._isLoading = false
        this._loadingContainer.remove()
        TouchContainer.create().addTo(this._pixiapp.mainContainer).on('onStart', () => this.start())
    }

    async start(){
        console.log('start')

        if(!this._CommandSet){
            return
        }
        
        // this.next()
        for (let index = 0; index < this._CommandSet.length; index++) {
            let _curr = this._CommandSet[index];
            this._current = index
            this._commIndex = _curr.index
            await this._render(_curr)            
        }

        if((this._current + 1) >= this._CommandSet?.length) {
            this._finish()
        }

    }

    async next(){

        this._pixiapp.mainContainer.removeAllListeners()
        this._pixiapp.mainContainer.cursor = ''

        if((this._current + 1) >= this._CommandSet?.length) {
            this._finish()
        }

        for (let index = this._current + 1; index < this._CommandSet.length; index++) {
            let _curr = this._CommandSet[index];
            this._current = index
            this._commIndex = _curr.index
            await this._render(_curr)

            if(_curr.commandType == 4 || _curr.commandType == 5 || _curr.commandType == 7 || _curr.commandType == 10) {
                break
            }
        }

        this._pixiapp.mainContainer.on('click', ()=>this.next())
        this._pixiapp.mainContainer.on('touchstart', () => this.next());
        this._pixiapp.mainContainer.cursor = 'pointer'
    }

    _jumpTo(index){
        let i = index > this._commIndex ? this._current + 1 : 0
        for (i; i < this._CommandSet.length; i++) {
            if(this._CommandSet[i].index == index) {
                break;
            }
        }
        return {command : this._CommandSet[i], index : i}
    }

    _finish() {
        console.log('故事完結')
        // this._destroy()
        if(this._hasNext){
            ToBeContiunedContainer.create().addTo(this._pixiapp.mainContainer)
        }
        else{
            EndingContainer.create().addTo(this._pixiapp.mainContainer)
        }
    }

    _destroy(){
        console.log('destory')
        this._StoryType = ''
        this._StoryId = ''
        this._StoryPhase = 0
        this._StoryHeroine = 0
        this._Storytitle = ''
        this._CommandSet = []
    }

    async _render(command) {
        return await new Promise(async (resolve) => {
            // setTimeout(async()=>{
            //     let {priority, executes, waiting} = this._loadCommand(command)
            //     await Promise.all(priority.map(task => task()))
            //     await Promise.all(executes.map(task => task()))
            //     await this.delay(waiting)
            //     resolve()
            // }, (command.time * 1000)) 
            
            let {priority, second, executes, waiting} = this._loadCommand(command)
            await Promise.all(priority.map(task => task()))
            await Promise.all(second.map(task => task()))
            await Promise.all(executes.map(task => task()))
            await this.delay(waiting + (command.time * 1000))
            resolve()
        })
    }

    _loadCommand(command){
        let {index, commandType, subCommands, values, commandParams, time, id, ...content} = command

        let _priority = [] //最優先
        let _second = [] //次級
        let _executes = [] //正常執行
        let _waiting = 0

        if(subCommands?.length > 0) {
            subCommands?.map((sub)=>{
                let sub_com = this._loadCommand(sub)
                _priority = _priority.concat(sub_com.priority)
                _second = _second.concat(sub_com.second)
                _executes = _executes.concat(sub_com.executes)
                _waiting += sub_com.waiting
            })
        }


        if(commandType == 1){
            // console.log(index, '背景')
            // _executes.push(() => this._BGManager.execute(values[0], values[1]))
            // _executes.push(() => this._SoundManager.playBGMAudio(ResourcePath.getBGMAudioSrc(id)))
            // _executes.push(async() => {
            //     //Title
            //     let title = TilteContainer.create(this._Storytitle).addTo(this._pixiapp.mainContainer)
            //     return this.delay(3000).then(()=>{
            //         title.remove()
            //     })
            // })

            _executes.push(async()=>{
                this._BGManager.execute(values[0], values[1])
                let title = TilteContainer.create(this._Storytitle).addTo(this._pixiapp.mainContainer)
                await this.delay(3000).then(()=>{
                    title.remove()
                })
                // this._SoundManager.playBGMAudio(ResourcePath.getBGMAudioSrc(values[2]))
                let uid = values[2] > 0 ? values[2] : 1
                this._SoundManager.playBGM(uid)
            })
        }
        else if(commandType == 2){
            console.log(index, '故事完結')
        }
        else if(commandType == 3){
            // console.log(index, '匯入live2d')
            //已在L2dManager loadData時 匯入了
            // executes.push(this._L2dManager.ADDToApp(id))
        }
        else if(commandType == 4){
            // console.log(index, '說話')
            let {message, rates, voieCueName} = content

            let voiceIndex = values[0] == 0? voieCueName : values[0]

            _priority.push(() => this._L2dManager.loadAudio(ResourcePath.getAudioSrc(voiceIndex, this._StoryType, this._StoryId, this._StoryPhase, this._StoryHeroine)))
            // _priority.push(() => this._L2dManager.loadAudio(voiceIndex))
            _executes.push(() => this._L2dManager.speaking(id, rates))

            if(this._isTranslate) {
                let log =  this._TranslateReader.getMessageLogsByScenarioIndex(index, this._TranLang)
                
                if(log != undefined){
                    _executes.push(() => this._MessageManager.singleShow(id, log.message, log.name))
                }
            }
            else{
                _executes.push(() => this._MessageManager.singleShow(id, message))
            }

            _waiting += 1000
        }
        else if(commandType == 5){
            // console.log(index, 'マネージャー說話')
            let {message} = content
            
            if(this._isTranslate) {
                let log =  this._TranslateReader.getMessageLogsByScenarioIndex(index, this._TranLang)
                if(log != undefined){
                    _executes.push(() => this._MessageManager.singleShow(id, log.message, log.name))
                }
            }
            else{
                _executes.push(() => this._MessageManager.singleShow(id, message, 'マネージャー'))
            }

            _waiting += 2000
        }
        else if(commandType == 6){
            // console.log(index, '別人說話')
            let {name, message} = content

            let isvoice =  values.length > 1 ? values[0] > 0 : false
            if(isvoice) {
                // _executes.push(() => this._SoundManager.playAudio_Full(ResourcePath.getAudioSrc(values[0], this._StoryType, this._StoryId, this._StoryPhase, this._StoryHeroine))) 
                _executes.push(() => this._SoundManager.playVoice(values[0])) 
            }

            if(this._isTranslate) {
                let log =  this._TranslateReader.getMessageLogsByScenarioIndex(index, this._TranLang)
                if(log != undefined){
                    _executes.push(() => this._MessageManager.singleShow(id, log.message, log.name))
                }
            }
            else{
                _executes.push(() => this._MessageManager.singleShow(id, message, name))
            }

            _waiting += 2000
        }
        else if(commandType == 7){
            // console.log(index, 'audition選擇題')
            // audition
        }
        else if(commandType == 8){
            // console.log(`===========小節結束${index}===========`)
            // console.log(index, '小節')
        }
        else if(commandType == 9){
            // console.log(index, '轉場+轉背景')
            let {start, end} = this._MiscManager.transition(id)
            _priority.push(() => start())
            _executes.push(() => this._BGManager.execute(values[0], values[1]).then(()=> end()))
        }
        else if(commandType == 10){
            // console.log(index, '多人說話')
            let {multiHeroineParams, message} = content
           
            if(this._isTranslate) {
                let log =  this._TranslateReader.getMessageLogsByScenarioIndex(index, this._TranLang)
                if(log != undefined){
                    _executes.push(() => this._MessageManager.multiShow(multiHeroineParams, log.message))
                }
            }
            else{
                _executes.push(() => this._MessageManager.multiShow(multiHeroineParams, message))
            }

            _waiting += 2000
        }

        else if(commandType == 11){
            // console.log(index, 'live2d出場')
            let {fadeTime, rates} = content

            _second.push(async () => {
                await this._L2dManager.action(id, {
                    motion : values[0],
                    expression : values[1],
                    facing : values[2],
                }, true)
                await this.delay(500)//waiting model motion finish
                return Promise.resolve()
            })
            _executes.push(async () => {
                await this.delay(time * 1000)
                await this._L2dManager.display(id, {
                    from_x : values[3],
                    to_x : values[4],
                    fadeTime : fadeTime,
                })
                return Promise.resolve()
            })
        }
        else if(commandType == 12){
            // console.log(index, 'live2d漸變隱藏') 
            //未完成!!!!!!!
            let {fadeTime} = content
            _executes.push(async () => {
                await this.delay(time * 1000)
                return Promise.resolve(this._L2dManager.hide(id, values[0], fadeTime))
            })
        }
        else if(commandType == 13){
            // console.log(index, 'live2d位置移動')
            for (let index = 0; index < commandParams.length; index++) {
                _executes.push(async () => {
                    await this.delay(commandParams[index].time * 1000)
                    await this._L2dManager.moving(id, {
                        newpoint : commandParams[index].values[0],
                        rate : commandParams[index].rate
                    })
                    return Promise.resolve()
                })
            }
        }
        else if(commandType == 14){
            // console.log(index, 'live2d motion動作')   
            for (let index = 0; index < commandParams.length; index++) {
                _executes.push(async() => {
                    await this.delay(commandParams[index].time * 1000)
                    await this._L2dManager.action(id, {
                        motion : commandParams[index].values[0],
                        expression : commandParams[index].values[1],
                        facing : commandParams[index].values[2],
                    })
                    await this.delay(1000)//waiting model motion finish
                    return Promise.resolve()
                })
            }
        }
        else if(commandType == 15){
            console.log(index, '???')
            // console.log('<----------------------------------')
            for (let index = 0; index < commandParams.length; index++) {
                _executes.push(async() => {
                    await this.delay(commandParams[index].time * 1000)
                    return Promise.resolve()
                })
            }
        }
        else if(commandType == 16){
            // console.log(index, 'live2d頭部角度')                
            for (let index = 0; index < commandParams.length; index++) {
                _executes.push(async()=>{
                    await this.delay(commandParams[index].time * 1000)
                    await this._L2dManager.lookAt(id, commandParams[index].values[0])
                    return Promise.resolve()
                })
            }
        }
        else if(commandType == 17){
            // console.log(index, 'live2d眼睛閉合')
            for (let index = 0; index < commandParams.length; index++) {
                _executes.push(async() => {
                    await this.delay(commandParams[index].time * 1000)
                    await this._L2dManager.closeEyes(id, commandParams[index].values[0])
                    return Promise.resolve()
                })
            }
        }
        else if(commandType == 18){
            // console.log(index, 'live2d消失')
            _priority.push(() => this._L2dManager.hideAll())
        }

        else if(commandType == 21){
            // console.log(index, '???')
        }
        else if(commandType == 22){
            // console.log(index, '背景遮罩')
            let {isActive} = content
            _executes.push(async() => {
                await this.delay(time * 1000)
                if(isActive == 1) {                    
                    await this._FilterManager.showMask(id)
                } 
                else if(isActive == 0){
                    await this._FilterManager.hideMask(id)
                }
                return Promise.resolve()
            })

        }
        else if(commandType == 23){
            // console.log(index, '播放音效')
            _executes.push(async() => {
                await this.delay(time * 1000)
                // await this._SoundManager.playSEAudio_Full(ResourcePath.getSEAudioSrc(id))
                await this._SoundManager.playSE_Full(id)
                return Promise.resolve()
            })

        }
        else if(commandType == 24){
            // console.log(index, '播放SE(可控制)')
            let {isActive} = content
            if(isActive == 0) {
                _executes.push(() => this._SoundManager.pause('SE'))
            }
            if(isActive == 1) {
                // _executes.push(() => this._SoundManager.playSEAudio_Part(ResourcePath.getSEAudioSrc(id)))
                _executes.push(() => this._SoundManager.playSE_Part(id))
            }
        }
        else if(commandType == 25){
            // console.log(index, 'BGM切換')
            let {isActive} = content
            if(isActive == 0) {
                _executes.push(() => this._SoundManager.pause('BGM'))
            }
            if(isActive == 1) {
                // _executes.push(() => this._SoundManager.playBGMAudio(ResourcePath.getBGMAudioSrc(id)))
                _executes.push(() => this._SoundManager.playBGM(id))
            }
        }
        else if(commandType == 26){
            // console.log(index, '卡片圖')
            // console.log('!!!!!')
            let {isActive} = content
            if(isActive == 1) {
                _executes.push(() => this._StillManager.show(ResourcePath.getImageSrc(this._StoryId, id)))
            }
            if(isActive == 0) {
                _executes.push(() => this._StillManager.hide())
            }
        }
        else if(commandType == 27){
            // console.log(index, '對話框隱藏')
            _priority.push(() => this._MessageManager.hide())
        }
        else if(commandType == 29){
            // console.log(index, '???')
        }
        else if(commandType == 30){
            // console.log(index, '播卡片動畫')
            let {name} = content
            _executes.push(()=> this._MovieManager.show(name))
        }
        else if(commandType == 31){
            // console.log(index, '中間出字')
            let {name} = content
            if(this._isTranslate) {
                let log =  this._TranslateReader.getTextByScenarioIndex(index, this._TranLang)
                if(log != undefined){
                    _executes.push(()=> this._MiscManager.showText(log.text))
                }
            }
            else{
                _executes.push(()=> this._MiscManager.showText(name))
            }

        }
        else if(commandType == 32){
            // console.log(index, '???')

        }

        else if(commandType == 101){
            // console.log(index, '???')
        }
        else if(commandType == 102){
            // console.log(index, '???')
        }
        else if(commandType == 103){
            // console.log(index, '???')
        }
        else if(commandType == 104){
            // console.log(index, '???')
        }
        else if(commandType == 105){
            // console.log(index, '???')
        }
        else if(commandType == 106){
            // console.log(index, '???')
        }
        else if(commandType == 107){
            // console.log(index, '???')
        }

        else if(commandType == 201){
            // console.log(index, '???')
        }
        else if(commandType == 202){
            // console.log(index, '???')
        }

        return {priority: _priority, second : _second, executes : _executes, waiting : _waiting}
    }

    delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    _checkHeroSort(){
        let list = []
        this._CommandSet.map((com) => com.subCommands.map((subcom)=>{
            if(subcom.commandType == 11){
                list.push(subcom.id)
            }
        }))

        return list
    }

    static get Managers() {
        return this.instance.Controllers
    }

    get Managers() {
        return {
            L2dManager : this._L2dManager,
            BGManager : this._BGManager,
            MessageManager : this._MessageManager,
            StillManager : this._StillManager,
            SoundManager : this._SoundManager,
            TranslateReader : this._TranslateReader
        }   
    }

    static get StoryDetail() {
        return this.instance.StoryDetail
    }

    get StoryDetail(){
        return {
            type : this._StoryType,
            id : this._StoryId,
            phase : this._StoryPhase,
            title : this._Storytitle,
            heroine : this._StoryHeroine
        }
    }
}

