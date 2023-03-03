import { AppConfig, DEFAULT_WIDTH, DEFAULT_HIGHT } from '../config/AppConfig.js'

export class PixiAppClass {

    constructor(){
        PixiPlugin.registerPIXI(PIXI)
        gsap.registerPlugin(PixiPlugin)
    }

    create(element, {width, height, background, alpha}) {

        //save width and height setting
        AppConfig.APP_WIDTH = width ?? DEFAULT_WIDTH
        AppConfig.APP_HIGHT = height ?? DEFAULT_HIGHT

        //create PIXI Application
        this._app = new PIXI.Application({
            hello: false,
            antialias: true,
            autoStart: true,
            autoDensity: true,
            backgroundColor : background ?? 0x000000,
            backgroundAlpha: alpha ?? 1,
            width: width ?? AppConfig.APP_WIDTH,
            height: height ?? AppConfig.APP_HIGHT,
        })
        //add To HTML element
        element?.appendChild(this._app.view);

        //create main Container and add To Application
        this._mainStage = new PIXI.Container()
        this._mainStage.interactive = true 
        this._app.stage.addChild(this._mainStage)

        //ticker
        this._ticker = PIXI.Ticker.shared;
        this._ticker.autoStart = true

        //resize the stage
        this._resize();
        window.addEventListener('resize', this._resize)

        window.addEventListener('visibilitychange', this._emitUpdate)
                
        return this
    }
    
    add(...child){
        this._mainStage.addChild(...child)
        return this._mainStage
    }

    _resize = () => {
        let ratio = Math.min(window.innerWidth / AppConfig.APP_WIDTH, window.innerHeight / AppConfig.APP_HIGHT)
        let reX = AppConfig.APP_WIDTH * ratio
        let reY = AppConfig.APP_HIGHT * ratio

        this._app.view.style.width = reX + 'px';
        this._app.view.style.height = reY + 'px';
    }

    _emitUpdate = () => {
        if(document.visibilityState == 'visible'){
            this._ticker.start()
        }
        else{
            this._ticker.stop()
        }
    }

    destroy(){
        this._app.destroy(true, { children: true, texture: true, baseTexture: true });
        this._app = null
    }

    get App(){
        return this._app
    }

    get Ticker(){
        return this._ticker
    }

    get Stage(){
        return this._mainStage
    }

    get AppSize(){
        return { width : this.App.renderer.width, height : this.App.renderer.height }
    }
}

export const PixiApp = new PixiAppClass()