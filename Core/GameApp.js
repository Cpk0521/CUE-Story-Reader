class GameApp extends PIXI.utils.EventEmitter {

    static instance = null

    constructor(element, {width, height, background, alpha}){
        super()

        //set instance
        if(GameApp.instance != this){
            GameApp.instance = this
        }

        this._width = width
        this._height = height
        
        //create PIXI Application
        this._app = new PIXI.Application({
            hello: false,
            antialias: true,
            autoStart: true,
            autoDensity: true,
            backgroundColor : background ?? 0x000000,
            backgroundAlpha: alpha || 1,
            width: width ?? 1480,
            height: height ?? 720,
        })
        //add To HTML element
        element?.appendChild(this._app.view);

        //create main Container and add To Application
        this._mainContainer = new PIXI.Container()
        this._mainContainer.interactive = true 
        this._app.stage.addChild(this._mainContainer)

        //ticker
        this._ticker = PIXI.Ticker.shared;
        this._ticker.autoStart = true

        //resize the PIXI Application and add event listener
        this._resize();
        window.addEventListener('resize', this._resize)

    }

    static create(element, config = {}) {
        return new this(element, config)
    }

    _resize = () => {
        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;

        let ratioX = width / (this._width ?? 1480)
        let ratioY = height / (this._height ?? 720)

        let reX = 0;
        let reY = 0;

        if(ratioX > ratioY){
            reX = (this._width ?? 1480) * ratioY 
            reY = (this._height ?? 720) * ratioY
        }else{
            reX = (this._width ?? 1480) * ratioX
            reY = (this._height ?? 720) * ratioX
        }

        this._app.view.style.width = reX + 'px';
        this._app.view.style.height = reY + 'px';

        this.emit('AppOnResized')
    }

    destroy(){
        this._app.destroy(true, { children: true, texture: true, baseTexture: true });
        this._app = null
        GameApp.instance = null

        this.emit('AppOnDestroy')
    }

    static get App(){
        return this.instance?.App
    }

    get App(){
        return this._app
    }

    static get Ticker(){    
        return this.instance?.Ticker
    }

    get Ticker(){
        return this._ticker
    }

    static get mainContainer(){
        return this.instance?.mainContainer
    }

    get mainContainer(){
        return this._mainContainer
    }

    get appSize(){
        return { width : this.App.renderer.width, height : this.App.renderer.height }
    }

    static get appSize(){
        return { width : this.App.renderer.width, height : this.App.renderer.height }
    }



}