function delay(time, word){
    let myTimeout = {}
    myTimeout.p = new Promise( async (res,rej) => {
        myTimeout.cancel = (err = '') => {
            clearTimeout(myTimeout._timeout);
            rej(err)
        }
        
        myTimeout._timeout = setTimeout(function(){
            console.log(word)
            res()
        }, time)
        

        await delay2(1000).then(()=> console.log('2', word) )
    })

    return myTimeout
}

async function delay2(dt){
    return new Promise((res, rej) => {
        setTimeout(function(){
            console.log('run')
            res()
        }, dt)
    })
}

let h1 = delay(3000, 'Hello')
let h2 = delay(3000, 'Hello2')
let h3 = delay(3000, 'Hello3')
let h4 = delay(3000, 'Hello4')
console.log(h1)
h1.cancel()
h3.cancel()

let josn = PIXI.particles.upgradeConfig(conf, TAP_TEXTURE)

var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(josn, null, 2));
var a = document.createElement('a');
a.href = 'data:' + data;
a.download = 'data.json';
a.innerHTML = 'download JSON';

var container = document.getElementById('app');
container.append(a);