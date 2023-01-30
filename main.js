import { PixiApp } from "./PixiApp.js"
import ScenarioConfig from './ScenarioPlayer/ScenarioConfig.js'
import ScenarioPlayer from './ScenarioPlayer/ScenarioPlayer.js'

var params = new URLSearchParams(window.location.search)
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')
var lang = params.get('lang')

const element = document.getElementById('app')

const pixiApp = PixiApp.create(element, {
    // width : 1480,
    // height : 720,
    width : 1334,
    height : 750,
    // background : 0xFFFFFF,
})

const Advplayer = ScenarioPlayer.create().addTo(pixiApp.mainContainer)
Advplayer.loadStoryScript('./Test/Card_1010001_1.json')