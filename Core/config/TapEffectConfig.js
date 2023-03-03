import { TAP_TEXTURE } from './AssetsConfig.js'

export const TapEffectConfig = {
    "lifetime": {
        "min": 0.5,
        "max": 0.5
    },
    "frequency": 0.001,
    "emitterLifetime": .2,
    "maxParticles": 15,
    "addAtBack": true,
    "pos": {
        "x": 0,
        "y": 0
    },
    "behaviors": [
        {
            "type": "alpha",
            "config": {
                "alpha": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.5
                        },
                        {
                            "time": 1,
                            "value": 0.15
                        }
                    ]
                }
            }
        },
        {
            "type": "moveSpeed",
            "config": {
                "speed": {
                    "list": [
                        {
                            "time": 0,
                            "value": 120
                        },
                        {
                            "time": 1,
                            "value": 50
                        }
                    ]
                },
                "minMult": 1
            }
        },
        {
            "type": "scale",
            "config": {
                "scale": {
                    "list": [
                        {
                            "time": 0,
                            "value": 0.5
                        },
                        {
                            "time": 1,
                            "value": 0.1
                        }
                    ]
                },
                "minMult": 1
            }
        },
        {
            "type": "colorStatic",
            "config": {
                "color": "#ffffff"
            }
        },
        {
            "type": "rotationStatic",
            "config": {
                "min": -1,
                "max": -360
            }
        },
        {
            "type": "noRotation",
            "config": {}
        },
        {
            "type": "textureRandom",
            "config": {
                "textures": [
                    TAP_TEXTURE
                ]
            }
        },
        {
            "type": "spawnPoint",
            "config": {
                    type: 'circle',
                    data: {
                        x: 0,
                        y: 0,
                        radius: 50
                    }
                }
        }
    ]
}


export const TapEffectConfig_old = {
	"alpha": {
		"start": 1,
		"end": 0.25
	},
	"scale": {
		"start": 0.8,
		"end": 0.25,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ffffff",
		"end": "#ffffff"
	},
	"speed": {
		"start": 150,
		"end": 50,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": -1,
		"max": -360
	},
	"noRotation": true,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.5,
		"max": 0.5
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 10,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
}