export const getPrebuiltTheme = (themeId: number) => (
  {
      "Borders": {
        groups: [{name: 'group', themeId, id: 1}],
        tokens: [
          {
            "name": "border-1",
            "groupId": 1,
            themeId,
            "color": "#a6a7ad",
            "width": 1,
            "style": "solid",
            "id": 1
          },
          {
            "name": "border-2",
            "groupId": 1,
            themeId,
            "color": "#a6a7ad",
            "width": 2,
            "style": "solid",
            "id": 2
          },
          {
            "name": "border-3",
            "groupId": 1,
            themeId,
            "color": "#a6a7ad",
            "width": 3,
            "style": "solid",
            "id": 3
          },
          {
            "name": "border-4",
            "groupId": 1,
            themeId,
            "color": "#a6a7ad",
            "width": 4,
            "style": "solid",
            "id": 4
          }
        ],
      },
      "Corner Radii": {
        groups: [{name: 'group', themeId, id: 1}],
        tokens: [
          {
            "name": "border-radius-100",
            "groupId": 1,
            themeId,
            "radius": 2,
            "id": 1
          },
          {
            "name": "border-radius-200",
            "groupId": 1,
            themeId,
            "radius": 4,
            "id": 2
          },
          {
            "name": "border-radius-300",
            "groupId": 1,
            themeId,
            "radius": 8,
            "id": 3
          },
          {
            "name": "border-radius-400",
            "groupId": 1,
            themeId,
            "radius": 12,
            "id": 4
          }
        ],
      },
      "Durations": {
        groups: [
          {
            "id": 1,
            "name": 'group',
            themeId,
            "scaleBase": 300,
            "scaleRatio": 1,
          }
        ],
        tokens: [
          {
            "name": "timing-100",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 100,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 0,
            "id": 1
          },
          {
            "name": "timing-200",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 200,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -1,
            "id": 2
          },
          {
            "name": "timing-300",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 300,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": -2,
            "id": 3
          },
          {
            "name": "timing-400",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 400,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -3,
            "id": 4
          },
          {
            "name": "timing-500",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 500,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -4,
            "id": 5
          },
          {
            "id": 6,
            "name": "timing-600",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 600,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -5
          },
          {
            "id": 7,
            "name": "timing-700",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 700,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -6
          },
          {
            "id": 8,
            "name": "timing-800",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 600,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -7
          },
          {
            "id": 9,
            "name": "timing-900",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 900,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -8
          },
          {
            "id": 10,
            "name": "timing-1000",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 1000,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": -9
          }
        ],
      },
      "Box Shadow": {
        groups: [{id: 1, name: 'group', themeId}],
        tokens: [
          {
            "name": "shadow-xs",
            "groupId": 1,
            themeId,
            "backgroundColor": "#dcdcdc",
            "blockColor": "#ffffff",
            "layers": [
              {
                "offsetX": "0px",
                "offsetY": "1px",
                "blur": "3px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.12)",
                "inset": ""
              },
              {
                "offsetX": "0px",
                "offsetY": "1px",
                "blur": "2px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.24)",
                "inset": ""
              }
            ],
            "id": 1
          },
          {
            "name": "shadow-sm",
            "groupId": 1,
            themeId,
            "backgroundColor": "#dcdcdc",
            "blockColor": "#ffffff",
            "layers": [
              {
                "offsetX": "0px",
                "offsetY": "3px",
                "blur": "6px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.16)",
                "inset": ""
              },
              {
                "offsetX": "0px",
                "offsetY": "3px",
                "blur": "6px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.23)",
                "inset": ""
              }
            ],
            "id": 2
          },
          {
            "name": "shadow-md",
            "groupId": 1,
            themeId,
            "backgroundColor": "#dcdcdc",
            "blockColor": "#ffffff",
            "layers": [
              {
                "offsetX": "0px",
                "offsetY": "10px",
                "blur": "20px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.19)",
                "inset": ""
              },
              {
                "offsetX": "0px",
                "offsetY": "6px",
                "blur": "6px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.23)",
                "inset": ""
              }
            ],
            "id": 3
          },
          {
            "id": 4,
            "name": "shadow-lg",
            "groupId": 1,
            themeId,
            "backgroundColor": "#dcdcdc",
            "blockColor": "#ffffff",
            "layers": [
              {
                "offsetX": "0px",
                "offsetY": "14px",
                "blur": "28px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.25)",
                "inset": ""
              },
              {
                "offsetX": "0px",
                "offsetY": "10px",
                "blur": "10px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.22)",
                "inset": ""
              }
            ]
          },
          {
            "id": 5,
            "name": "shadow-xl",
            "groupId": 1,
            themeId,
            "backgroundColor": "#dcdcdc",
            "blockColor": "#ffffff",
            "layers": [
              {
                "offsetX": "0px",
                "offsetY": "19px",
                "blur": "38px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.3)",
                "inset": ""
              },
              {
                "offsetX": "0px",
                "offsetY": "15px",
                "blur": "12px",
                "spread": "0px",
                "color": "rgba(0,0,0,0.22)",
                "inset": ""
              }
            ]
          }
        ],
      },
      "Spacing": {
        groups: [
          {
            "name": "scale",
            themeId,
            "scaleBase": 16,
            "scaleRatio": 1.333,
            "id": 1,
          }
        ],
        tokens: [
          {
            "id": 1,
            "name": "space-xxxxl",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 89.764,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 7
          },
          {
            "id": 2,
            "name": "space-xxxl",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 67.34,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 6
          },
          {
            "id": 3,
            "name": "space-xxl",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 50.517,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 5
          },
          {
            "id": 4,
            "name": "space-xl",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 37.897,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 4
          },
          {
            "id": 5,
            "name": "space-lg",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 28.43,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 3
          },
          {
            "id": 6,
            "name": "space-md",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 21.328,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 2
          },
          {
            "id": 7,
            "name": "space-sm",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 12.003,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 0
          },
          {
            "id": 8,
            "name": "space-xs",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 9.005,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": -1
          },
          {
            "id": 9,
            "name": "space-xxs",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 6.755,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": -2
          },
          {
            "id": 10,
            "name": "space-xxxs",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 5.068,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": -3
          },
          {
            "id": 11,
            "name": "space-xxxxs",
            "groupId": 1,
            themeId,
            "modularScaleTokenValue": 3.802,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": -4
          }
        ],
      },
      "Typefaces": {
        groups: [{name: 'group', themeId, id: 1}],
        tokens: [
          {
            "name": "font-primary",
            "groupId": 1,
            themeId,
            "family": "Roboto",
            "type": "google-fonts",
            "data": "",
            "id": 1,
            "variants": [
              "100",
              "100italic",
              "300",
              "300italic",
              "regular",
              "italic",
              "500",
              "500italic",
              "700",
              "700italic",
              "900",
              "900italic"
            ],
            "subsets": [
              "cyrillic",
              "cyrillic-ext",
              "greek",
              "greek-ext",
              "latin",
              "latin-ext",
              "vietnamese"
            ],
            "category": "sans-serif"
          },
          {
            "id": 2,
            "name": "font-secondary",
            "groupId": 1,
            themeId,
            "family": "Open Sans",
            "type": "google-fonts",
            "data": "",
            "variants": [
              "300",
              "regular",
              "500",
              "600",
              "700",
              "800",
              "300italic",
              "italic",
              "500italic",
              "600italic",
              "700italic",
              "800italic"
            ],
            "subsets": [
              "cyrillic",
              "cyrillic-ext",
              "greek",
              "greek-ext",
              "hebrew",
              "latin",
              "latin-ext",
              "vietnamese"
            ],
            "category": "sans-serif"
          }
        ]
      },
      "Text Styles": {
        groups: [
          {
            name: "Headlines & Subtitles",
            themeId,
            id: 1,
            "scaleBase": 16,
            "scaleRatio": 1,
            "view": "minimal",
            "text": "Headline",
            "backgroundColor": "#1e2022",
            "color": "#D6D6D6",
            "typefaceId": 2,
          },
          {
            "name": "Body & Captions",
            themeId,
            "id": 2,
            "scaleBase": 16,
            "scaleRatio": 1,
            "view": "minimal",
            "text": "Headline",
            "backgroundColor": "#1e2022",
            "color": "#D6D6D6",
            "typefaceId": 1,
          }
        ],
        tokens: [
          {
            "name": "h1",
            "groupId": 1,
            themeId,
            "letterSpacing": -0.016,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "300",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 96,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 7,
            "id": 1,
            "text": "Headline 1"
          },
          {
            "name": "h2",
            "groupId": 1,
            themeId,
            "letterSpacing": -0.009,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "300",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 60,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 6,
            "id": 2,
            "text": "Headline 2"
          },
          {
            "name": "h3",
            "groupId": 1,
            themeId,
            "letterSpacing": 0,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "400",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 48,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 5,
            "id": 3,
            "text": "Headline 3"
          },
          {
            "name": "h4",
            "groupId": 1,
            themeId,
            "letterSpacing": 0.007,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "400",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 34,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 4,
            "id": 4,
            "text": "Headline 4"
          },
          {
            "name": "h5",
            "groupId": 1,
            themeId,
            "letterSpacing": 0,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "400",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 24,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 3,
            "id": 5,
            "text": "Headline 5"
          },
          {
            "name": "h6",
            "groupId": 1,
            themeId,
            "letterSpacing": 0.01,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "500",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 16,
            "modularScaleTokenIsLocked": false,
            "modularScaleTokenPosition": 2,
            "id": 6,
            "text": "Headline 6"
          },
          {
            "id": 7,
            "name": "subtitle-1",
            "groupId": 1,
            themeId,
            "letterSpacing": 0.01,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "400",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 16,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 1,
            "text": "Subtitle 1"
          },
          {
            "id": 8,
            "name": "subtitle-2",
            "groupId": 1,
            themeId,
            "letterSpacing": 0.0071,
            "lineHeight": 1.2,
            "wordSpacing": 0,
            "fontWeight": "500",
            "textDecoration": "none",
            "fontStyle": "normal",
            "modularScaleTokenValue": 14,
            "modularScaleTokenIsLocked": true,
            "modularScaleTokenPosition": 0,
            "text": "Subtitle 2"
          },
          {
          "id": 9,
          "name": "text-body-1",
          "groupId": 2,
          themeId,
          "letterSpacing": 0.031,
          "lineHeight": 1.2,
          "wordSpacing": 0,
          "fontWeight": "400",
          "textDecoration": "none",
          "fontStyle": "normal",
          "modularScaleTokenValue": 16,
          "modularScaleTokenIsLocked": true,
          "modularScaleTokenPosition": -1,
          "text": "Body 1"
        },
        {
          "id": 10,
          "name": "text-body-2",
          "groupId": 2,
          themeId,
          "letterSpacing": 0.015,
          "lineHeight": 1.2,
          "wordSpacing": 0,
          "fontWeight": "400",
          "textDecoration": "none",
          "fontStyle": "normal",
          "modularScaleTokenValue": 14,
          "modularScaleTokenIsLocked": true,
          "modularScaleTokenPosition": -2,
          "text": "Body 2"
        },
        {
          "id": 11,
          "name": "text-button",
          "groupId": 2,
          themeId,
          "letterSpacing": 0.089,
          "lineHeight": 1.2,
          "wordSpacing": 0,
          "fontWeight": "500",
          "textDecoration": "none",
          "fontStyle": "normal",
          "modularScaleTokenValue": 14,
          "modularScaleTokenIsLocked": true,
          "modularScaleTokenPosition": -3,
          "text": "BUTTON"
        },
        {
          "id": 12,
          "name": "text-caption",
          "groupId": 2,
          themeId,
          "letterSpacing": 0.033,
          "lineHeight": 1.2,
          "wordSpacing": 0,
          "fontWeight": "400",
          "textDecoration": "none",
          "fontStyle": "normal",
          "modularScaleTokenValue": 12,
          "modularScaleTokenIsLocked": true,
          "modularScaleTokenPosition": -4,
          "text": "Caption"
        },
        {
          "id": 13,
          "name": "text-overline",
          "groupId": 2,
          themeId,
          "letterSpacing": 0.15,
          "lineHeight": 1.2,
          "wordSpacing": 0,
          "fontWeight": "400",
          "textDecoration": "none",
          "fontStyle": "normal",
          "modularScaleTokenValue": 10,
          "modularScaleTokenIsLocked": true,
          "modularScaleTokenPosition": -5,
          "text": "OVERLINE"
        }
        ],
      },
      "Color Palette": {
        groups: [
          {id: 1, name: 'Brand Colors', themeId, "view": "grouped"},
          {id: 2, name: 'Grayscale', themeId, "view": "inline"},
          {id: 3, name: 'Alert Colors', themeId, "view": "default"},
        ],
        tokens: [
          {
            "name": "color-primary",
            "groupId": 1,
            themeId,
            "color": "#7141b1",
            "isPrimary": true,
            "tintConfigs": {
              "saturation": 1,
              "mixRatio": 48
            },
            "shadeConfigs": {
              "saturation": 1,
              "mixRatio": 64
            },
            "id": 1,
          },
          {
            "name": "primary-500",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#8759c0",
            "primaryColorId": 1,
            "id": 2,
            "autoUpdate": true
          },
          {
            "name": "primary-400",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#9f78cc",
            "primaryColorId": 1,
            "id": 3,
            "autoUpdate": true
          },
          {
            "name": "primary-300",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#b697d8",
            "primaryColorId": 1,
            "id": 4,
            "autoUpdate": true
          },
          {
            "name": "primary-200",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#ccb7e4",
            "primaryColorId": 1,
            "id": 5,
            "autoUpdate": true
          },
          {
            "name": "primary-100",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#e2d7f0",
            "primaryColorId": 1,
            "id": 6,
            "autoUpdate": true
          },
          {
            "name": "primary-600",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#5b3094",
            "primaryColorId": 1,
            "id": 7,
            "autoUpdate": true
          },
          {
            "name": "primary-700",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#482775",
            "primaryColorId": 1,
            "id": 8,
            "autoUpdate": true
          },
          {
            "name": "primary-800",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#361e59",
            "primaryColorId": 1,
            "id": 9,
            "autoUpdate": true
          },
          {
            "name": "primary-900",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#25163d",
            "primaryColorId": 1,
            "id": 10,
            "autoUpdate": true
          },
          {
            "name": "primary-1000",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#160b24",
            "primaryColorId": 1,
            "id": 11,
            "autoUpdate": true
          },
          {
            "name": "secondary",
            "groupId": 1,
            themeId,
            "color": "#03dac6",
            "isPrimary": true,
            "tintConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "shadeConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "id": 12,
          },
          {
            "name": "secondary-500",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#54e0cf",
            "primaryColorId": 12,
            "id": 13,
            "autoUpdate": true
          },
          {
            "name": "secondary-400",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#7ae7d8",
            "primaryColorId": 12,
            "id": 14,
            "autoUpdate": true
          },
          {
            "name": "secondary-300",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#98ede1",
            "primaryColorId": 12,
            "id": 15,
            "autoUpdate": true
          },
          {
            "name": "secondary-200",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#b3f2eb",
            "primaryColorId": 12,
            "id": 16,
            "autoUpdate": true
          },
          {
            "name": "secondary-100",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "color": "#cdf8f4",
            "primaryColorId": 12,
            "id": 17,
            "autoUpdate": true
          },
          {
            "name": "secondary-600",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#03b4a3",
            "primaryColorId": 12,
            "id": 18,
            "autoUpdate": true
          },
          {
            "name": "secondary-700",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#038f82",
            "primaryColorId": 12,
            "id": 19,
            "autoUpdate": true
          },
          {
            "name": "secondary-800",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#026c62",
            "primaryColorId": 12,
            "id": 20,
            "autoUpdate": true
          },
          {
            "name": "secondary-900",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#024b44",
            "primaryColorId": 12,
            "id": 21,
            "autoUpdate": true
          },
          {
            "name": "secondary-1000",
            "groupId": 1,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "color": "#012c28",
            "primaryColorId": 12,
            "id": 22,
            "autoUpdate": true
          },
          {
            "name": "gray-500",
            "groupId": 2,
            themeId,
            "color": "#303440",
            "isPrimary": true,
            "tintConfigs": {
              "saturation": 1,
              "mixRatio": 100
            },
            "shadeConfigs": {
              "saturation": 1,
              "mixRatio": 59
            },
            "id": 23,
          },
          {
            "name": "gray-400",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "autoUpdate": true,
            "color": "#555862",
            "primaryColorId": 23,
            "id": 24
          },
          {
            "name": "gray-300",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "autoUpdate": true,
            "color": "#7c7f87",
            "primaryColorId": 23,
            "id": 25
          },
          {
            "name": "gray-200",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "autoUpdate": true,
            "color": "#a6a7ad",
            "primaryColorId": 23,
            "id": 26
          },
          {
            "name": "gray-100",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "autoUpdate": true,
            "color": "#d2d2d5",
            "primaryColorId": 23,
            "id": 27
          },
          {
            "name": "white",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "tint",
            "autoUpdate": true,
            "color": "#ffffff",
            "primaryColorId": 23,
            "id": 28
          },
          {
            "name": "gray-600",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "autoUpdate": true,
            "color": "#292c36",
            "primaryColorId": 23,
            "id": 29
          },
          {
            "name": "gray-700",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "autoUpdate": true,
            "color": "#22242c",
            "primaryColorId": 23,
            "id": 30
          },
          {
            "name": "gray-800",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "autoUpdate": true,
            "color": "#1b1c23",
            "primaryColorId": 23,
            "id": 31
          },
          {
            "name": "gray-900",
            "groupId": 2,
            themeId,
            "isPrimary": false,
            "type": "shade",
            "autoUpdate": true,
            "color": "#14151a",
            "primaryColorId": 23,
            "id": 32
          },
          {
            "name": "color-error",
            "groupId": 3,
            themeId,
            "color": "#fe5e7e",
            "isPrimary": true,
            "tintConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "shadeConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "id": 33,
          },
          {
            "name": "color-success",
            "groupId": 3,
            themeId,
            "color": "#79ed9f",
            "isPrimary": true,
            "tintConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "shadeConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "id": 34,
          },
          {
            "name": "color-info",
            "groupId": 3,
            themeId,
            "color": "#6991ec",
            "isPrimary": true,
            "tintConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "shadeConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "id": 35,
          },
          {
            "name": "color-warning",
            "groupId": 3,
            themeId,
            "color": "#eccc6a",
            "isPrimary": true,
            "tintConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "shadeConfigs": {
              "mixRatio": 80,
              "saturation": 1
            },
            "id": 36,
          }
        ],
      },
      "Custom Tokens": {
        groups: [
          {name: 'Breakpoints', themeId, id: 1},
          {name: 'Media Query', themeId, id: 2},
          {name: 'Z-Index', themeId, id: 3},
          {name: 'Opacity', themeId, id: 4},
        ],
        tokens: [
          {
            "name": "breakpoints-sm",
            "groupId": 1,
            themeId,
            "value": "320px",
            "id": 1
          },
          {
            "name": "breakpoints-md",
            "groupId": 1,
            themeId,
            "value": "600px",
            "id": 2
          },
          {
            "name": "breakpoints-lg",
            "groupId": 1,
            themeId,
            "value": "1136px",
            "id": 3
          },

          {
            "name": "media-query-sm",
            "groupId": 2,
            themeId,
            "value": "@media screen and (min-width: 320px)",
            "id": 4
          },
          {
            "name": "media-query-md",
            "groupId": 2,
            themeId,
            "value": "@media screen and (min-width: 600px)",
            "id": 5
          },
          {
            "name": "media-query-lg",
            "groupId": 2,
            themeId,
            "value": "@media screen and (min-width: 1136px)",
            "id": 6
          },
          {
            "name": "zindex-1",
            "groupId": 3,
            themeId,
            "value": "1",
            "id": 7
          },
          {
            "name": "zindex-2",
            "groupId": 3,
            themeId,
            "value": "10",
            "id": 8
          },
          {
            "name": "zindex-3",
            "groupId": 3,
            themeId,
            "value": "100",
            "id": 9
          },
          {
            "name": "zindex-4",
            "groupId": 3,
            themeId,
            "value": "1000",
            "id": 10
          },
          {
            "name": "zindex-5",
            "groupId": 3,
            themeId,
            "value": "10000",
            "id": 11
          },
          {
            "name": "opacity-25",
            "groupId": 4,
            themeId,
            "value": "0.25",
            "id": 12
          },
          {
            "name": "opacity-50",
            "groupId": 4,
            themeId,
            "value": "0.5",
            "id": 13
          },
          {
            "name": "opacity-75",
            "groupId": 4,
            themeId,
            "value": "0.75",
            "id": 14
          },
          {
            "name": "opacity-100",
            "groupId": 4,
            themeId,
            "value": "1",
            "id": 15
          }
        ]
      },
    }
)