class ParticleSystem extends PIXI.utils.EventEmitter {

    constructor(config){
        super()

        this._container = new PIXI.ParticleContainer()
        if(config){
            this._config = config
        }
        this._emitter = new PIXI.particles.Emitter(this._container, this._config)
    }

    static create(config){
        return new this(config)
    }

    setPosition(x, y){
        this._emitter?.updateSpawnPos(x, y);
    }

    setScale(x, y) {
        const _x = x || 0;
        const _y = y || y !== 0 ? _x : 0;
        this._container?.scale.set(_x, _y);
    }

    playOnceAndDestory(options = {}){
        this._emitter?.playOnceAndDestroy(()=>{
            if(options.callback != undefined)
                options.callback()
            this.destroy()
        })

        if(options.startTime){
            this._emitter?.update(options.startTime)
        }
    }

    stop() {
        if(this._emitter){
            this._emitter.emit = false
            this.emit('stop')
        }
    }

    destroy() {
        if (this._emitter) {
          this._emitter.destroy();
          this._emitter = null;
        }
        if (this._container) {
          this._container.destroy();
          this._container = null;
        }
        this.emit('destroyed');
    }

    stopAndDestory(){
        this.stop()
        this.destroy()
    }

    get emitter(){
        return this._emitter
    }

    get container() {
        return this._container;
    }

    get x(){
        return this._emitter?.spawnPos.x;
    }

    get y() {
        return this._emitter?.spawnPos.y;
    }

}

export default ParticleSystem