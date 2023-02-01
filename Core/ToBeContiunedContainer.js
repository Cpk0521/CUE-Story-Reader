class ToBeContiunedContainer {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container()

        this._loader.addBundle('ToBeContiunedAssets', {
            ToBeContiuned : './Assets/Images/ui/Tobecontinued.png',
            OpeningEnding_BG : './Assets/Images/ui/ScenarioOpeningEnding_BG.png'
        })
        
        this._init()
    }

    static create(){
        return new this()
    }

    async _init(){
        const Assets = await this._loader.loadBundle('ToBeContiunedAssets')

        let ratio = (PixiApp.appSize.width / 1334)
        // let scale = (750 * ratio - PixiApp.appSize.height) /2

        let ToBeContiuned = new PIXI.Sprite(Assets.ToBeContiuned)
        ToBeContiuned.width = 303 * ratio
        ToBeContiuned.height = 32
        ToBeContiuned.anchor.set(1, 1);
        ToBeContiuned.position.set(PixiApp.appSize.width - (58 * ratio), PixiApp.appSize.height - (40 * ratio));
        this._container.addChild(ToBeContiuned)

        let underline = new PIXI.NineSlicePlane(Assets.OpeningEnding_BG, 7, 7, 7, 7)
        underline.width = 380 * ratio
        underline.height = 10
        underline.position.set((PixiApp.appSize.width - (380* ratio) - (20 * ratio)) , PixiApp.appSize.height - 10 - (24 * ratio));
        this._container.addChild(underline)

    }

    addTo(parent){
        parent?.addChild(this._container)
        return this
    }

    remove(){
        this._container.parent.removeChild(this._container)
    }
}