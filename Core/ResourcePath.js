class ResourcePath{

    static l2dsrc = 'https://cpk0521.github.io/CUE-live2d-Viewer'
    static resource_path = 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/voice/'
    static image_src = 'https://raw.githubusercontent.com/Cpk0521/CUECardsViewer/master/public/Cards/'
    static translate_src = 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/scenario/'
    
    static getScenarioSrc(storyType, storyId, storyPhase, storyheroine){
        return ''
    }

    static getL2dSrc(heroineId, costumeId){
        return `./Assets/Live2d/${heroineId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}_${costumeId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}.model3.json`
    }

    static getL2dSrc2(heroineId, costumeId){
        return `${this.l2dsrc}/live2d/${heroineId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}_${costumeId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}.model3.json`
    }

    static getBGSrc(id, subid) {
        return `./Assets/Backgrounds/background${id.toString().padStart(3,'0')}_${subid}/`
    }

    static getAudioSrc(index, storyType, storyId, storyPhase, storyheroine) {
        let src = ''

        switch (storyType) {
            case "Main":
                src = `${this.resource_path}/main_01/Main_01_${storyId.toString().padStart(2, '0')}/Main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}/main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}_${index.toString().padStart(3, '0')}.mp3`
                break;
            case "Event":
                break;
            case "Card":
                src = `${this.resource_path}/${storyType.toLowerCase()}/${storyType}_${storyheroine.toString().padStart(2, '0')}/${storyType}_${storyId}_${storyPhase}/${storyType.toLowerCase()}_${storyId}_${storyPhase}_${index.toString().padStart(3, '0')}.mp3`
                break;
            case "Link":
                break;
            case "Lesson":
                break;
        }

        return src
    }

    static getBGMAudioSrc(index) {
        return `./Assets/Audio/BGM/${index.toString().padStart(3, '0')}.mp3`
    }

    static getSEAudioSrc(index) {
        return `./Assets/Audio/SE/scenario_${index.toString().padStart(3, '0')}.mp3`
    }

    static getImageSrc(storyId, imageType) {
        return `${this.image_src}/${storyId}/Card_${storyId}_${imageType}_b.png`
    }

    static getMovieSrc(name){
        return `./Assets/Movie/${name}.mp4`
    }

    static getTranslateSrc(storyType, storyId, storyPhase, storyheroine){
        let src = ''
        switch (storyType) {
            case "Main":
                break;
            case "Event":
                break;
            case "Card":
                src = `${this.translate_src}/${storyType.toLowerCase()}/${storyType}_${storyheroine.toString().padStart(2, '0')}/${storyType}_${storyId}_${storyPhase}.json`
                break;
            case "Link":
                break;
            case "Lesson":
                break;
        }

        return src
    }
    
}