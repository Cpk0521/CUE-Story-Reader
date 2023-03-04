import { MENU_ASSETS_RESOURCE } from '../config/AssetsConfig.js'
import AssetsCache from '../utils/AssetsCache.js'

class ScenarioMenu extends PIXI.Container {

    _auto = false
    constructor(){
        super()
    }

    static create(){
        return new this()
    }

    async initialize(){
        this._assets = await AssetsCache.addToCache(MENU_ASSETS_RESOURCE, {
            Label : 'Menu',
            objType : true
        })

        
    }

    get Assets(){
        return this._assets
    }
}

export default ScenarioMenu