class Live2dAudioPlayer extends PIXI.utils.EventEmitter {

    constructor() {
        super()

        this._lastrms = 0
        this._audio = new Audio()
        this._audio.muted = true
        this._audio.crossOrigin = "anonymous";
        this._audioMap = new Map()
        this._index = 0;
    }

    setupAnalyzer() {
        this._audioContext = new (AudioContext || webkitAudioContext)()
        this._analyser = this._audioContext.createAnalyser();
        this._analyser.fftSize = 128;
        
        const source = this._audioContext.createMediaElementSource(this._audio)
        const audioSourceContext = source.context
        
        source.connect(this._analyser)
        source.connect(audioSourceContext.destination)

        this._bufferLength = this._analyser.frequencyBinCount
        this._freqData = new Uint8Array(this._bufferLength);
    }

    addAudio(src) {
        let index = (this._audioMap.size + 1)
        this._audioMap.set(index, src)
    }

    async playAudioByIndex(index) {
        let audio_src = this._audioMap.get(index)
        if(!audio_src){
            return
        }

        return new Promise((resolve, reject) => {
            this._audio.src = src
            this._audio.muted = false
            
            if(this._audioContext != undefined){
                if(this._audioContext.state === 'suspended') {
                    this._audioContext.resume()
                }
            }
            
            this._playAudio()
            this._audio.play()

            // this._audio.addEventListener('ended', ()=>{
            //     if(this._audioContext.state === 'running') {
            //         this._audioContext.suspend()
            //     }
            //     resolve()
            // } ,{once : true})
            // this._audio.addEventListener('error', reject ,{once : true}) 

            this._audio.onended = () =>{
                if(this._audioContext.state === 'running') {
                    this._audioContext.suspend()
                }
                resolve()
            }

            this._audio.onerror = () => {
                reject()
            }
        })
    }

    async loadAudio(src) {
        if(!src) {
            return
        }

        return new Promise((resolve, reject) => {
            
            this._audio.src = src
            this._audio.muted = false
            this._audio.load()

            this._audio.oncanplaythrough = () => {
                resolve()
            }

            this._audio.onerror = () => {
                reject()
            }
        })
    }

    async playAudio() {
    
        return new Promise((resolve, reject) => {
            // this._audio.src = src
            // this._audio.muted = false
            
            this._playAudio()
            this._audio.play()
            
            this._audio.onended = () =>{
                if(this._audioContext.state === 'running') {
                    this._audioContext.suspend()
                }
                resolve()
            }

            this._audio.onerror = () => {
                reject()
            }
        })

    }

    _playAudio() {
        if(this._audioContext === undefined) {
            this.setupAnalyzer()
        }

        // if(this._audioContext.state === 'suspended') {
        //     this._audioContext.resume()
        // }

        else if(this._audioContext != undefined){
            if(this._audioContext.state === 'suspended') {
                this._audioContext.resume()
            }
        }
    }

    pauseAudio() {
        this._audio.pause();
    }

    muteAudio(bool) {
        this._audio = bool
    }

    nextplay() {
        this._index = (this._index + 1) % this._audioMap.size;
        this.playAudio(this._index)
    }

    update() {

        if (this._audioContext === undefined || this._audioContext?.state === 'suspended') {
            this._lastrms = 0;
            return;
        }
        
        this._analyser.getByteFrequencyData(this._freqData);

        let sum = 0
        for(var i = 0; i < this._bufferLength ; i++) {
            let b = this._freqData[i];
            
            sum += b;
        }
        
        let rms = Math.sqrt(sum / this._bufferLength) / 11.5
        rms = (rms > 1?1:rms)
        this._lastrms = rms
    }

    get Webaudio() {
        return this._audio
    }

    get Rms() {
        return this._lastrms
    }

    set index(num){
        this._index = num
    }

}