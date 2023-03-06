class PixiApp {

    static instance = null

    constructor(element, config){

        if(PixiApp.instance != this){
            PixiApp.instance = this
        }

        PixiPlugin.registerPIXI(PIXI)
        gsap.registerPlugin(PixiPlugin)

        let {width, height, background, alpha} = config

        //save width and height setting
        this._appSize = {
            width : width ?? 1334,
            height : height ?? 750
        }

        //create PIXI Application
        this._app = new PIXI.Application({
            hello: false,
            antialias: true,
            autoStart: true,
            autoDensity: true,
            backgroundColor : background ?? 0x000000,
            backgroundAlpha: alpha ?? 1,
            width: width ?? this._appSize.width,
            height: height ?? this._appSize.height,
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
    }

    static create(element, config = {}) {
        return new this(element, config)
    }
    
    add(...child){
        this._mainStage.addChild(...child)
        return this._mainStage
    }

    _resize = () => {
        let ratio = Math.min(window.innerWidth / this._appSize.width, window.innerHeight / this._appSize.height)
        let reX = this._appSize.width * ratio
        let reY = this._appSize.height * ratio

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
        PixiApp.instance = null
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
        return this._appSize
    }
    
    static get App(){
        return this.instance?.App
    }

    static get Ticker(){    
        return this.instance?.Ticker
    }

    static get Stage(){
        return this.instance?.Stage
    }

    static get AppSize(){
        return this.instance?.AppSize
    }

}
