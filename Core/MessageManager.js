class MessageManager extends PIXI.utils.EventEmitter {

    _loader = PIXI.Assets
    constructor() {
        super()

        this._charMap = new Map()
        this._container = new PIXI.Container();
        this._container.visible = false

        this._loader.addBundle('MessageAssets', {
            nameTag : './Assets/Images/ui/Scenario_NameBg1.png',
            messgaePanel : './Assets/Images/ui/Scenario_TalkPanel.png',
            messgaePanel_long : './Assets/Images/ui/Scenario_TalkPanel_long.png',
            RodinCattleya_DB : './Assets/Font/FOT_RodinCattleya_Pro_DB.otf',
            RodinCattleya_B : './Assets/Font/FOT_RodinCattleya_Pro_B.otf',
            RodinCattleya_EB : './Assets/Font/FOT_RodinCattleya_Pro_EB.otf',
            NotoSansTC_Medium : './Assets/Font/NotoSansTC_Medium.otf',
            NotoSansTC_Bold : './Assets/Font/NotoSansTC_Bold.otf',
            NotoSansTC_Black : './Assets/Font/NotoSansTC_Black.otf',
        })

        this._loader.backgroundLoadBundle('MessageAssets')

        this._NameTextStyle = {
            'normal' : new PIXI.TextStyle({
                fontFamily: "FOT RodinCattleya Pro DB",
                fill: 0xffffff,
                fontSize: 25,
                letterSpacing: 1,
            }),
            'zh' : new PIXI.TextStyle({
                fontFamily: "Notosanstc Medium",
                fill: 0xffffff,
                fontSize: 22.5,
                letterSpacing: 1,
            })
        }

        this._messageTextStyle = {
            'normal' : new PIXI.TextStyle({
                fontFamily: "FOT RodinCattleya Pro B",
                fill: 0x444444,
                fontSize: 27,
                lineHeight: 37,
            }),
            'zh' : new PIXI.TextStyle({
                fontFamily: "Notosanstc Bold",
                fill: 0x444444,
                fontSize: 27,
                lineHeight: 37,
            })
        }
    }

    async initialize(data, language = 'normal') {

        let default_data = Heroine[0]
        this._charMap.set(0, default_data)

        let NPC_data = Heroine[100]
        this._charMap.set(100, NPC_data)

        data.map((_d)=>{
            let hero_data = Heroine[_d.heroineId]
            this._charMap.set(_d.dataId, hero_data)
        })

        const Assets = await this._loader.loadBundle('MessageAssets')

        // // //message text width:1000 height:80 m_AnchoredPosition y:-11
        // this._messgaePanel = new PIXI.NineSlicePlane(Assets.messgaePanel, 19, 10, 19, 10)
        this._messgaePanel = new PIXI.Sprite(Assets.messgaePanel_long)
        this._messgaePanel.width = 1100
        this._messgaePanel.height = 142
        this._messgaePanel.position.set((PixiApp.appSize.width - 1100)/2 , PixiApp.appSize.height * .78)
        // this._messgaePanel.position.set(190 , 560)
        this._container.addChild(this._messgaePanel)

        this._messageText = new PIXI.Text('', this._messageTextStyle['normal'])
        this._messageText.position.set(45, 35)
        this._messgaePanel.addChild(this._messageText)

        this._nameTag = []

        for (let index = 0; index < 4; index++) {
            
            let nameTag = new PIXI.NineSlicePlane(Assets.nameTag, 5, 5, 5, 5)
            nameTag.width = 227
            nameTag.height = 40
            nameTag.position.set((PixiApp.appSize.width - 1100)/2 + 30 + ((227 + 10) * index), PixiApp.appSize.height * .76)
            nameTag.tint = 0x7d7d7d
            this._container.addChild(nameTag)

            let messageNameText = new PIXI.Text('名前', this._NameTextStyle['normal']);
            messageNameText.anchor.set(0.5)
            messageNameText.position.set(nameTag.width/2, nameTag.height/2 - 1.5)
            nameTag.addChild(messageNameText)

            if(index > 0){
                nameTag.visible = false
            }

            this._nameTag.push({nameTag : nameTag, messageNameText : messageNameText})
        }

        if(language == 'zh') {
            this.switchStyle(language)
        }
        
        // this.visible = true

        return Promise.resolve()
    }

    async singleShow(id, message, txtname=''){
        console.log(id, message)

        if(!this.visible) {
            this.visible = true
        }

        for (let index = 1; index < this._nameTag.length; index++) {
            this._nameTag[index].visible = false;
        }

        let {name, ImageColor} = this._charMap.get(id)
        this._setTagColor(ImageColor)
        if(id == 0 || id == 100) {
            this._setTagName(txtname)
        }else {
            this._setTagName(name)
        }
        // this._setTextContent(message)
        return this._typewriteEffect(message, 50)
    }

    async multiShow(heros, message, translate = false){

        if(!this.visible) {
            this.visible = true
        }

        for (let index = 0; index < heros.length; index++) {
            let heroineID = translate ? heros[index] : heros[index].id
            let {name, ImageColor} = this._charMap.get(heroineID)
            this._setTagColor(ImageColor, index)
            this._setTagName(name, index)
        }

        // this._setTextContent(message)
        return this._typewriteEffect(message, 50)
    }

    async hide(){
        for (let index = 1; index < this._nameTag.length; index++) {
            this._nameTag[index].visible = false;
        }

        this.visible = false
    }

    async _typewriteEffect(message, time){
        return new Promise((res, rej)=>{
            let string = ''
            let index = 0

            let timeout = setInterval(()=>{
                if(index === message.length){
                    clearInterval(timeout)
                    res()
                }
            
                string += message.charAt(index)
                this._setTextContent(string)
                index += 1
            }, time)
        })
    }

    /**
     * 清除對話
     */
    _clearContent(){
        this._messageText.text = ''
    }

    /**
     * 更改內容
     * @param {string} content 
     */
    _setTextContent(content = ''){
        this._messageText.text = content
    }

    /**
     * 更改Name Tag名稱
     * @param {string} name 人物名稱 
     * @param {number} index 
     */
    _setTagName(name = '名前', index = 0){
        // this._messageNameText.text = name
        this._nameTag[index].messageNameText.text = name
    }
    
    /**
     * 更改Name Tag顏色
     * @param {number} color 
     * @param {number} index
     */
    _setTagColor(color, index = 0){
        // this._nameTag.tint = color
        this._nameTag[index].nameTag.tint = color
    }
 
    /**
     * 更換字體
     * @param {string} style 
     */
    switchStyle(style = 'normal'){
        this._nameTag.forEach(nametag => {
            nametag.messageNameText.style = this._NameTextStyle[style]
        });
        this._messageText.style = this._messageTextStyle[style]
    }


    set visible(bool) {
        this._container.visible = bool
    } 

    get container() {
        return this._container
    }
}   


