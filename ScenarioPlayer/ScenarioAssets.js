import ResourceConverter from "./ResourceConverter.js"
import { ScenarioHeroine } from './ScenarioHeroine.js'

const loader = PIXI.Assets

export class ScenarioAssetsClass {
    
    _Assets = {}
    
    async setup(config){
        let {AdvAssetsResource, AdvFont} = config

        //clear _Assets
        for (var key in this._Assets) delete this._Assets[key];


        //load player所有會用到的Assets
        for (const [key, content] of Object.entries(AdvAssetsResource)) {
            await this.addAssets('Adv', key, content)
        }

        //load Font
        for (const [Fontkey, Fontcontent] of Object.entries(AdvFont)) {
            for (const [key, content] of Object.entries(Fontcontent)){
                await this.addAssets('Font', `${Fontkey}_${key}`, content)
            }
        }

        return this
    }

    loadStoryScript(storyType, storyID, phase){
        return this._converter.getScenarioSrc(storyType, storyID, phase)
    }

    async loadStoryAssets(StoryScript){
        let {mainCommands, Assets} = StoryScript

        let {heroines, backgrounds, bgmIds, movieNames} = Assets
        
        for (let index = 0; index < heroines.length; index++) {
            let hero = heroines[index]
            let modelsrc = ResourceConverter.getL2dSrc(hero.heroineId, hero.costumeId)
            ScenarioHeroine.create(modelsrc).then((holder)=>{
                this.addAssets('Heroines', hero.dataId, holder, false)
            })
        }

    }

    async addAssets(Type, key, content, load = true){

        if(!this._Assets[Type]){
            this._Assets[Type] = {}
        }
        if(load) {
            let asset = await loader.load(content)
            this._Assets[Type][key] = asset
        }
        else{
            this._Assets[Type][key] = content
        }
    }

    removeAssets(Type, key) {
        if(this._Assets[Type]){
            if(this._Assets[Type][key]){
                delete this._Assets[Type][key]
            }
        }
    }

    get(Type, key){

        if(!key){
            if(Type in this._Assets){
                return this._Assets[Type]
            }
        }
        else{
            if(Type in this._Assets){
                if(key in this._Assets[Type]){
                    return this._Assets[Type][key]
                }
            }
        }

        return 
    }

    get Assets(){
        return this._Assets
    }
        
}

const ScenarioAssets = new ScenarioAssetsClass()

export default ScenarioAssets

