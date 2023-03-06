var params = new URLSearchParams(window.location.search)
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')
var lang = params.get('lang')


const element = document.getElementById('app')

const app = PixiApp.create(element, {
    // width : 1480,
    // height : 720,
    width : 1334,
    height : 750,
    // background : 0xFFFFFF,
})

ScenarioReader.create(app)

let src = ResourcePath.getScenarioSrc(story_type, story_id, phase)
if(src != undefined) {
    ScenarioReader.loadMasterList(src, lang)
}
else{
    alert('please enter the correct parameters <type, id, phase>')
}
