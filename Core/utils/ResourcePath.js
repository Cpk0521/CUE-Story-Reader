export const l2d_Url = 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/live2d/'
export const voice_Url = 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/voice/'
export const image_Url = 'https://raw.githubusercontent.com/Cpk0521/CUECardsViewer/master/public/Cards/'
export const translate_Url = 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/scenario/'
export const scenario_Url = './Assets/Scenario/'
export const background_Url = './Assets/Backgrounds/'
export const movie_Url = './Assets/Movie/'
export const Local_Url = './Assets/'

export function getScenarioSrc(storyType, storyId, storyPhase){
    if(storyType == undefined || storyId == undefined) {
        return
    }

    let src = ''

    switch (storyType) {
        case "Main":
            src = `${scenario_Url}/main_01/Main_01_${storyId.toString().padStart(2, '0')}/Main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
            break;
        case "Event":
            src = `${scenario_Url}/event/Event_${storyId.toString().padStart(3, '0')}/Event_${storyId.toString().padStart(3, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
            break;
        case "Card":
            src = `${scenario_Url}/card/Card_${storyId.toString()[1]}${storyId.toString()[2]}/Card_${storyId}_${storyPhase}.json`
            break;
        case "Link":
            src = `${scenario_Url}/link/Link_${storyId.toString().padStart(3, '0')}.json`
            break;
        case "Lesson":
            src = `${scenario_Url}/lesson/Lesson_${storyId.toString().padStart(5, '0')}.json`
            break;
    }

    return src
}

export function getL2dSrc(heroineId, costumeId){
    return `${l2d_Url}/${heroineId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}_${costumeId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}.model3.json`
}

export function getLocalL2dSrc(heroineId, costumeId){
    return `${Local_Url}/Live2d/${heroineId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}_${costumeId.toString().padStart(3, '0')}/${heroineId.toString().padStart(3, '0')}.model3.json`
}

export function getBGSrc(id, subid) {
    return `${background_Url}/background${id.toString().padStart(3,'0')}_${subid}/`
}

export function getImageSrc(storyId, imageType) {
    return `${image_Url}/${storyId}/Card_${storyId}_${imageType}_b.png`
}

export function getMovieSrc(name){
    return `${movie_Url}/${name}.mp4`
}

export function getTranslateSrc(storyType, storyId, storyPhase, storyheroine){

    if(storyType == undefined || storyId == undefined || storyPhase == undefined){
        return
    }

    let src = ''
    switch (storyType) {
        case "Main":
            src = `${translate_Url}/main_01/Main_01_${storyId.toString().padStart(2, '0')}/Main_01_${storyId.toString().padStart(2, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
            break;
        case "Event":
            src = `${translate_Url}/event/Event_${storyId.toString().padStart(3, '0')}/Event_${storyId.toString().padStart(3, '0')}_${storyPhase.toString().padStart(2, '0')}.json`
            break;
        case "Card":
            src = `${translate_Url}/card/Card_${storyheroine.toString().padStart(2, '0')}/Card_${storyId}_${storyPhase}.json`
            break;
        case "Link":
            src = `${translate_Url}/link/Link_${storyId.toString().padStart(3, '0')}.json`
            break;
        case "Lesson":
            src = `${translate_Url}/lesson/Lesson_${storyId.toString().padStart(5, '0')}.json`
            break;
    }

    return src
}