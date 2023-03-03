import { TapEffectConfig } from '../config/TapEffectConfig.js'
import ParticleSystem from '../utils/ParticleSystem.js'

class ScenarioTap extends PIXI.Container {
    
    static create(){
        return new this()
    }

    play(pos){
        this._playEffect(TapEffectConfig, pos)
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    _playEffect(config, position){
        let particleSystem = ParticleSystem.create(config)
        this.addChild(particleSystem.container);
        particleSystem.setPosition(position.x, position.y)
        particleSystem.playOnceAndDestory();
    }

}

export default ScenarioTap