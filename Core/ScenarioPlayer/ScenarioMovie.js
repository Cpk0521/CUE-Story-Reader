import { createEmptySprite } from '../utils/Helper.js'
import { AppConfig} from '../config/AppConfig.js'
import AssetsCache from '../utils/AssetsCache.js'

export const MovieConfig = {
    width : 1920,
    height : 1080,
}

class ScenarioMovie extends PIXI.Container{

    _movieMap = new Map()
    constructor(){
        super()

        //background
        let bg = createEmptySprite({})
        this.addChild(bg)

        this.visible = false
    }
    
    static create(){
        return new this()
    }

    async initialize(movieAssets){

        let ratio = Math.min(AppConfig.APP_HIGHT / MovieConfig.height, AppConfig.APP_WIDTH / MovieConfig.width)

        let _movies = await AssetsCache.addToCache(movieAssets, {Label : 'Movie'})
        _movies.forEach((_m)=>{
            let {name, asset} = _m

            let videoSprite = new PIXI.Sprite(asset);
            videoSprite.width = MovieConfig.width * ratio
            videoSprite.height = MovieConfig.height * ratio;
            videoSprite.anchor.set(0.5)
            videoSprite.position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)
            
            this._movieMap.set(name, videoSprite)
        })
    }

    async playMovie(label){
        return new Promise((resolve, reject) => {

            if(this.children.length > 1){
                this.removeChildAt(1)
            }

            let videoSprite = this._getMovie(label)

            if(!label || !videoSprite?.texture.valid){
                this.visible = false
                resolve()
            }
            
            this.addChild(videoSprite)
            this.visible = true
            
            let controller = videoSprite.texture.baseTexture.resource.source;
            controller.play()
            controller.onended = ()=>{
                this.removeChild(videoSprite);
                this.visible = false
                resolve()
            }

        })
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    hide(){
        this.visible = false
    }

    _getMovie(label) {
        return this._movieMap.get(label)
    }

    _isExist(label){
        return this._movieMap.has(label)
    }

}

export default ScenarioMovie