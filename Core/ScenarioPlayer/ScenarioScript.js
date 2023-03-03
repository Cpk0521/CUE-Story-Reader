class ScenarioScript {

    constructor(ScenarioScript){

        //scenario Detail
        this._StoryType = ScenarioScript.storyType
        this._StoryId = ScenarioScript.storyID
        this._StoryPhase = ScenarioScript.phase
        this._StoryHeroine = ScenarioScript.heroineId
        this._Storytitle = ScenarioScript.title
        this._CommandSet = ScenarioScript.mainCommands
        this._Assets = ScenarioScript.Assets
        
        //Command Counter
        this._current = -1
        this._isEnd = false

        //Translate
        this._isTranslate = false
        this._TranLang = 'normal'
    }

    static create(ScenarioScript){
        return new this(ScenarioScript)
    }

    next(){
        if((this._current + 1) >= this._CommandSet.length) {
            this._isEnd = true
            return undefined
        }

        this._current += 1
        return this.currentCommand
    }

    jumpTo(index){
        let i = index > this._currIndex ? this._current + 1 : 0
        for (i; i < this._CommandSet.length; i++) {
            if(this._CommandSet[i].index === index) {
                this._current = i
                return this.currentCommand
            }
        }

        return undefined
    }

    destory(){
        //scenario Detail
        this._StoryType = ''
        this._StoryId = ''
        this._StoryPhase = 0
        this._StoryHeroine = 0
        this._Storytitle = ''
        this._CommandSet = []
        this._current = -1

        //Command Counter
        this._current = -1
        this._isEnd = false

        //Translate
        this._isTranslate = false
        this._TranLang = 'normal'
    }

    checkHeroSort(){
        let list = []
        this._CommandSet.map((com) => com.subCommands.map((subcom)=>{
            if(subcom.commandType == 11){
                list.push(subcom.id)
            }
        }))

        return list
    }

    get isTranslate(){
        return this._isTranslate
    }

    get currentCommand(){
        return this._CommandSet[this._current]
    }

    get nextCommand() {
        return this._CommandSet[this._current + 1]
    }

    get StoryType(){
        return this._StoryType
    }

    get StoryId(){
        return this._StoryId
    }

    get StoryPhase(){
        return this._StoryPhase
    }

    get StoryHeroine(){
        return this._StoryHeroine
    }

    get Storytitle(){
        return this._Storytitle
    }

    get IsEnd(){
        return this._isEnd
    }
}

export default ScenarioScript