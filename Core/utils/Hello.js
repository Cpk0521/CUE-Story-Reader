import { VERSION } from '../config/AppConfig.js'

export function Hello(){
    let log = [
        `\n\n %c  %c  CUE! Stories Adv Player ${VERSION}  %c  %c  https://github.com/Cpk0521  %c \n\n`,
        'background: #00ffff; padding:5px 0;',
        'color: #00ffff; background: #030307; padding:5px 0;',
        'background: #00ffff; padding:5px 0;',
        'background: #CCffff; padding:5px 0;',
        'background: #00ffff; padding:5px 0;',
    ]
    console.log(...log);
}