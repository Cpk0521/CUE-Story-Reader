class StillManager {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container();
        this._container.visible = false
    }

    async show(src) {
        this._container.removeChildren()
        let image =  await this._loader.load(src).catch(()=>{
            return Promise.resolve()
        })

        if(!image){

            let sprite = this._createEmptySprite({color : 0x000000})//沒有卡圖時 按Naztar大佬的要求弄的黑屏
            this._container.addChild(sprite)

            // let text = src.split('/').pop()
            // let Text = new PIXI.Text(text, new PIXI.TextStyle({
            //     fill: 0x000000,
            //     fontSize: 30,
            //     letterSpacing: 1,
            //     dropShadow: true,
            //     dropShadowAngle: 0,
            //     dropShadowDistance: 1,
            // }));
            // Text.anchor.set(0.5)
            // Text.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
            // this._container.addChild(Text)

            this._container.visible = true
            return Promise.resolve()
        }

        let ratio = (PixiApp.appSize.width / 1334)
        
        this._stillImage = PIXI.Sprite.from(image)
        this._stillImage.width = 1334 * ratio
        this._stillImage.height = 750 * ratio
        this._stillImage.anchor.set(0.5)
        this._stillImage.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)

        this._container.addChild(this._stillImage)

        this._container.visible = true
        return Promise.resolve()
    }

    _createEmptySprite({color , alpha = 1}){
        let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        sprite.width = PixiApp.appSize.width
        sprite.height = PixiApp.appSize.height
        sprite.anchor.set(0.5)
        sprite.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
        sprite.alpha = alpha
        if(color != undefined) {
            sprite.tint = color
        }

        return sprite
    }

    async hide(){
        this._container.visible = false
    }

    get container() {
        return this._container
    }
}