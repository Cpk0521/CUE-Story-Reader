import ScenarioAssets from "./ScenarioAssets.js"
import { createEmptySprite } from './ScenarioHelper.js'
import { ADV_WIDTH, ADV_HIGHT } from './ScenarioConfig.js'
import ScenarioExecuter from "./ScenarioExecuter.js"

export class ScenarioTouchScene extends PIXI.Container{

    constructor(){
        super()
        this._init()
    }

    static create(){
        return new this()
    }

    _init(){
        this.interactive = true
        this.cursor = 'pointer';

        let emptysprite = createEmptySprite({color : 0x000000})
        this.addChild(emptysprite)

        let texture = ScenarioAssets.get('Adv', 'TouchScreenText')
        let touchToStart = new PIXI.Sprite(texture);
        touchToStart.anchor.set(0.5);
        touchToStart.position.set(ADV_WIDTH / 2 , ADV_HIGHT / 2);
        this.addChild(touchToStart)

        this.addEventListener('click', this._onclick);
        this.addEventListener('touchstart', this._onclick);
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    _onclick(){
        this._destory()
        ScenarioExecuter.execute('Adv_onTouch')
    }

    _destory(){
        this.removeEventListener('click', this._onclick);
        this.removeEventListener('touchstart', this._onclick);
        this.destroy(true, { children: true });
    }

}

