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

export const TapEffectConfig2 = {
    "lifetime": {
      "min": 0.5,
      "max": 0.5
    },
    "frequency": 0.001,
    "emitterLifetime": .2,
    "maxParticles": 10,
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
                "value": 0.80
              },
              {
                "time": 1,
                "value": 0.3
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
                "value": 45
              },
              {
                "time": 1,
                "value": 10
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
                "value": 0.55
              },
              {
                "time": 1,
                "value": 0.15
              }
            ]
          },
          "minMult": 0.01
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
        "type": "textureSingle",
        "config": {
          "texture": TAP_TEXTURE
        }
      },
      {
        "type": "spawnShape",
        "config": {
          "type": "torus",
          "data": {
            "x": 0,
            "y": 0,
            "radius": 30,
            "innerRadius": 30,
            "affectRotation": true
          }
        }
      }
    ]
  }