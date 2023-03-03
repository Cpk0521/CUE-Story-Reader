import AssetsCache from '../utils/AssetsCache.js'

class ScenarioSound {

    _VoiceMap = new Map()
    _BGMMap = new Map()
    _SEMap = new Map()

    _current = {
        Voice : null,
        BGM : null,
        SE : null,
    }

    static create(){
        return new this()
    }

    async initialize(Voice, BGM, SE){
        let _voice = await AssetsCache.addToCache(Voice, {Label : 'Voice'})
        _voice.forEach(_v => this._VoiceMap.set(`Voice_${_v.name}`, _v.asset));

        let _bgm = await AssetsCache.addToCache(BGM, {Label : 'BGM'})
        _bgm.forEach(_b => this._BGMMap.set(`BGM_${_b.name}`, _b.asset))

        let _se = await AssetsCache.addToCache(SE, {Label : 'SE'})
        _se.forEach(_s => this._SEMap.set(`SE_${_s.name}`, _s.asset))
    }


}

export default ScenarioSound