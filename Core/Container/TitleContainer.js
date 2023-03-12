class TilteContainer {    

    _loader = PIXI.Assets
    constructor(title, style){
        this._container = new PIXI.Container()

        this._loader.addBundle('TitleAssets', {
            OpeningEnding_BG : './Assets/Images/ui/ScenarioOpeningEnding_BG.png',
        })

        this._TitleTextStyle = {
            'normal' : new PIXI.TextStyle({
                fontFamily: "FOT RodinCattleya Pro DB",
                fill: 0xffffff,
                fontSize: 38,
                letterSpacing: 15,
                strokeThickness: 1.5,
            }),
            'zh' : new PIXI.TextStyle({
                fontFamily: "Notosanstc Medium",
                fill: 0xffffff,
                fontSize: 38,
                letterSpacing: 15,
                strokeThickness: 1.5,
            })
        }

        this._init(title, style)
    }

    static create(title, style = 'normal'){
        return new this(title, style)
    }

    async _init(title, style){
        
        const Assets = await this._loader.loadBundle('TitleAssets')
        let ratio = (PixiApp.appSize.width / 1334)

        this._titleText = new PIXI.Text(title, this._TitleTextStyle[style]);
        this._titleText.anchor.set(0.5)
        this._titleText.position.set(PixiApp.appSize.width/2, PixiApp.appSize.height/2 - 1.5)
        this._container.addChild(this._titleText)


        let underline = new PIXI.NineSlicePlane(Assets.OpeningEnding_BG, 7, 7, 7, 7)
        underline.width = 1000 * ratio
        underline.height = 10
        underline.position.set((PixiApp.appSize.width - (1000 * ratio)) /2 , PixiApp.appSize.height/2 + 30);
        this._container.addChild(underline)
    }

    addTo(parent){
        parent?.addChild(this._container)
        return this
    }

    remove(){
        this._container.parent.removeChild(this._container)
    }

    setTitle(title, style = 'normal'){
        this._titleText.text = title
        if(language){
            this._titleText.style = this._messageTextStyle[style]
        }

        return this
    }

}