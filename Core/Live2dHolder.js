class Live2dHolder extends PIXI.utils.EventEmitter {

    _loader = PIXI.Assets
    constructor(){
        super()
        this.isBuild = false
        this._Model = {}
        this._layer = new PIXI.Container()
        this._zindex = 0
    }
    
    static async create(jsonurl, onloaded, onError) {
        return new Live2dHolder().create(jsonurl).then(onloaded).catch(onError)
    }

    async create(jsonurl, zindex){
        let settingsJSON = await this._loader.load(jsonurl)
        settingsJSON.url = jsonurl

        this._modelsetting = new PIXI.live2d.Cubism4ModelSettings(settingsJSON);
        this._zindex = zindex

        this.emit('SettingOnLoaded', this)
        
        return Promise.resolve(this)
    }

    async build(audioManager, config = {}){ // {scale, anchor, position, zindex}
        if(!this._modelsetting) {
            return Promise.reject(this)
        }

        if(this.isBuild){
            return Promise.reject(this)
        }
        
        this._Model = await PIXI.live2d.Live2DModel.from(this._modelsetting, {autoUpdate : false});

        this._Model.zindex = this._zindex
        this._Model.autoInteract = false; //pixi v7 need to set false
        this._Model.buttonMode = false;
        this._Model.interactive = false;

        this.getMotionManager().on('motionLoaded', function (group, index, motion) {
            const curves = [];

            motion._motionData.curves.forEach((f) => {
                if (Array.isArray(curves[f.type])) curves[f.type].push(f);
                else curves[f.type] = [f];
            });

            motion._motionData.curves.splice(
                0,
                motion._motionData.curves.length,
                ...curves.flat()
            );
        })

        //set eye Blink
        let eyesIds = this._Model.internalModel.idParamEyes
        this._Model.internalModel.on('eyeBlinkUpdate', ()=>{
            for (let i = 0; i < eyesIds.length; i++) {
                this.getCoreModel().setParameterValueById(eyesIds.at(i), 0)
            }
        })

        //set lipSync
        this._audioManager = audioManager
        this._Model.internalModel.lipSync = false
        let lipSyncIds = this._Model.internalModel.lipSyncIds
        
        this._Model.internalModel.on('lipSyncUpdate', (dt)=>{
            audioManager.update()

            for (let i = 0; i < lipSyncIds.length; i++) {
                this.getCoreModel().setParameterValueById(lipSyncIds.at(i), audioManager.Rms)
            }
        })


        this.isBuild = true

        this.emit('ModelOnLoaded', this)

        return Promise.resolve(this)
    }

    addTo(parent){
        if(!this.isBuild){
            return
        }
        
        parent.addChild(this._Model)
    }

    activate(){
        if(!this._Model.autoUpdate) {
            this._Model.autoUpdate = true
        }
        this.setVisible(true)
    }

    rest() {
        this._Model.autoUpdate = false
        this.setVisible(false)
    }

    destory(){
        if(!this.isBuild) {
            return
        }

        this._Model.destroy()
        // this._Model = undefined
        this.isBuild = false
    }

    //Motion
    async executeMotionByName(name, type = ''){
        let index = this._getMotionByName(type, name)
        return await this._playMotion(type, index, 'FORCE')
    }
    
    async executeMotionByIndex(index, type = '') {
        return await this._playMotion(type, index, 'FORCE')
    }

    _playMotion(group, index, priority) {
        return this._Model?.motion(group, index, priority)
    }

    _getMotionByName(type, name) {
        let motions = this._modelsetting?.motions
        return motions[type].findIndex(motion => motion.Name == name)
    }

    //Expression
    async executeExpressionByName(name) {
        let index = this._getExpressionsByName(name)
        return await this._playExpression(index)
    }

    async executeExpressionByIndex(index) {
        return await this._playExpression(index)
    }

    _playExpression(index) {
        return this._Model?.expression(index)
    }

    _getExpressionsByName(name) {
        let expressions = this._modelsetting?.expressions
        return expressions.findIndex(express => express.Name == name)
    }

    speak(){
        if(!this.IsBuild) {
            return
        }

        this.setlipSync(true)
        return this._audioManager?.playAudio().then(()=>{
            this.setlipSync(false)
        })
    }

    //Model Controll
    setlipSync(bool) {
        this._Model.internalModel.lipSync = bool
    }

    setEyeAuto(bool) {
        this._Model.internalModel.eyeAuto = bool
    }

    setAnchor(val) {
        this._Model.anchor.set(val);
    }

    setScale(val) {
        this._Model.scale.set(val)
    }

    setPosition(x, y) {
        this._Model.position.set(x, y)
    }

    // setAlpha(val){
    //     this._Model.aplha = val
    // }

    setVisible(bool) {
        this._Model.visible = bool
    }

    setAngle(val) {
        this._Model.angle = val
    }

    setInteractive(bool) {
        this._Model.interactive = bool
    }

    setLookat(value) {
        
        if(value == 0){
            this.getFocusController().focus(0, 0)
        }else{

            let center = {x:0 , y:0}
            let r = this._Model.width

            let rand = (-value + 90) * (Math.PI * 2 / 360)
            let x = center.x + Math.cos(rand)
            let y = center.y + Math.sin(rand)

            // console.log(x, y)
            this.getFocusController().focus(x, y)
        }
    }

    moveTo(x, time = 1){
        return gsap.to(this._Model, {
            x: x,
            // aplha : 0,
            duration : time
        })
    }

    moveFrom(x, time = 1){
        return gsap.from(this._Model, {
            x: x,
            // alpha : 0,
            duration : time
        })
    }

    //getter
    getAnchor() {
        return this._Model?.anchor
    }

    getScale() {
        return this._Model?.scale
    }

    getAlpha() {
        return this._Model?.aplha
    }

    getAngle() {
        return this._Model?.angle
    }

    getSetting() {
        return this._modelsetting
    }

    getUrl() {
        return this._modelsetting?.url
    }

    getGroups() {
        return this._modelsetting?.groups
    }

    getCoreModel() {
        return this._Model?.internalModel.coreModel
    }

    getMotionManager() {
        return this._Model?.internalModel.motionManager
    }

    getFocusController() {
        return this._Model?.internalModel.focusController
    }

    getExpressionManager() {
        return this._Model?.internalModel.motionManager.expressionManager
    }

    get Model(){
        return this._Model ?? undefined
    }

    get ModelSettings(){
        return this._modelsetting
    }

    get IsBuild(){
        return this.isBuild
    }

    get Layer(){
        return this._layer
    }

}