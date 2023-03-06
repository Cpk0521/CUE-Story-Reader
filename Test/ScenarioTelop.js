import { AppConfig } from "../Core/config/AppConfig.js";

class ScenarioTelop extends PIXI.Container{

    constructor(){
        super()
        
        this._text = new PIXI.Text('TEXT', new PIXI.TextStyle({
            fontFamily: "FOT RodinCattleya Pro DB",
            fill: 0xffffff,
            fontSize: 30,
            letterSpacing: 1,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 1,
        }));
        this._text.anchor.set(0.5)
        this._text.position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)

        this.addChild(this._text)
    }

    static create(){
        return new this()
    }

    async showText(message){
        this._text.text = message

        let t1 = gsap.timeline()
        return t1.to(this, {alpha : 1, duration : .5})
                 .to(this, {alpha : 0, duration : .5}, "+=2")
    }

}

export default ScenarioTelop
