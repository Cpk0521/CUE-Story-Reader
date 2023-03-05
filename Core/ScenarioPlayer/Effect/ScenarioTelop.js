import { AppConfig } from "../config/AppConfig.js";

const TelopStyle = {
    'default' : new PIXI.TextStyle({
        fontFamily: "FOT RodinCattleya Pro DB",
        fill: 0xffffff,
        fontSize: 30,
        letterSpacing: 1,
        dropShadow: true,
        dropShadowAngle: 0,
        dropShadowDistance: 1,
    }),
    'zh' : new PIXI.TextStyle({
        fontFamily: "Notosanstc Medium",
        fill: 0xffffff,
        fontSize: 30,
        letterSpacing: 1,
        dropShadow: true,
        dropShadowAngle: 0,
        dropShadowDistance: 1,
    }),
}

class ScenarioTelop {
    constructor(){
        this._text = new PIXI.Text('Telop', TelopStyle['default'])
        this._text.anchor.set(0.5)
        this._text.position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)
    }

    addTo(parent){
        parent?.addChild(this._text)
    }

    async showText(message){
        this._text.text = message

        let t1 = gsap.timeline()
        return t1.to(this._text, {alpha : 1, duration : .5})
                 .to(this._text, {alpha : 0, duration : .5}, "+=2")
    }
}

export default ScenarioTelop