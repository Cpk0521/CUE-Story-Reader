import { getL2dSrc, getBGSrc, getImageSrc, 
        getMovieSrc, getAudioSrc, getBGMAudioSrc,
        getSEAudioSrc, getTranslateSrc} from '../utils/ResourcePath.js'

import { Loader } from '../utils/AssetsCache.js'

class ScenarioScript {

    constructor(ScenarioScript){

        //scenario Detail
        this._StoryType = ScenarioScript.storyType
        this._StoryId = ScenarioScript.storyID
        this._StoryPhaseID = ScenarioScript.phase
        this._StoryHeroineID = ScenarioScript.heroineId
        this._Storytitle = ScenarioScript.title
        this._CommandSet = ScenarioScript.mainCommands
        this._Assets = ScenarioScript.Assets
        this._AllAssets = this._loadAllAssets()

        //Command Counter
        this._current = -1
        this._isEnd = false

        //Translate
        this._Translatebundle = null
        this._supportedLanguages = []
        this._isTranslate = false
        this._TranLang = 'default'
    }

    static create(ScenarioScript){
        return new this(ScenarioScript)
    }

    /**
     * 
     * @param {string | string[]} languages 
     */
    // async languageSupport(languages){
    //     let url = getTranslateSrc(this._StoryType, this._StoryId, this._StoryPhaseID, this._StoryHeroineID)
    //     let _languageScript = await Loader.load(url)
    //     .then((json)=>{
    //         this._Translatebundle = json
    //         console.log(json)
    //         this._supportedLanguages = this._supportedLanguages.concat(languages)
    //     })
    //     .catch(()=>{{
    //         return
    //     }})
    // }

    next(){
        if((this._current + 1) >= this._CommandSet.length) {
            this._isEnd = true
            return undefined
        }

        this._current += 1
        return this.currentCommand
    }

    jumpTo(index){
        let i = index > this._currIndex ? this._current + 1 : 0
        for (i; i < this._CommandSet.length; i++) {
            if(this._CommandSet[i].index === index) {
                this._current = i
                return this.currentCommand
            }
        }

        return undefined
    }

    destory(){
        //scenario Detail
        this._StoryType = ''
        this._StoryId = ''
        this._StoryPhaseID = 0
        this._StoryHeroineID = 0
        this._Storytitle = ''
        this._CommandSet = []
        this._current = -1

        //Command Counter
        this._current = -1
        this._isEnd = false

        //Translate
        this._isTranslate = false
        this._TranLang = 'normal'
    }

    Hero_Show_Order(){
        let list = []
        this._CommandSet.map((com) => com.subCommands.map((subcom)=>{
            if(subcom.commandType == 11){
                list.push(subcom.id)
            }
        }))

        return list
    }

    _loadAllAssets(){
        let _assetsResult = {}
        let {heroines, backgrounds, bgmIds, movieNames} = this._Assets

        //heroines
        _assetsResult['Heroines'] = {}
        heroines.forEach(hero => {
            let src = getL2dSrc(hero.heroineId, hero.costumeId)
            if(src){
                _assetsResult['Heroines'][hero.dataId] = src
            }
        });

        //backgrounds
        _assetsResult['Backgrounds'] = {}
        backgrounds.forEach(bg => {
            let src = getBGSrc(bg.id, bg.subId)
            if(src){
                _assetsResult['Backgrounds'][`${bg.id}_${bg.subId}`] = src
            }
        });

        //bgmIds
        _assetsResult['BGM'] = {}
        bgmIds.forEach(bgm => {
            let src = getBGMAudioSrc(bgm)
            if(src){
                _assetsResult['BGM'][`${bgm}`] = src
            }
        });

        //movieNames
        _assetsResult['Movie'] = {}
        movieNames.forEach(movie => {
            let src = getMovieSrc(movie)
            if(src){
                _assetsResult['Movie'][movie] = src
            }
        });

        //voice && SE && Image
        _assetsResult['Voice'] = {}
        _assetsResult['SE'] = {}
        _assetsResult['Image'] = {}
        this._CommandSet.forEach( command => {
            //4 & 6
            let {commandType, values, voieCueName, subCommands} = command

            if(commandType == 4){
                let voiceIndex = values[0] == 0? voieCueName : values[0]
                let src = getAudioSrc(voiceIndex, this._StoryType, this._StoryId, this._StoryPhaseID, this._StoryHeroineID)
                if(src){
                    _assetsResult['Voice'][voiceIndex] = src
                }
            }

            if(commandType == 6){
                let isvoice =  values.length > 1 ? values[0] > 0 : false
                if(isvoice){
                    let src = getAudioSrc(values[0], this._StoryType, this._StoryId, this._StoryPhaseID, this._StoryHeroineID)
                    if(src){
                        _assetsResult['Voice'][values[0]] = src
                    }
                }
            }

            subCommands.forEach(sub => {

                let {commandType, id, isActive} = sub

                if(commandType == 23 || commandType == 24){
                    if(!_assetsResult['SE'][id]){
                        let src = getSEAudioSrc(id)
                        if(src){
                            _assetsResult['SE'][id] = src
                        }
                    }
                }
    
                if(commandType == 26){
                    if(isActive == 1) {
                        let src = getImageSrc(this._StoryId, id)
                        if(src){
                            _assetsResult['Image'][id] = src
                        }
                    }
                }
            })
        })

        return _assetsResult
    }

    get FullAssets(){
        return this._AllAssets
    }

    get Assets(){
        return this._Assets
    }

    get heroSet(){
        const _charMap = new Map() 
        _charMap.set(0, HeroineConfig[0])
        _charMap.set(100, HeroineConfig[100])
        this._Assets.heroines?.map((hero)=>{
            let hero_data = HeroineConfig[hero.heroineId]
            _charMap.set(hero.dataId, hero_data)
        })
        return _charMap
    }

    get isTranslate(){
        return this._isTranslate
    }

    get currentCommand(){
        return this._CommandSet[this._current]
    }

    get nextCommand() {
        return this._CommandSet[this._current + 1]
    }

    get StoryType(){
        return this._StoryType
    }

    get StoryId(){
        return this._StoryId
    }

    get StoryPhaseID(){
        return this._StoryPhaseID
    }

    get StoryHeroineID(){
        return this._StoryHeroineID
    }

    get Storytitle(){
        return this._Storytitle
    }

    get IsEnd(){
        return this._isEnd
    }
}

export default ScenarioScript