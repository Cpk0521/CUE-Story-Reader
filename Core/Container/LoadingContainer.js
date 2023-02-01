const atlasData = {
    frames: {
        book1: {
            frame: { x: 0, y:0, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book2: {
            frame: { x: 128, y:0, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book3: {
            frame: { x: 256, y:0, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book4: {
            frame: { x: 384, y:0, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },

        book5: {
            frame: { x: 0, y:128, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book6: {
            frame: { x: 128, y:128, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book7: {
            frame: { x: 256, y:128, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book8: {
            frame: { x: 384, y:128, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },

        book9: {
            frame: { x: 0, y:256, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book10: {
            frame: { x: 128, y:256, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book11: {
            frame: { x: 255, y:256, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
        book12: {
            frame: { x: 383, y:256, w:97, h:85 },
            sourceSize: { w: 97, h: 85 },
            spriteSourceSize: { x: 0, y: 0, w: 97, h: 85 }
        },
    },
    meta: {
        image: './Assets/Images/misc/ef_book_anm_reverse.png',
        format: 'RGBA8888',
        size: { w: 481, h: 341 },
        scale: 1
    },
    animations: {
        enemy: ['book1','book2','book3','book4',
                'book5','book6','book7','book8',
                'book9','book10','book11','book12',] 
    }
}

class LoadingContainer {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container()

        this._init()
    }

    static create(){
        return new this()
    }

    async _init(){

        let book_shadow_texture = await this._loader.load('./Assets/Images/misc/ef_book_shadow.png')
        let book_shadow = new PIXI.Sprite(book_shadow_texture);
        book_shadow.anchor.set(0.5);        
        book_shadow.position.set(PixiApp.appSize.width / 2  , PixiApp.appSize.height / 2);
        this._container.addChild(book_shadow)

        let spritesheet = new PIXI.Spritesheet(PIXI.BaseTexture.from(atlasData.meta.image),atlasData);
        await spritesheet.parse();
        this.anim = new PIXI.AnimatedSprite(spritesheet.animations.enemy);
        this.anim.animationSpeed = 0.4;
        this.anim.anchor.set(0.5);        
        this.anim.position.set(PixiApp.appSize.width / 2  , PixiApp.appSize.height / 2);
        this.anim.play();
        this._container.addChild(this.anim)
    }

    addTo(parent){
        if(this.anim){
            this._onPlay()
        }
        parent?.addChild(this._container)
        return this._container
    }

    remove(){
        if(this.anim){
            this._onStop()
        }
        this._container.parent.removeChild(this._container)
    }

    _onPlay(){
        this.anim.play();
    }

    _onStop(){
        this.anim.stop();
    }

}