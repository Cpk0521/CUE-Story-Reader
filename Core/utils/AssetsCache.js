export const Loader = PIXI.Assets
export class AssetsCacheClass {

    _assetsCache = []

    /**
     * 
     * @param {string[] | object | string} resource 
     * @param {name : string, Label : string | string[], objType : boolean} config 
     * @returns {any[] | object}
     */
    async addToCache(resource, config = {name : '', Label : '', objType : false} ){

        let {name, Label, objType} = config

        let result = []
        if(Array.isArray(resource)){
            result = await this._addToCacheByArray(resource, Label)
        }

        if(typeof resource === 'object'){
            result = await this._addToCacheByObject(resource, Label)
        }

        if(typeof resource === 'string'){            
            result = await this._addToCacheByString(resource, name, Label)
        }

        this._assetsCache.push(...result)

        if(objType){
            return this._switchType(result)
        }

        return result
    }

    /**
     * 
     * @param {object} resource 
     * @param {string | string[]} Label 
     */
    async _addToCacheByObject(resource, Label = ''){
        let _ass = []
        for (const [key, content] of Object.entries(resource)) {
            let result = await this._addToCacheByString(content, key, Label)
            _ass.push(...result)
        }
        return _ass
    }

    /**
     * 
     * @param {Array} resource 
     * @param {string | string[]} Label 
     */
    async _addToCacheByArray(resource, Label = ''){
        let _ass = []
        resource.forEach(async(res) => {
            let {name, asset, label} = res
            let result = await this._addToCacheByString(asset, name, label.concat(Label))
            _ass = _ass.push(...result)
        })

        return _ass
    }

    /**
     * 
     * @param {string} resource 
     * @param {string} name 
     * @param {string | string[]} Label 
     */
    async _addToCacheByString(resource, name = '', Label = ''){
        if(name === '' || name === undefined || name === null){
            let key = resource.substr(resource.lastIndexOf('/') + 1);
            name = key.substring(0, key.indexOf('.'));
        }

        let ishas = this.getByResource(resource)
        if(ishas.length > 0){
            ishas.map( (_r) => _r.label = _r.label.concat(Label))
            return ishas
        }

        // Loader.add(name, resource)
        let result = await Loader.load(resource).catch(()=>{
            console.error(`[AssetsCache] ${resource} 404 (Not Found)`)
        })

        if(!result){
            result = await TypeLoadExtension(resource)
        }
        
        if(!result){
            return []
        }

        return [{
            name : name,
            label : [].concat(Label),
            url : resource,
            asset : result,
        }]
    }

    /**
     * 
     * @param {string} name
     * @param {string | string[]} Label 
     * @param {{objType : boolean, Single : boolean}} config 
     * @returns 
     */
    get(name, Label, config = {objType : false, Single : false}){

        let {objType, Single} = config

        let result = this._assetsCache.filter(
                record => 
                record.name === name && 
                record.label.every(label => Label.includes(label))
            )

        if(Single){
            result = [this._FirstItem(result)]
        }

        return objType ? this._switchType(result) : result
    }
    
    /**
     * 
     * @param {string} name 
     * @param {{objType : boolean, Single : boolean}} config 
     * @returns 
     */
    getByName(name, config = {objType : false, Single : false}){
        let {objType, Single} = config
        let result = this._assetsCache.filter(record => record.name === name)

        if(Single){
            result = [this._FirstItem(result)]
        }

        return objType ? this._switchType(result) : result
    }

    /**
     * 
     * @param {string | string[]} Label 
     * @param {{objType : boolean, Single : boolean}} config 
     * @returns 
     */
    getByLabel(Label, config = {objType : false, Single : false}){
        let {objType, Single} = config
        let result = this._assetsCache.filter(record => record.label.every(label => Label.includes(label)))

        if(Single){
            result = [this._FirstItem(result)]
        }

        return objType ? this._switchType(result) : result
    }

    /**
     * 
     * @param {string} resource 
     * @param {{objType : boolean, First : boolean, Single : boolean}} config 
     * @returns 
     */
    getByResource(resource, config = {objType : false, Single : false}){
        let {objType, Single} = config
        let result = this._assetsCache.filter(record => record.url === resource)

        if(Single){
            result = [this._FirstItem(result)]
        }
        
        return objType ? this._switchType(result) : result
    }

    /**
     * 
     * @param {string} name 
     * @param {string | string[]} Label 
     */
    Check(name, Label){
        return this._assetsCache.some(
            record =>
            record.name === name && 
            record.label.every(label => Label.includes(label))
        )
    }

    CheckByName(name){
        return this._assetsCache.some(record => record.name === name)
    }

    CheckByLabel(Label){
        return this._assetsCache.some(record => record.label.every(label => Label.includes(label)))
    }

    _switchType(result){
        let out = {}
        result.forEach(_r => {
            out[_r.name] = _r.asset
        });
        return out
    }

    _FirstItem(result){
        if(result){
            return result.shift()
        }
    }

    get Cache(){
        return this._assetsCache
    }

}

export const AssetsCache = new AssetsCacheClass()

/**
 * 
 * @param {string} resource 
 * @returns {PIXI.Texture | undefined}
 */
export async function TypeLoadExtension(resource) {
    if(resource.indexOf(".mp4") !== -1){
        
        let texture = await PIXI.Texture.from(resource)
        texture.baseTexture.resource.autoPlay = false
        
        return texture
    }
}

export default AssetsCache
