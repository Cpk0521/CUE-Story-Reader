import { ASSETS_RESOURCE, FONT_RESOURCE } from '../config/AppConfig.js'

const loader = PIXI.Assets

export class ScenarioAssetsCacheClass {

    _cache = {}
    addAssets(){}
    removeAssets(){}
    get(){}
    has(){}

    get Cache(){
        return this._cache
    }
}

export const AssetsCache = new ScenarioAssetsCacheClass()