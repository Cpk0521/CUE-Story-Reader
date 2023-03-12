class ScenarioHeroine extends PIXI.Container {

    constructor(){
        super()

        this.sortableChildren = true        
        
        this._l2dentitiesMap = new Map()
        this._currentOnTheStage = []
        this._savingMode = false
        this._hero_Order = []
        this._MaxModelCount = 6
        this._builtModelCount = 0
    }

    static create(){
        return new this()
    }


}

export default ScenarioHeroine