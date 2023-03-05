import { AssetsCache, Loader } from '../utils/AssetsCache.js'
import Hello from '../utils/Hello.js'
import { checkScriptFormat, createEmptySprite } from '../utils/Helper.js'

import ScenarioTap from './ScenarioTap.js'
import ScenarioSound from './ScenarioSound.js'

import ScenarioMenu from './ScenarioMenu.js'
import ScenarioScript from './ScenarioScript.js'
import ScenarioMessage from './ScenarioMessage.js'
import ScenarioStill from './ScenarioStill.js'
import ScenarioMovie from './ScenarioMovie.js'
import ScenarioStage from './ScenarioStage.js'
// import ScenarioTelop from './ScenarioTelop.js'

export class ScenarioPlayer extends PIXI.Container{

    constructor(ControllerConfig = {}){
        super()
        //background and setting
        this.addChild(createEmptySprite({color : 0x000000}))
        this.interactive = true;
        this.sortableChildren = true;

        //Layer
        this._tapLayer = ControllerConfig.Tap ?? ScenarioTap.create()
        this._MenuLayer = ControllerConfig.Menu ?? ScenarioMenu.create()
        this._StageLayer = ControllerConfig.Stage ?? ScenarioStage.create()
        this._StillLayer = ControllerConfig.Still ?? ScenarioStill.create()
        this._MovieLayer = ControllerConfig.Movie ?? ScenarioMovie.create()
        this._MessageLogLayer = ControllerConfig.MessageLog ?? ScenarioMessage.create()
        // this._TelopLayer = ControllerConfig.Telop ?? ScenarioTelop.create()
        
        //Contrller
        this._assetsCache = AssetsCache
        this._storyScript = null
        this._SoundManager = ControllerConfig.Sound ?? new ScenarioSound()

        //event
        this.on('pointerdown', this._tapEffect, this)

        //Hello
        Hello()
    }

    static create(ControllerConfig = {}){
        return new this(ControllerConfig)
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    async loadStoryScript(Script){

        if(typeof Script === 'string'){
            Script = await Loader.load(Script)
            .catch(()=>{
                alert('wromg parameters or please check your network')
                return
            })
        }

        if(!checkScriptFormat(Script)){
            alert('cannot read the StoryScript file')
            return
        }

        this._storyScript = ScenarioScript.create(Script)
        await this._storyScript.languageSupport()
        let story_assets = this._storyScript.Assets
        let story_full_assets = this._storyScript.FullUrlAssets
        
        await Promise.all([
            this._MessageLogLayer.initialize(story_assets.heroines),
            this._SoundManager.initialize(story_full_assets.Voice, story_full_assets.BGM, story_full_assets.SE),
            this._MovieLayer.initialize(story_full_assets.Movie),
            this._StillLayer.initialize(story_full_assets.Image),
            
        ])
        .then(()=>{
            console.log('start')
            console.log(AssetsCache.Cache)
        })
        
    }

    _onstart(){
        
    }

    _next(){
        
    }

    _jumpTo(index){
        
    }

    _onstop(){

    }

    _onEnd(){
        console.log('故事完結')
    }

    _onLoading(){

    }   

    destroy(){

    }

    _tapEffect(e){
        this.addChild(this._tapLayer)
        this._tapLayer.play(e.data.global)
    }

}

export default ScenarioPlayer