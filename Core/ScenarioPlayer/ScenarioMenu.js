import { MENU_ASSETS_RESOURCE } from '../config/AssetsConfig.js'

class ScenarioMenu extends PIXI.Container {

    _assets = MENU_ASSETS_RESOURCE
    _auto = false
    constructor(){
        super()
    }

    static create(){
        return new this()
    }

    async initialize(){

    }

    get Assets(){
        return this._assets
    }
}

export default ScenarioMenu