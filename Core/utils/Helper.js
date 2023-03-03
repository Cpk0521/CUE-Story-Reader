import { AppConfig } from "../config/AppConfig.js";

export function createEmptySprite({color = undefined, alpha = 1, width = AppConfig.APP_WIDTH, height = AppConfig.APP_HIGHT}){
    let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
    sprite.width = width
    sprite.height = height
    sprite.anchor.set(0.5)
    sprite.position.set(width /2 , height /2)
    sprite.alpha = alpha
    if(color != undefined) {
        sprite.tint = color
    }

    return sprite
}

export function checkScriptFormat(Script){
    let params = ['storyType', 'storyID', 'phase', 'heroineId', 'title', 'mainCommands', 'Assets']
    
    params.forEach((key) => {
        if(!(key in Script)){
            return false
        }
    })

    return true
}

