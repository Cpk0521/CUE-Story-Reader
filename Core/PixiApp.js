
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent);
}

class PixiApp extends PIXI.utils.EventEmitter {

    static instance = null

    constructor(element, {width, height, background, alpha}){
        super()

        //set instance
        if(PixiApp.instance != this){
            PixiApp.instance = this
        }

        this._width = width
        this._height = height

        //create PIXI Application
        this._app = new PIXI.Application({
            hello: false,
            antialias: true,
            autoStart: true,
            autoDensity: true,
            resolution : window.devicePixelRatio,
            backgroundColor : background ?? 0x000000,
            backgroundAlpha: alpha || 1,
            width: width ?? 1334,
            height: height ?? 750,
        })
        //add To HTML element
        element?.appendChild(this._app.view);

        //create main Container and add To Application
        this._mainContainer = new PIXI.Container()
        this._mainContainer.interactive = true 
        this._app.stage.addChild(this._mainContainer)

        //ticker
        // this._gsapTicker = gsap.ticker
        this._ticker = PIXI.Ticker.shared;
        this._ticker.autoStart = true
        // this._gsapTicker.add(() => { 
        //     this._ticker.update();
        // });
        // this._gsapTicker.fps(30);

        //resize the PIXI Application and add event listener
        this._resize();
        window.addEventListener('resize', this._resize)

        //Dev Tool
        globalThis.__PIXI_APP__ = this._app;
    }

    static create(element, config = {}) {
        return new this(element, config)
    }

    _resize = () => {

        let width = document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight;
        let isMobile = isMobileDevice()

        let ratio = isMobile ? Math.min(width / (this._height ?? 750), height / (this._width ?? 1334)) : Math.min(width / (this._width ?? 1334), height / (this._height ?? 750))

        let reX = (this._width ?? 1334) * ratio;
        let reY = (this._height ?? 750) * ratio;

        this._app.view.style.width = reX + 'px';
        this._app.view.style.height = reY + 'px';

        this._app.view.style.transform = isMobile ? 'rotate(90deg)' : ''

        this.emit('AppOnResized')
    }

    destroy(){
        this._app.destroy(true, { children: true, texture: true, baseTexture: true });
        this._app = null
        PixiApp.instance = null

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