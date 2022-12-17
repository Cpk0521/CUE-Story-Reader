class StillManager {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container();
        this._container.visible = false

    }

    async show(src) {
        this._container.removeChildren()
        await this._loader.load(src).then((img)=>{
            this._stillImage = PIXI.Sprite.from(img)

            let ratio = (GameApp.appSize.width / 1334)

            this._stillImage.width = 1334 * ratio
            this._stillImage.height = 750 * ratio
            this._stillImage.anchor.set(0.5)
            this._stillImage.position.set(GameApp.appSize.width /2 , GameApp.appSize.height /2)

            this._container.addChild(this._stillImage)
        })

        this._container.visible = true
        return Promise.resolve()
    }

    async hide(){
        this._container.visible = false
    }

    get container() {
        return this._container
    }
}