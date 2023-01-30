class MoiveManager {

    _loader = PIXI.Assets
    constructor(){
        this._container = new PIXI.Container();

        let bg = new PIXI.Sprite(PIXI.Texture.WHITE)
        bg.width = PixiApp.appSize.width
        bg.height = PixiApp.appSize.height
        this._container.addChild(bg);

        this._container.visible = false

        this._movieMap = new Map()
    }

    async initialize(Assets){
        //1920 1080
        let ratio = (PixiApp.appSize.height / 1080)

        for (let index = 0; index < Assets.length; index++) {

            let texture = PIXI.Texture.from(ResourcePath.getMovieSrc(Assets[index]));
            
            texture.baseTexture.resource.autoPlay = false
            let videoSprite = new PIXI.Sprite(texture);
            
            videoSprite.width = 1920 * ratio
            videoSprite.height = 1080 * ratio;
            videoSprite.anchor.set(0.5)
            videoSprite.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)

            this._movieMap.set(Assets[index], videoSprite)
            
        }
    }

    async show(name){
        // let ratio = (PixiApp.appSize.height / 1080)

        return new Promise((resolve, reject) => {
            let video = this._getMovie(name)
            // let videotexture = this._getMovie(name)

            if(!video || !video?.texture.valid){
                this._container.visible = false
                resolve()
            }else{

                // let videoSprite = new PIXI.Sprite(videotexture);
                // videoSprite.width = 1920 * ratio
                // videoSprite.height = 1080 * ratio;
                // videoSprite.anchor.set(0.5)
                // videoSprite.position.set(PixiApp.appSize.width /2 , PixiApp.appSize.height /2)
    
                let controller = video.texture.baseTexture.resource.source;
    
                if(this._container.children.length > 1){
                    this._container.removeChildAt(1)
                }
    
                this._container.addChild(video)
                this._container.visible = true
                
                controller.play()
                controller.onended = ()=>{
                    this._container.removeChild(video);
                    this._container.visible = false
                    resolve()
                }

            }
           

        })
    }

    async hide(){
        this._container.visible = false
    }

    _getMovie(label) {
        return this._movieMap.get(label)
    }

    _isExist(label){
        return this._movieMap.has(label)
    }

    get container() {
        return this._container
    }

}