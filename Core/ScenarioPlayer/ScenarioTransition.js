import { TRANSITIONS_ASSETS_RESOURCE } from '../config/AssetsConfig.js'
// import AssetsCache from '../utils/AssetsCache.js'
import { createEmptySprite } from '../utils/Helper.js'
import { AppConfig } from '../config/AppConfig.js'

class ScenarioTransition extends PIXI.Container {

    _startTransFunc = () => {}
    _endTransFunc = () => {}
    constructor(){
        super()
    }

    static create(){
        return new this()
    }

    transition(id){
        let back 
        let Tran_start = () => {}
        let Tran_end = () => {}

        if(id == 5){
            let T9 = []
            let T4 = []

            back = createEmptySprite({color : 0x000000, alpha : 0})
            this.addChild(back)

            for (let index = 0; index < 4; index++) {
                T9[index] = PIXI.Sprite.from(TRANSITIONS_ASSETS_RESOURCE.T9)
                T9[index].anchor.set(0.5)
                T9[index].position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)
                T9[index].alpha = 0
    
                this.addChild(T9[index])
            }

            let mask = createEmptySprite({alpha : 0})
            this.addChild(mask)

            for (let index = 0; index < 4; index++) {
                T4[index] = PIXI.Sprite.from(TRANSITIONS_ASSETS_RESOURCE.T4)
                T4[index].anchor.set(0.5)
                T4[index].position.set(AppConfig.APP_WIDTH /2 , AppConfig.APP_HIGHT /2)
                T4[index].alpha = 0
    
                this.addChild(T4[index])
            }

            Tran_start = () => {
                let t1 = gsap.timeline()
    
                return t1.to(back, {alpha : 0.4, duration : 1})
                         .to(T9[0], {alpha : 1, duration : 2.5}, '>-0.5')
                         .to(T9[1], {alpha : 1, duration : 1.5}, ">-1")
                         .to(T9[2], {alpha : 1, duration : 1.5}, ">-1")
                         .to(T9[3], {alpha : 1, duration : 1}, ">-1")
                         .to(mask, {alpha : 1, duration : 1}, ">1.5")
            }
    
            Tran_end = () => {
                back.alpha = 0
                T9.map((sprite)=>{
                    sprite.alpha = 0
                })
                T4.map((sprite) => {
                    sprite.alpha = 1
                })
    
                let t1 = gsap.timeline()
                return t1.to(mask, {alpha : 0, duration : 1}, 1)
                         .to(T4[3], {alpha : 0, duration : 1.5}, ">-1")
                         .to(T4[2], {alpha : 0, duration : 1.5}, ">-1")
                         .to(T4[1], {alpha : 0, duration : 1.5}, ">-1")
                         .to(T4[0], {alpha : 0, duration : 1}, ">-1")
    
            }
        }
        else if(id == 4) {
            // 
        }
        else if(id == 3) {
            back = createEmptySprite({color : 0x000000, alpha : 0})
            this.addChild(back)

            Tran_start = () => {
                return gsap.to(back, {
                    alpha : 1,
                    duration : 0.75
                })
            }

            Tran_end = () => {
                return gsap.to(back, {
                    alpha : 0,
                    duration : 2
                })
            }
        }
        else if(id == 2) {
            back = createEmptySprite({alpha : 0})
            this.addChild(back)

            Tran_start = () => {
                return gsap.to(back, {
                    alpha : 1,
                    duration : 1.5
                })
            }

            Tran_end = () => {
                return gsap.to(back, {
                    alpha : 0,
                    duration : 4,
                })
            }
        }
        else if(id == 1) {
            back = createEmptySprite({color : 0x000000, alpha : 0})
            this.addChild(back)

            Tran_start = () => {
                return gsap.to(back, {
                    alpha : 1,
                    duration : 1.5
                })
            }

            Tran_end = () => {
                back.alpha = 1
                return gsap.to(back, {
                    alpha : 0,
                    duration : 4,
                })
            }
        }

        return {start : Tran_start, end : Tran_end}
    }

}

export default ScenarioTransition