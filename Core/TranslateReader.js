class TranslateReader extends PIXI.utils.EventEmitter {

    _loader = PIXI.Assets
    constructor(){
        super()

        this._messageLog = []
        this._language = []
        this._translator = []

        this._curr = -1
    }

    async initialize(src){
        return await this._loader.load(src).then(({Logs, Language, Translator})=>{
            this._messageLog = Logs
            this._language = Language
            this._translator = Translator
        })
    }

    getMessageLogsByScenarioIndex(scenarioIndex, language = "default") {
        let log = this._findLogByScenarioIndex(scenarioIndex)
        if(!log){
            return 
        }

        if(language == "default" || !(this._language.includes(language))){
            return {name : log.name["default"], message : log.message["default"]}
        }

        return {name : log.name[language], message : log.message[language]}
    }

    getMessageLogsByIndex(index, language = "default") {
        let log = this._findLogByIndex(index)
        if(!log){
            return 
        }

        if(language == "default" || !(this._language.includes(language))){
            return {name : log.name["default"], message : log.message["default"]}
        }

        return {name : log.name[language], message : log.message[language]}
    }

    getTextByScenarioIndex(scenarioIndex, language = "default") {
        let log = this._findLogByScenarioIndex(scenarioIndex)
        if(!log){
            return 
        }

        if(language == "default" || !(this._language.includes(language))){
            return {text : log.message["default"]}
        }

        return {text : log.message[language]}
    }

    getTextByIndex(index, language = "default") {
        let log = this._findLogByIndex(index)
        if(!log){
            return 
        }

        if(language == "default" || !(this._language.includes(language))){
            return {text : log.message["default"]}
        }

        return {text : log.message[language]}
    }

    _findLogByScenarioIndex(scenarioIndex){
        return this._messageLog.find(log => log.scenarioIndex == scenarioIndex)
    }

    _findLogByIndex(index){
        if(index < 0 || index > this._messageLog.length) {
            return
        }

        return this._messageLog[index]
    }

    get MessageLog(){
        return this._messageLog
    }

    get Language() {
        return this._language
    }

    get Translator(){
        return this._translator
    }

}