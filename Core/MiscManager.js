class MiscManager {

    _loader = PIXI.Assets
    constructor(){

        this._TextContainer = new PIXI.Container();
        this._TranContainer = new PIXI.Container();

        this._loader.addBundle('Misc', {
            RodinCattleya_DB : './Assets/Font/FOT_RodinCattleya_Pro_DB.otf',
            RodinCattleya_B : './Assets/Font/FOT_RodinCattleya_Pro_B.otf',
            RodinCattleya_EB : './Assets/Font/FOT_RodinCattleya_Pro_EB.otf',
            NotoSansTC_Medium : './Assets/Font/NotoSansTC_Medium.otf',
            NotoSansTC_Bold : './Assets/Font/NotoSansTC_Bold.otf',
            NotoSansTC_Black : './Assets/Font/NotoSansTC_Black.otf',
        })

        this._loader.loadBundle('Misc')

    }

    async showText(text){

        this._TextContainer.alpha = 0
        this._TextContainer.removeChildren()

        let Text = new PIXI.Text(text, new PIXI.TextStyle({
            fontFamily: "FOT RodinCattleya Pro DB",
            fill: 0xffffff,
            fontSize: 30,
            letterSpacing: 1,
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowDistance: 1,
            strokeThickness: 1.5,
        }));
        Text.anchor.set(0.5)
        Text.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)

        this._TextContainer.addChild(Text)

        let t1 = gsap.timeline()
        return t1.to(this._TextContainer, {alpha : 1, duration : .5})
                 .to(this._TextContainer, {alpha : 0, duration : .5}, "+=2")
    }

    transition(id) {
        this._TranContainer.removeChildren()

        let back 
        let Tran_start = () => {}
        let Tran_end = () => {}

        if(id == 5){
            let T9 = []
            let T4 = []

            back = this._createEmptySprite({color : 0x000000, alpha : 0})
            this._TranContainer.addChild(back)

            for (let index = 0; index < 4; index++) {
                // T9[index] = PIXI.Sprite.from('./Images/misc/T9.png')
                T9[index] = PIXI.Sprite.from('./Assets/Images/misc/T9.png')
                T9[index].anchor.set(0.5)
                T9[index].position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
                T9[index].alpha = 0
    
                this._TranContainer.addChild(T9[index])
            }

            let mask = this._createEmptySprite({alpha : 0})
            this._TranContainer.addChild(mask)

            for (let index = 0; index < 4; index++) {
                // T4[index] = PIXI.Sprite.from('./Images/misc/T4.png')
                T4[index] = PIXI.Sprite.from('./Assets/Images/misc/T4.png')
                T4[index].anchor.set(0.5)
                T4[index].position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
                T4[index].alpha = 0
    
                this._TranContainer.addChild(T4[index])
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
            back = this._createEmptySprite({color : 0x000000, alpha : 0})
            this._TranContainer.addChild(back)

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
            back = this._createEmptySprite({alpha : 0})
            this._TranContainer.addChild(back)

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
            back = this._createEmptySprite({color : 0x000000, alpha : 0})
            this._TranContainer.addChild(back)

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

    _createEmptySprite({color , alpha = 1}){
        let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        sprite.width = PixiApp.appSize.width
        sprite.height = PixiApp.appSize.height
        sprite.anchor.set(0.5)
        sprite.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
        sprite.alpha = alpha
        if(color != undefined) {
            sprite.tint = color
        }

        return sprite
    }

    hideTextContainer(){
        this._TextContainer.visible = false
    }

    hideTranContainer() {
        this._TranContainer.visible = false
    }
    
    get TextContainer() {
        return this._TextContainer
    }

    get TranContainer(){
        return this._TranContainer
    }

}