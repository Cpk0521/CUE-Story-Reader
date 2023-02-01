class EndingContainer {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container()

        this._loader.addBundle('EndingAssets', {
            End : './Assets/Images/ui/End.png',
            OpeningEnding_BG : './Assets/Images/ui/ScenarioOpeningEnding_BG.png'
        })
        
        this._init()
    }

    static create(){
        return new this()
    }

    async _init(){
        const Assets = await this._loader.loadBundle('EndingAssets')

        let ratio = (PixiApp.appSize.width / 1334)
        // let scale = (750 * ratio - PixiApp.appSize.height) /2

        let ending = new PIXI.Sprite(Assets.End)
        ending.anchor.set(1, 1);
        ending.position.set(PixiApp.appSize.width - (98 * ratio), PixiApp.appSize.height - (40 * ratio));
        this._container.addChild(ending)

        let underline = new PIXI.NineSlicePlane(Assets.OpeningEnding_BG, 7, 7, 7, 7)
        underline.width = 160 * ratio
        underline.height = 10
        underline.position.set((PixiApp.appSize.width - (160* ratio) - (60 * ratio)) , PixiApp.appSize.height - 10 - (24 * ratio));
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