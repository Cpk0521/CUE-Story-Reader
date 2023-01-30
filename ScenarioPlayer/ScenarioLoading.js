import { ADV_WIDTH, ADV_HIGHT, AdvAssetsResource} from './ScenarioConfig.js'
import ScenarioAssets from './ScenarioAssets.js'

export const atlasData = {
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
        image: AdvAssetsResource.book_anm_reverse,
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

export class ScenarioLoading extends PIXI.Container{
    constructor(){
        super()
        this._init()
    }

    static create(){
        return new this()
    }

    async _init(){

        // let gradation_texture = ScenarioAssets.get('Adv', 'gradation')
        // let gradation = new PIXI.Sprite(gradation_texture);
        // gradation.anchor.set(1);        
        // gradation.position.set(ScenarioPlayerConfig.ADV_WIDTH , ScenarioPlayerConfig.ADV_HIGHT);
        // this.addChild(gradation)

        let book_shadow_texture = ScenarioAssets.get('Adv', 'book_shadow')
        let book_shadow = new PIXI.Sprite(book_shadow_texture);
        book_shadow.anchor.set(0.5);        
        book_shadow.position.set(ADV_WIDTH / 2 , ADV_HIGHT / 2);
        this.addChild(book_shadow)

        let book_anm = ScenarioAssets.get('Adv', 'book_anm_reverse')
        let spritesheet = new PIXI.Spritesheet(book_anm , atlasData);
        await spritesheet.parse();
        this.anim = new PIXI.AnimatedSprite(spritesheet.animations.enemy);
        this.anim.animationSpeed = 0.4;
        this.anim.anchor.set(0.5);        
        this.anim.position.set(ADV_WIDTH / 2 , ADV_HIGHT / 2);
        this.anim.play();
        this.addChild(this.anim)
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    destory(){
        if(this.anim){
            this._onStop()
        }
        this.destroy(true, { children: true });
    }

    set animationSpeed(speed){
        this.anim.animationSpeed = speed;
    }

    _onPlay(){
        this.anim.play();
    }

    _onStop(){
        this.anim.stop();
    }

}

