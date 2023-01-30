class ResourceConverterClass {


    setup(config){
        this._l2dSrc = config.l2dSrc ?? 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/'
        this._voiceSrc = config.voiceSrc ?? 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/voice/'
        this._imageSrc = config.imageSrc ?? 'https://raw.githubusercontent.com/Cpk0521/CUECardsViewer/master/public/Cards/'
        this._translationSrc = config.translationSrc ?? 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/scenario/'
        this._scenarioSrc = config.scenarioSrc ?? './Assets/Scenario/'
        this._bgSrc = config.bgSrc ?? './Assets/Backgrounds/'
        this._movieSrc = config.movieSrc ?? './Assets/Movie/'

        return this
    }

    getScenarioSrc(storyType, storyId, storyPhase){

        if(storyType == undefined || storyId == undefined) {
            return
        }

        let src = ''
        switch (storyType) {
            case "Main":
                src = `${this._scenarioSrc}/main_01/Main_01_${storyId.toString().padStart(2, '0')}/Main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
                break;
            case "Event":
                src = `${this._scenarioSrc}/event/Event_${storyId.toString().padStart(3, '0')}/Event_${storyId.toString().padStart(3, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
                break;
            case "Card":
                src = `${this._scenarioSrc}/card/Card_${storyId.toString()[1]}${storyId.toString()[2]}/Card_${storyId}_${storyPhase}.json`
                break;
            case "Link":
                src = `${this._scenarioSrc}/link/Link_${storyId.toString().padStart(3, '0')}.json`
                break;
            case "Lesson":
                src = `${this._scenarioSrc}/lesson/Lesson_${storyId.toString().padStart(5, '0')}.json`
                break;
        }

        return src
    }

    getL2dSrc(heroineId, costumeId){
        return `${this._l2dSrc}/live2d/${heroineId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}_${costumeId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}.model3.json`
    }

    getBGSrc(id, subid) {
        return `${this._bgSrc}/background${id.toString().padStart(3,'0')}_${subid}/`
    }

    getImageSrc(storyId, imageType) {
        return `${this._imageSrc}/${storyId}/Card_${storyId}_${imageType}_b.png`
    }

    getMovieSrc(name){
        return `${this._movieSrc}/${name}.mp4`
    }

    getTranslateSrc(storyType, storyId, storyPhase, storyheroine){

        if(storyType == undefined || storyId == undefined || storyPhase == undefined){
            return
        }

        let src = ''
        switch (storyType) {
            case "Main":
                src = `${this._translationSrc}/main_01/Main_01_${storyId.toString().padStart(2, '0')}/Main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
                break;
            case "Event":
                src = `${this._translationSrc}/event/Event_${storyId.toString().padStart(3, '0')}/Event_${storyId.toString().padStart(3, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
                break;
            case "Card":
                src = `${this._translationSrc}/card/Card_${storyheroine.toString().padStart(2, '0')}/Card_${storyId}_${storyPhase}.json`
                break;
            case "Link":
                src = `${this._translationSrc}/link/Link_${storyId.toString().padStart(3, '0')}.json`
                break;
            case "Lesson":
                src = `${this._translationSrc}/lesson/Lesson_${storyId.toString().padStart(5, '0')}.json`
                break;
        }

        return src
    }
}

const ResourceConverter = new ResourceConverterClass()

export default ResourceConverter