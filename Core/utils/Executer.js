export class ScenarioExecuterClass{

    constructor(record){
        this._record = record || new Map()
    }

    resgister(key, func){
        let handlers = this._record.get(key)

        if(handlers) {
            handlers.push(func)
        }
        else{
            this._record.set(key, [func])
        }
    }

    remove(key, func) {
        let handlers = this._record.get(key)

        if(handlers) {
            if(func) {
                handlers.splice(handlers.indexOf(func) >>> 0, 1);
            }
            else{
                this._record.set(key, []);
            }
        }
    }

    execute(key, ...arg) {
        let handlers = this._record.get(key);

        if (handlers) {
            [...handlers].map((handler) => {
                    handler(...arg);
                });
        }
    }

    get record(){
        return this._record
    }

}

const ScenarioExecuter = new ScenarioExecuterClass()

export default ScenarioExecuter