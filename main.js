import { PixiApp, getScenarioSrc} from './CorePlayer/index.js'

var params = new URLSearchParams(window.location.search)
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')
var lang = params.get('lang')

const element = document.getElementById('app')

const App = PixiApp.create(element, {
    width : 1334,
    height : 750
})

let src = getScenarioSrc(story_type, story_id, phase)

// const Advplayer = ScenarioPlayer.create().addTo(pixiApp.mainContainer)
// Advplayer.loadStoryScript('./Test/Card_1010001_1.json')