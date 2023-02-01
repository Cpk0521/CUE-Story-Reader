class TouchContainer extends PIXI.utils.EventEmitter {

    _loader = PIXI.Assets
    constructor(){
        super()
        this._container = new PIXI.Container()

        this._init()
    }

    static create(){
        return new this()
    }


    async _init(){

        this._container.interactive = true
        this._container.cursor = 'pointer';

        let emptysprite = this._createEmptySprite({color : 0x000000})
        this._container.addChild(emptysprite)

        let touchToStartimg = await this._loader.load('./Assets/Images/ui/Common_TouchScreenText.png')
        let touchToStart = new PIXI.Sprite(touchToStartimg);
        touchToStart.anchor.set(0.5);
        touchToStart.position.set(PixiApp.appSize.width / 2  , PixiApp.appSize.height / 2);
        this._container.addChild(touchToStart)


        this._container.addEventListener('click', this._onclick.bind(this));
        this._container.addEventListener('touchstart', this._onclick.bind(this));
    }

    _onclick(){        
        this.remove()
        this.emit('onStart')
    }   

    _createEmptySprite({color , alpha = 0}){
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

    addTo(parent){
        parent?.addChild(this._container)
        return this
    }

    remove(){
        this._container.removeEventListener('click', this._onclick)
        this._container.removeEventListener('touchstart', this._onclick)
        this._container.parent.removeChild(this._container)
    }

}