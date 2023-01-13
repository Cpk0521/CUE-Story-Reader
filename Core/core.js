var params = new URLSearchParams(window.location.search)
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')
var lang = params.get('lang')

window.onload = () => {

    const element = document.getElementById('app')

    const app = GameApp.create(element, {
        // width : 1480,
        // height : 720,
        width : 1334,
        height : 750,
        // background : 0xFFFFFF,
    })
    
    ScenarioReader.create(app)
    ScenarioReader.loadMasterList('./Test/Card_4030016_2.json')
    // ScenarioReader.loadMasterList('./Assets/Scenario/card/Card_01/Card_4010005_3.json')

    // let src = ResourcePath.getScenarioSrc(story_type, story_id, phase)
    // if(src != undefined) {
    //     ScenarioReader.loadMasterList(src, lang)
    // }
    // else{
    //     alert('please enter the correct parameters <type, id, phase>')
    // }




}