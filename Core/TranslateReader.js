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
        return await this._loader.load(src).then(({Dialogue, Language, Translator})=>{
            this._messageLog = Dialogue
            this._language = Language
            this._translator = Translator
        })
    }

    next(Language = ''){
        this._curr += 1
        let log = this.getTranslateLog(this._curr)
        return {name : log.name[Language], message : log.message[Language]}
    }
    
    getTranslateLog(index){
        if(this._messageLog.length <= 1) {
            return undefined
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