class FilterManager {
    
    constructor(){
        this._container = new PIXI.Container();

        this._backcontainer = new PIXI.Container();
        this._fontcontainer = new PIXI.Container();

        // id 1
        this.blackFrontPanel = this._createEmptySprite({color:0x000000})
        this._fontcontainer.addChild(this.blackFrontPanel)

        // id 2
        this.whitePanel = this._createEmptySprite({})
        this._fontcontainer.addChild(this.whitePanel)

        // id 3
        this.blackBackPanel = this._createEmptySprite({color:0x000000})
        this._backcontainer.addChild(this.blackBackPanel)

        // id 4, 5
        this.filter = new PIXI.filters.ColorMatrixFilter();
        this._container.filters = [this.filter]
        this.filter.enabled = false
    }

    addContainer(BGback, L2d, BGfront, ...child){
        this._container.addChild(BGback)
        this._container.addChild(this._backcontainer)
        this._container.addChild(L2d)
        this._container.addChild(BGfront)
        if(child.length > 0) {
            this._container.addChild(...child)
        }
        this._container.addChild(this._fontcontainer)

        return this._container
    }

    async showMask(id){

        if(id == 1){
            this.blackFrontPanel.alpha = 0
            await gsap.to(this.blackFrontPanel, {
                alpha : 1, 
                duration : 1
            })
        }
        else if(id == 2) {
            this.whitePanel.alpha = 0
            await gsap.to(this.whitePanel, {
                alpha : 1, 
                duration : 1
            })
        }
        else if(id == 3) {
            this.blackBackPanel.alpha = 0.6
        }
        else if(id == 4) {
            this.blackFrontPanel.alpha = 0.3
            this.filter.enabled = true
            this.filter.sepia()
        }
        else if(id == 5) {
            this.filter.enabled = true
            this.filter.desaturate()
        }

    }

    async hideMask(id){
        if(id == 1){
            this.blackFrontPanel.alpha = 1
            await gsap.to(this.blackFrontPanel, {
                alpha : 0, 
                duration : 1.75
            })
        }
        else if(id == 2) {

            this.whitePanel.alpha = 1
            await gsap.to(this.whitePanel, {
                alpha : 0, 
                duration : 1.75
            })
        }
        else if(id == 3) {
            this.blackBackPanel.alpha = 0
        }
        else if(id == 4) {
            this.blackFrontPanel.alpha = 0
            this.filter.enabled = false
        }
        else if(id == 5) {
            this.filter.enabled = false
        }
    }

    _createEmptySprite({color , alpha = 0}){
        let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        sprite.width = GameApp.appSize.width
        sprite.height = GameApp.appSize.height
        sprite.anchor.set(0.5)
        sprite.position.set(GameApp.appSize.width /2 , GameApp.appSize.height /2)
        sprite.alpha = alpha
        if(color != undefined) {
            sprite.tint = color
        }

        return sprite
    }

    hide(){
        this._container.alpha = 0
    }

    get container(){
        return this._container
    }

}