import ScenarioConfig from "./ScenarioConfig.js"
import ScenarioScript from "./ScenarioScript.js"
import ScenarioAssets from "./ScenarioAssets.js"
import ResourceConverter from "./ResourceConverter.js"
import ScenarioExecuter from "./ScenarioExecuter.js"
import { checkScriptFormat } from './ScenarioHelper.js'

import { ScenarioTouchScene } from './ScenarioTouchScene.js'
import { ScenarioLoading } from './ScenarioLoading.js'

class ScenarioPlayer extends PIXI.Container{

    _loader = PIXI.Assets
    constructor(config){
        super()

        //Config        
        this._advconfig = config || ScenarioConfig
        
        //Layer 
        this._BGLayer = null
        this._HeroineStage = null
        this._MessageLogLayer = null
        this._StillLayer = null
        this._MoiveLayer = null
        this._EffectLayer = null
        this._MenuLayer = null
        this._LogListLayer = null

        //Controller
        this._SoundController = null
        // this._TranslationController = null
        this._HeroineController = null
        this._PopUpController = null
        this._ResourceConverter = ResourceConverter.setup(this._advconfig.ResourcePath)

        //Story Script
        this._StoryScript = null

        //Auto
        this._autoMode = true
    }

    static create(config){
        return new this(config)
    }

    addTo(parent){
        parent?.addChild(this)
        return this
    }

    async loadStoryScript(Script, language){

        //如果是url 就去load了他
        if(typeof Script === 'string'){
            console.log(Script)
            Script = await this._loader.load(Script).catch(()=>{
                alert('wromg parameters or please check your network')
                return
            })
        }

        //如果錯誤格式
        if(!checkScriptFormat(Script)){
            alert('cannot read the StoryScript file')
            return
        }

        //設定 ScenarioAssets
        await ScenarioAssets.setup(this._advconfig.AssetConfig)

        this._onloading()

        //變成StoryScript obj
        this._StoryScript = ScenarioScript.create(Script, language)

        //load 故事中所有的素材
        await ScenarioAssets.loadStoryAssets(Script)

        //初始化所有controller
        await Promise.all([new Promise((res)=>{
            setInterval(() => {
                res()
            }, 5000);
        })]).then(()=>{
            ScenarioExecuter.execute('Adv_onloaded')
            console.log(ScenarioAssets.Assets)
            this._onwaitingTouch()
        })
    }

    _onstart(){
        let curr = this._StoryScript.next()
        this._renderCommand(curr)
    }

    _next(){
        let curr = this._StoryScript.next()
        if(curr){
            this._renderCommand(curr)
        }
        else{
            this._onEnd()
        }
    }

    _jumpTo(index){
        let curr = this._StoryScript.jumpTo(index)
        if(curr){
            this._renderCommand(curr)
        }
    }

    _onstop(){

    }

    _onEnd(){
        console.log('故事完結')
    }

    async _renderCommand(curr){
        console.log(curr)

        if(this._autoMode){
            this._next()
        }
    }

    _loadCommand(Command){
        let {subCommands} = Command

        if(subCommands?.length > 0) {
            subCommands?.map((sub)=>{
                let sub_Command = this._loadCommand(sub)
                ScenarioExecuter.execute(sub_Command.commandType, sub_Command)        
            })
        }

        ScenarioExecuter.execute(Command.commandType, Command)
    }

    _onloading(){
        let scenarioLoading = ScenarioLoading.create().addTo(this)
        ScenarioExecuter.resgister('Adv_onloaded', () => scenarioLoading.destory())
    }

    _onwaitingTouch(){
        ScenarioTouchScene.create().addTo(this)
        ScenarioExecuter.resgister('Adv_onTouch', this._onstart.bind(this))
    }

} 

export default ScenarioPlayer