const Heroine = {
    0 : {
        name: '',
        ImageColor : 0x7d7d7d,
        unitid: 0
    },
    100 : {
        name: 'NPC',
        ImageColor : 0x229aa1,
        unitid: 0
    },
    1: {
        name: '六石陽菜',
        ImageColor : 0xf49bac,
        unitid: 1
    },
    2: {
        name: '鷹取舞花',
        ImageColor : 0xffda3c,
        unitid: 1
    },
    3: {
        name: '鹿野志穂',
        ImageColor : 0xd0d20c,
        unitid: 1
    },
    4: {
        name: '月居ほのか',
        ImageColor : 0x15aedd,
        unitid: 1
    },

    5: {
        name : '天童悠希',
        ImageColor : 0xff9800,
        unitid: 2
    },
    6: {
        name : '赤川千紗',
        ImageColor : 0xf25184,
        unitid: 2
    },
    7: {
        name : '恵庭あいり',
        ImageColor : 0x81c5ee,
        unitid: 2
    },
    8: {
        name : '九条柚葉',
        ImageColor : 0xa369a9,
        unitid: 2
    },

    9: {
        name:'夜峰美晴',
        ImageColor : 0x64b992,
        unitid: 3
    },
    10: {
        name:'神室絢',
        ImageColor : 0x00abd7,
        unitid: 3
    },
    11: {
        name:'宮路まほろ',
        ImageColor : 0xf18788,
        unitid: 3
    },
    12: {
        name:'日名倉莉子',
        ImageColor : 0xf89569,
        unitid: 3
    },

    13: {
        name:'丸山利恵',
        ImageColor : 0xd10026,
        unitid: 4
    },
    14: {
        name:'宇津木聡里',
        ImageColor : 0x004f91,
        unitid: 4
    },
    15: {
        name:'明神凛音',
        ImageColor : 0xffb000,
        unitid: 4
    },
    16: {
        name:'遠見鳴',
        ImageColor : 0xad0061,
        unitid: 4
    },
    101: {
        name:'鳳真咲',
        ImageColor : 0x2199a0,
        unitid: 5
    },
    102: {
        name:'五十鈴りお',
        ImageColor : 0x2199a0,
        unitid: 5
    },
    103: {
        name:'由良桐香',
        ImageColor : 0x2199a0,
        unitid: 5
    },

}