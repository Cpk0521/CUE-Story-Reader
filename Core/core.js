var params = new URLSearchParams(window.location.search)
var story = params.get('storyid')
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')

window.onload = () => {

    const element = document.getElementById('app')

    const app = GameApp.create(element, {
        width : 1480, //1480
        height : 720, //720
        // background : 0xFFFFFF,
    })
    
    ScenarioReader.create(app)
    // ScenarioReader.loadMasterList('./Test/Card_1010001_1.json')
    // ScenarioReader.loadMasterList('./Test/Card_3010004_2.json')
    // ScenarioReader.loadMasterList('./Test/Card_1130001_1.json')
    // ScenarioReader.loadMasterList('./Test/Card_4010012_3.json')
    ScenarioReader.loadMasterList('./Test/Card_4010005_3.json')
    // ScenarioReader.loadMasterList('./Test/Card_2150002_2.json')


}