//https://www.w3schools.com/jsref/dom_obj_audio.asp
class SoundManager extends PIXI.utils.EventEmitter {

    static _L2dAudioPlayer = new Live2dAudioPlayer()
    static instance = null
    constructor(){
        super()
        
        if(SoundManager.instance != this) {
            SoundManager.instance = this
        }

        // this._pixisound = PIXI.sound
        this._AudioMap = new Map()
        this._SEaudio = new Audio()
        this._BGMaudio = new Audio()
        this._Miscaudio = new Audio()

        //new
        this._VoiceMap = new Map()
        this._SEMap = new Map()
        this._BGMMap = new Map()
        this._currentAudio = {Voice : null, SE : null, BGM : null}
        this._volume = 0.7
    }

    async initialize(AudioUrlSet){

        let { Voice, SE, BGM } = AudioUrlSet
        
        for (const [key, content] of Object.entries(Voice)) {
            // console.log(key, content)
            this._add(content, key, 'Voice')
        }

        for (const [key, content] of Object.entries(SE)) {
            // console.log(key, content)
            this._add(content, key, 'SE')
        }

        for (const [key, content] of Object.entries(BGM)) {
            // console.log(key, content)
            this._add(content, key, 'BGM')
        }

        return Promise.resolve()
    }

    _add(url, key, type) {
        const audio = new Audio(url);
        audio.volume = this._volume;
        audio.preload = 'auto';

        if(type === 'Voice'){
            this._VoiceMap.set(`${type}_${key}`, audio)
        }

        if(type === 'BGM'){
            this._BGMMap.set(`${type}_${key}`, audio)
        }

        if(type === 'SE'){
            this._SEMap.set(`${type}_${key}`, audio)
        }

        return audio
    }

    async playBGM(uid){
        this._currentAudio['BGM'] = this._BGMMap.get(`BGM_${uid}`)
        this._currentAudio['BGM'].loop = true
        this._currentAudio['BGM'].play()
        this._currentAudio['BGM'].volume = 0.6

        return Promise.resolve()
    }

    async playSE_Part(uid){
        this._currentAudio['SE'] = this._SEMap.get(`SE_${uid}`)
        this._currentAudio['SE'].play()
        return Promise.resolve()
    }

    async playSE_Full(uid){
        this._currentAudio['SE'] = this._SEMap.get(`SE_${uid}`)
        return new Promise((res)=>{
            this._currentAudio['SE'].play()
            this._currentAudio['SE'].onended = () => {
                res()
            }
        })
    }

    async playVoice(uid){
        this._currentAudio['Voice'] = this._VoiceMap.get(`Voice_${uid}`)
        return new Promise((res)=>{
            this._currentAudio['Voice'].play()
            this._currentAudio['Voice'].onended = () => {
                res()
            }
        })
    }

    mute(type, bool){
        let audio = this._currentAudio[type]
        if(audio) {
            audio.muted = bool
        }
    }


    muteAll(bool){
        for(let key of Object.entries(this._currentAudio)) {
            let audio = this._currentAudio[key]
            if(audio) {
                audio.muted = bool
            }
        }
    }

    pause(type){
        let audio = this._currentAudio[type]
        if(audio){
            audio.pause()
        }
    }

    pauseAll(){
        for(let key of Object.entries(this._currentAudio)) {
            let audio = this._currentAudio[key]
            if(audio){
                audio.pause()
            }
        }
    }

    static get L2dAudioPlayer() {
        return this._L2dAudioPlayer
    }

}
