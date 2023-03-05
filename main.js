import { PixiApp, getScenarioSrc, ScenarioPlayer, AssetsCache, FONT_RESOURCE } from './Core/index.js'

//get params by url /?=
var params = new URLSearchParams(window.location.search)
var story_type = params.get('type')
var story_id = params.get('id')
var phase = params.get('phase')
var lang = params.get('lang')

//create Pixi App
const element = document.getElementById('app')
const App = PixiApp.create(element, {
    width : 1334,
    height : 750,
    background : 0xffffff,
})

//load Font
let s = await AssetsCache.addToCache(FONT_RESOURCE, {
    Label : 'Font',
    objType : true
})
// PIXI.Assets.addBundle('Font', FONT_RESOURCE)
// let s = await PIXI.Assets.loadBundle('Font')

//load Player
const player = ScenarioPlayer.create()
player.addTo(App.Stage)

//search and load the StoryScript by params
let src = getScenarioSrc(story_type, story_id, phase)
if(src) {
    await player.loadStoryScript(src, lang)
}
// else{
//     alert('please enter the correct parameters <type, id, phase>')
// }
