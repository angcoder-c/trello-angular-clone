import { Color } from "./types";

export const colors: Color[] = [
    // row 1
    {
        hex: "#164b35"
    },
    {
        hex: "#533f04"
    },
    {
        hex: "#693200"
    },
    {
        hex: "#5d1f1a"
    },
    {
        hex: "#48245d"
    },

    // row 2

    {
        hex: "#216e4e"
    },
    {
        hex: "#7f5f01"
    },
    {
        hex: "#9e4c00"
    },
    {
        hex: "#ae2e24"
    },
    {
        hex: "#803fa5"
    },


    // row 3

    {
        hex: "#4bce97"
    },
    {
        hex: "#ddb30e"
    },
    {
        hex: "#fca700"
    },
    {
        hex: "#f87168"
    },
    {
        hex: "#c97cf4"
    },

    // row 4

    {
        hex: "#123263"
    },
    {
        hex: "#164555"
    },
    {
        hex: "#37471f"
    },
    {
        hex: "#50253f"
    },
    {
        hex: "#4b4d51"
    },

    // row 5

    
    {
        hex: "#1558bc"
    },
    {
        hex: "#206a83"
    },
    {
        hex: "#4c6b1f"
    },
    {
        hex: "#943d73"
    },
    {
        hex: "#63666b"
    },

    // row 6
    
    {
        hex: "#669df1"
    },
    {
        hex: "#6cc3e0"
    },
    {
        hex: "#94c748"
    },
    {
        hex: "#e774bb"
    },
    {
        hex: "#96999e"
    },

]

export const defaultLabelOptions = [
    {
        name: null,
        color: { 
            hex: '#216e4e'
        }
    },
    {
        name: null,
        color: { 
            hex: '#7f5f01'
        }
    },
    {
        name: null,
        color: { 
            hex: '#803fa5'
        }
    },
    {
        name: null,
        color: { 
            hex: '#1558bc'
        }
    }
]

export const defaultBoardBackgroundColors: Color[][] = [
    // row 1
    [
        {
            hex: '#0067a3'
        }
    ],
    [
        {
            hex: '#d29034'
        }
    ],
    [
        {
            hex: '#519839'
        }
    ],

    // row 2
    [
        {
            hex: '#b04632'
        }
    ],
    [
        {
            hex: '#89609e'
        }
    ],
    [
        {
            hex: '#cd5a91'
        }
    ],


    // row 3
    [
        {
            hex: '#4bbf6b'
        }
    ],
    [
        {
            hex: '#00aecc'
        }
    ],
    [
        {
            hex: '#838c91'
        }
    ]
]

export const defaultBoardBackgroundGradientColors: Color[][] = [
    // row 1
    [
        { hex: '#1b2b44' },
        { hex: '#123161' }
    ],
    [
        { hex: '#0d68e2'},
        { hex: '#35b0c5' }
    ],
    [
        { hex: '#0c63de'},
        { hex: '#093574' }
    ],

    // row 2
    [
        { hex: '#0d336d'},
        { hex: '#c14f9a' }
    ],
    [
        { hex: '#725ec6'},
        { hex: '#de72bb' }
    ],
    [
        { hex: '#e34a35'},
        { hex: '#f89f3c' }
    ],


    // row 3
    [
        { hex: '#e774b9'},
        { hex: '#f77468' }
    ],
    [
        { hex: '#20855d'},
        { hex: '#5dc3cb' }
    ],
    [
        { hex: '#505f79'},
        { hex: '#1b2e50' }
    ],


    // row 4
    [
        { hex: '#44290f'},
        { hex: '#a72a18' }
    ],
    [
        { hex: '#B3934D'},
        { hex: '#FF0000' }
    ],
    [
        { hex: '#A7FF4F'},
        { hex: '#F0781D' }
    ]
]

export function backgroundColorToStyle (colors: Color[]): string {
    if (colors.length===0) return '#083b82'
    if (colors.length===1) return colors[0].hex
    const initPorcentageGradient = 100 / colors.length

    const bgColorsGradient = colors.map((color, index) => {
      if (!color.hex) return '#083b82'
      return `${color.hex} ${initPorcentageGradient * (index)}%`
    })
    
    return `linear-gradient(145deg, ${bgColorsGradient.join(', ')})`

} 