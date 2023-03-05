import { AssetsCache, Loader } from "../../utils/AssetsCache.js"

class Live2dEntity {
    
    constructor(){
        this._Model = null
        this._isBuilt = false
        this._zindex = 0
        this._modelUID = 0
    }

    static async create(url, uid, index){
        return new this().initialize(url, uid, index)
    }

    async initialize(url, uid, zindex){
        this._modelUID = uid
        this._zindex = zindex

        let settingsJSON = await Loader.load(url)
        settingsJSON.url = url

        this._modelsetting = new PIXI.live2d.Cubism4ModelSettings(settingsJSON);

        return Promise.resolve(this)
    }

    async build(){

        if(!this._modelsetting || !this._isBuilt){
            return 
        }

        this._Model = await PIXI.live2d.Live2DModel.from(this._modelsetting, {autoUpdate : false});

        //Setting
        this._Model.zindex = this._zindex
        this._Model.autoInteract = false; //BUG!!! pixi v7 need to set false 
        this._Model.buttonMode = false;
        this._Model.interactive = false;

        this._isBuilt = true

        return Promise.resolve(this)
    }

    addTo(parent){
        if(!this._isBuilt){
            return
        }
        
        parent.addChild(this._Model)
    }


    /**
     * 激活狀態
     */
    activate(){
        if(!this._Model.autoUpdate) {
            this._Model.autoUpdate = true
        }
        this.setVisible(true)
    }

    /**
     * 休眠狀態
     */
    rest() {
        this._Model.autoUpdate = false
        this.setVisible(false)
    }

    destory(){
        if(!this._isBuilt) {
            return
        }

        this._Model.destroy()
        this._isBuilt = false
        this._zindex = 0
    }

    //==============關於live2d行為=============

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

    //面向
    Lookat(value) {
        if(value == 0){
            this.getFocusController().focus(0, 0)
        }
        else{

            let center = {x:0 , y:0}
            let r = this._Model.width

            let rand = (-value + 90) * (Math.PI * 2 / 360)
            let x = center.x + Math.cos(rand)
            let y = center.y + Math.sin(rand)

            this.getFocusController().focus(x, y)
        }
    }

    //移動
    moveTo(x, time = 1){
        return gsap.to(this._Model, {
            x: x,
            duration : time
        })
    }

    moveFrom(x, time = 1){
        return gsap.from(this._Model, {
            x: x,
            duration : time
        })
    }

    //說話

    //Model Controll
    setlipSync(bool) {
        this._Model.internalModel.lipSync = bool
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

    setVisible(bool) {
        this._Model.visible = bool
    }

    setAngle(val) {
        this._Model.angle = val
    }

    setInteractive(bool) {
        this._Model.interactive = bool
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

    get UID(){
        return this._modelUID
    }

    get ModelSettings(){
        return this._modelsetting
    }

    get IsBuilt(){
        return this._isBuilt
    }

}

export default Live2dEntity