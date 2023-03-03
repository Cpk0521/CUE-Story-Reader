import { MESSAGE_ASSETS_RESOURCE } from '../config/AssetsConfig.js'
import AssetsCache from '../utils/AssetsCache.js'
import { AppConfig } from '../config/AppConfig.js'
import { HEROINE_CONFIG } from '../config/HeroineConfig.js'

class ScenarioMessage extends PIXI.Container {

    _charMap = new Map()
    _NameTextStyle = {
        'default' : new PIXI.TextStyle({
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
    _MessTextStyle = {
        'default' : new PIXI.TextStyle({
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
    constructor(){
        super()

        this.visible = false
    }

    static create(){
        return new this()
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    async initialize(HeroData, language = 'default'){
        this._aseets = await AssetsCache.addToCache(MESSAGE_ASSETS_RESOURCE, {Label : 'Message', objType : true})
        
        //Charactor Map setup 
        this._charMap.set(0, HEROINE_CONFIG[0])
        this._charMap.set(100, HEROINE_CONFIG[100])
        HeroData?.map((hero)=>{
            let hero_data = HEROINE_CONFIG[hero.heroineId]
            this._charMap.set(hero.dataId, hero_data)
        })

        //Message Panel setup
        this._messagePanel = new PIXI.Sprite(this._aseets.messgaePanel_long)
        this._messagePanel.width = 1100
        this._messagePanel.height = 142
        this._messagePanel.position.set((AppConfig.APP_WIDTH - 1100)/2 , AppConfig.APP_HIGHT * .78)
        // this._messagePanel.position.set(190 , 560)
        this.addChild(this._messagePanel)

        //Message Text setup
        this._messageText = new PIXI.Text('', this._MessTextStyle['default'])
        this._messageText.position.set(45, 35)
        this._messagePanel.addChild(this._messageText)
        
        //Name Tag setup
        this._nameTag = []
        for (let index = 0; index < 4; index++) {
            let nameTag = new PIXI.NineSlicePlane(this._aseets.nameTag, 5, 5, 5, 5)
            nameTag.width = 227
            nameTag.height = 40
            nameTag.position.set((AppConfig.APP_WIDTH - 1100)/2 + 30 + ((227 + 10) * index), AppConfig.APP_HIGHT * .76)
            nameTag.tint = 0x7d7d7d
            this.addChild(nameTag)

            let nameText = new PIXI.Text('名前', this._NameTextStyle['default']);
            nameText.anchor.set(0.5)
            nameText.position.set(nameTag.width/2, nameTag.height/2 - 1.5)
            nameTag.addChild(nameText)

            if(index > 0){
                nameTag.visible = false
            }

            this._nameTag.push({nameTag : nameTag, nameText : nameText})
        }

        //Language
        if(language != 'default') {
            this.switchStyle(language)
        }
    }

    singleHeroMessage(TalkerId, message, TalkerName = ''){

        if(!this.visible) {
            this.visible = true
        }

        for (let index = 1; index < this._nameTag.length; index++) {
            this._nameTag[index].visible = false;
        }

        let {name, ImageColor} = this._charMap.get(TalkerId)
        this._setTagColor(ImageColor)
        if (TalkerId == 0 || TalkerId == 100){
            this._setTagName(TalkerName)
        }
        else{
            this._setTagName(name)
        }

        this._setTextContent(message)
    }

    multiHeroMessage(Talkers, message){
        if(!this.visible) {
            this.visible = true
        }

        for (let index = 0; index < Talkers.length; index++) {
            let TalkerId = translate ? Talkers[index] : Talkers[index].id
            let {name, ImageColor} = this._charMap.get(TalkerId)
            this._setTagColor(ImageColor, index)
            this._setTagName(name, index)
        }

        this._setTextContent(message)
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
        this._nameTag[index].nameText.text = name
    }

    /**
     * 更改Name Tag顏色
     * @param {number} color 
     * @param {number} index
     */
    _setTagColor(color, index = 0){
        this._nameTag[index].nameTag.tint = color
    }

    /** 
     * 更換字體
     * @param {string} style 
     */
    switchStyle(style = 'default'){
        this._nameTag.forEach(nametag => {
            nametag.nameText.style = this._NameTextStyle[style]
        });
        this._messageText.style = this._MessTextStyle[style]
    }

}

export default ScenarioMessage