class Live2dAudioPlayer extends PIXI.utils.EventEmitter {

    constructor() {
        super()

        this._lastrms = 0
        this._audio = new Audio()
        this._audio.muted = true
        this._audio.crossOrigin = "anonymous";
    }

    createAnalyzer() {
        this._audioContext = new (AudioContext || webkitAudioContext)()
        const source = this._audioContext.createMediaElementSource(this._audio)
        this._analyser = this._audioContext.createAnalyser();

        // this._analyser.fftSize = 128;
        this._analyser.fftSize = 256;
        this._analyser.minDecibels = -90;
        this._analyser.maxDecibels = -10;
        this._analyser.smoothingTimeConstant = 0.85;
        
        const audioSourceContext = source.context
        
        source.connect(this._analyser)
        source.connect(audioSourceContext.destination)
        // this._analyser.connect(source.destination)

        this._bufferLength = this._analyser.frequencyBinCount
        this._freqData = new Uint8Array(this._bufferLength);
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
                resolve()
            }
        })
    }
 
    async playAudio() {
    
        return new Promise((resolve, reject) => {

            if(this._audio.networkState != 3) {
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
                
            }else{
                resolve()
            }
            
        })

    }

    _playAudio() {
        if(this._audioContext === undefined) {
            this.createAnalyzer()
        }
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
        
        // let rms = Math.sqrt(sum / this._bufferLength) / 11.5
        this._lastrms = Math.min(parseFloat(Math.sqrt(sum / this._bufferLength) / 11.5), 1)
        // rms = (rms > 1?1:rms)
        // this._lastrms = rms
    }

    // analyze(){        
    //     if (this._audioContext === undefined || this._audioContext?.state === 'suspended') {
    //         this._lastrms = 0;
    //         return;
    //     }
        
    //     let pcmData = new Float32Array(this._analyser.fftSize);
    //     let sumSquares = 0.0;
    //     this._analyser.getFloatTimeDomainData(pcmData);

    //     for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
    //     this._lastrms = Math.min(parseFloat(Math.sqrt((sumSquares / pcmData.length) * 20).toFixed(1)), 1);
    // }

    get Webaudio() {
        return this._audio
    }

    get Rms() {
        return this._lastrms
    }


}