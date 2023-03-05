import AssetsCache from '../utils/AssetsCache.js'
import { createEmptySprite } from '../utils/Helper.js'
import { AppConfig } from "../config/AppConfig.js";

export const ImageConfig = {
    width : 1334,
    height : 750,
}

class ScenarioStill extends PIXI.Container {

    _imageMap = new Map()
    constructor(){
        super()
        this.visible = false
    }

    static create(){
        return new this()
    }

    async initialize(imageAssets){
        let _image = await AssetsCache.addToCache(imageAssets, {Label : 'Image'})
        
        let ratio = Math.min(AppConfig.APP_WIDTH / ImageConfig.width, AppConfig.APP_HIGHT / ImageConfig.height)

        _image.forEach(_i => {
            let {name, asset} = _i
            let _imageSprite = PIXI.Sprite.from(asset)
            _imageSprite.width = ImageConfig.width * ratio
            _imageSprite.height = ImageConfig.height * ratio
            _imageSprite.anchor.set(0.5)
            _imageSprite.position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)

            this._imageMap.set(name, _imageSprite)
        });

    }

    displayImage(id) {
        this.removeChildren()
        this.visible = true

        let image = this._imageMap.get(id)

        if(!image){
            let sprite = createEmptySprite({color : 0xFFFFFF})
            this.addChild(sprite)

            let Text = new PIXI.Text('カード画像', new PIXI.TextStyle({
                fill: 0x000000,
                fontSize: 30,
                letterSpacing: 1,
                dropShadow: true,
                dropShadowAngle: 0,
                dropShadowDistance: 1,
            }));
            Text.anchor.set(0.5)
            Text.position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)
            this.addChild(Text)

            return 
        }

        this.addChild(image)
    }

    async hide(){
        this.removeChildren()
        this.visible = false
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

}

export default ScenarioStill