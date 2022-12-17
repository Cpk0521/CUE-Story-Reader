class backgroundManager extends PIXI.utils.EventEmitter {

    _loader = PIXI.Assets
    constructor() {
        super()

        this._frontcontainer = new PIXI.Container();
        this._backcontainer = new PIXI.Container();

        this._bgMap = new Map()
    }

    async execute(id, subid) {
        await this.emit('execute')
        return this._switchBG(id, subid)
    }

    async _switchBG(id , subid) {

        if(id == 201) {
            return new Promise((res) => {
                this._backcontainer.removeChildren()
                this._frontcontainer.removeChildren()
    
                let bg = new PIXI.Sprite(PIXI.Texture.WHITE)
                bg.tint = 0x000000
                bg.width = GameApp.appSize.width
                bg.height = GameApp.appSize.height
                
                res(this._backcontainer.addChild(bg))
            })
        }

        let new_bg = this._getBG(id, subid)

        if(!new_bg){
            throw new Error(`Background ${id}_${sub}  not found.`);
        }

        return new Promise((res) => {
            this._frontcontainer.removeChildren()
            this._backcontainer.removeChildren()

            this._frontcontainer.addChild(new_bg.front)
            this._backcontainer.addChild(new_bg.back)
            res()
        })

    }

    _getBG(id, subid) {
        let bg = this._bgMap.get(`${id}_${subid}`)
        if(!bg){
            throw new Error(`Background ${id}_${subid} not found.`);
        }

        return bg;
    }

    _isExist(label){
        return this._bgMap.has(label)
    }

    _isExist(id, subid) {
        return this._bgMap.has(`${id}_${subid}`)
    }

    get frontcontainer() {
        return this._frontcontainer
    }

    get backcontainer() {
        return this._backcontainer
    }

    //v2

    async initialize2(Assets){

        if(!Assets) {
            return new Promise(()=>{})
        }

        return Promise.all(Assets.map((bg) => this._combineBG(bg.id, bg.subId)))
        // .then(()=>{
        //     console.log(this._bgMap)
        // })

    }

    async _combineBG(id, subid){

        if(this._isExist(id, subid)){
            // throw new Error(`Background ${id}_${sub} already exists.`);
            return new Promise(()=>{})
        }

        if(id == 201) {
            return Promise.resolve()
        }

        // let src = `./Backgrounds/background${id.toString().padStart(3,'0')}_${subid}/`
        let src = ResourcePath.getBGSrc(id, subid)
        let jsonResult = await this._loader.load(`${src}/data.json`)
        // console.log(jsonResult)

        let frontBgContainer = new PIXI.Container();
        let backBgContainer = new PIXI.Container();

        let ratio = (GameApp.appSize.width / jsonResult.CanvasScaler.Width)

        jsonResult.Layer.map((obj)=>{

            if(obj.Type != undefined) {
                let sprite = PIXI.Sprite.from(`${src}/${obj.Textures}`)
    
                sprite.width = obj.Width * ratio
                sprite.height = obj.Height * ratio
    
                sprite.anchor.set(obj.Anchor.x, obj.Anchor.y)
                sprite.position.set(GameApp.appSize.width /2 , GameApp.appSize.height /2)
                backBgContainer.addChild(sprite)
            }

        })

        this._bgMap.set(`${jsonResult.ID}_${jsonResult.SubId}`, {front : frontBgContainer, back : backBgContainer})

        // console.log((backBgContainer.width * 0.5) / backBgContainer.scale.x)
        return Promise.resolve({front : frontBgContainer, back : backBgContainer})
    }


}