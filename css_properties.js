var css_properties = {
	browser_support: ['chrome', 'edge', 'firfox', 'safari', 'opera'],
	text_properties: {
		details: [{ property: 'color', description: 'Sets the color of text' }, { property: 'direction', description: 'Specifies the text direction/writing direction' }, { property: 'letter-spacing', description: 'Increases or decreases the space between characters in a text' }, { property: 'line-height', description: 'Sets the line height' }, { property: 'text-align', description: 'Specifies the horizontal alignment of text' }, { property: 'text-decoration', description: 'Specifies the decoration added to text' }, { property: 'text-indent', description: 'Specifies the indentation of the first line in a text-block' }, { property: 'text-shadow', description: 'Specifies the shadow effect added to text' }, { property: 'text-transform', description: 'Controls the capitalization of text' }, { property: 'text-overflow', description: 'Specifies how overflowed content that is not displayed should be signaled to the user' }, { property: 'unicode-bidi', description: 'Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document' }, { property: 'vertical-align', description: 'Sets the vertical alignment of an element' }, { property: 'white-space', description: 'Specifies how white-space inside an element is handled' }, { property: 'word-spacing', description: 'Increases or decreases the space between words in a text' }],
		'direction': {
			details: [{ value: 'ltr', description: 'Text direction goes from left-to-right. This is default' }, { value: 'rtl', description: 'Text direction goes from right-to-left' }, { value: 'initial', description: 'Sets this property to its default value. Read about initial' }, { value: 'inherit', description: 'Inherits this property from its parent element. Read about inherit' }],
			measure_units: false,
			browser_version: [2.0, 5.5, 1.0, 1.3, 9.2]
		},
		'letter-spacing': {
			details: [{ value: 'normal', description: 'No extra space between characters. This is default' }, { value: 'length', description: 'Defines an extra space between characters (negative values are allowed). Read about length units' }, { value: 'initial', description: 'Sets this property to its default value. Read about initial' }, { value: 'inherit', description: 'Inherits this property from its parent element. Read about inherit' }],
			measure_units: true,
			browser_version: [1.0, 4.0, 1.0, 1.0, 3.5]
		},
		'line-height': {
			details: [{ value: 'normal', description: 'A normal line height. This is default' }, { value: 'number', description: 'A number that will be multiplied with the current font-size to set the line height' }, { value: 'length', description: 'A fixed line height in px, pt, cm, etc.' }, { value: 'initial', description: 'Sets this property to its default value.' }, { value: 'inherit', description: 'Inherits this property from its parent element' }],
			measure_units: true,
			browser_version: [1.0, 4.0, 1.0, 1.0, 7.0]
		},
		'text-align': {
			details: [{ value: 'left', description: 'Aligns the text to the left' }, { value: 'right', description: 'Aligns the text to the right' }, { value: 'center', description: 'Centers the text' }, { value: 'justify', description: 'Stretches the lines so that each line has equal width (like in newspapers and magazines)' }, { value: 'initial', description: 'Sets this property to its default value.' }, { value: 'inherit', description: 'Inherits this property from its parent element.' }],
			measure_units: false,
			browser_version: [1.0, 3.0, 1.0, 1.0, 3.5]
		}
	},
	color: {
		default_colors: [{ name: 'AliceBlue', hex: '#F0F8FF' }, { name: 'AntiqueWhite', hex: '#FAEBD7' }, { name: 'Aqua', hex: '#00FFFF' }, { name: 'Aquamarine', hex: '#7FFFD4' }, { name: 'Azure', hex: '#F0FFFF' }, { name: 'Beige', hex: '#F5F5DC' }, { name: 'Bisque', hex: '#FFE4C4' }, { name: 'Black', hex: '#000000' }, { name: 'BlanchedAlmond', hex: '#FFEBCD' }, { name: 'Blue', hex: '#0000FF' }, { name: 'BlueViolet', hex: '#8A2BE2' }, { name: 'Brown', hex: '#A52A2A' }, { name: 'BurlyWood', hex: '#DEB887' }, { name: 'CadetBlue', hex: '#5F9EA0' }, { name: 'Chartreuse', hex: '#7FFF00' }, { name: 'Chocolate', hex: '#D2691E' }, { name: 'Coral', hex: '#FF7F50' }, { name: 'CornflowerBlue', hex: '#6495ED' }, { name: 'Cornsilk', hex: '#FFF8DC' }, { name: 'Crimson', hex: '#DC143C' }, { name: 'Cyan', hex: '#00FFFF' }, { name: 'DarkBlue', hex: '#00008B' }, { name: 'DarkCyan', hex: '#008B8B' }, { name: 'DarkGoldenRod', hex: '#B8860B' }, { name: 'DarkGray', hex: '#A9A9A9' }, { name: 'DarkGrey', hex: '#A9A9A9' }, { name: 'DarkGreen', hex: '#006400' }, { name: 'DarkKhaki', hex: '#BDB76B' }, { name: 'DarkMagenta', hex: '#8B008B' }, { name: 'DarkOliveGreen', hex: '#556B2F' }, { name: 'DarkOrange', hex: '#FF8C00' }, { name: 'DarkOrchid', hex: '#9932CC' }, { name: 'DarkRed', hex: '#8B0000' }, { name: 'DarkSalmon', hex: '#E9967A' }, { name: 'DarkSeaGreen', hex: '#8FBC8F' }, { name: 'DarkSlateBlue', hex: '#483D8B' }, { name: 'DarkSlateGray', hex: '#2F4F4F' }, { name: 'DarkSlateGrey', hex: '#2F4F4F' }, { name: 'DarkTurquoise', hex: '#00CED1' }, { name: 'DarkViolet', hex: '#9400D3' }, { name: 'DeepPink', hex: '#FF1493' }, { name: 'DeepSkyBlue', hex: '#00BFFF' }, { name: 'DimGray', hex: '#696969' }, { name: 'DimGrey', hex: '#696969' }, { name: 'DodgerBlue', hex: '#1E90FF' }, { name: 'FireBrick', hex: '#B22222' }, { name: 'FloralWhite', hex: '#FFFAF0' }, { name: 'ForestGreen', hex: '#228B22' }, { name: 'Fuchsia', hex: '#FF00FF' }, { name: 'Gainsboro', hex: '#DCDCDC' }, { name: 'GhostWhite', hex: '#F8F8FF' }, { name: 'Gold', hex: '#FFD700' }, { name: 'GoldenRod', hex: '#DAA520' }, { name: 'Gray', hex: '#808080' }, { name: 'Grey', hex: '#808080' }, { name: 'Green', hex: '#008000' }, { name: 'GreenYellow', hex: '#ADFF2F' }, { name: 'HoneyDew', hex: '#F0FFF0' }, { name: 'HotPink', hex: '#FF69B4' }, { name: 'IndianRed ', hex: '#CD5C5C' }, { name: 'Indigo ', hex: '#4B0082' }, { name: 'Ivory', hex: '#FFFFF0' }, { name: 'Khaki', hex: '#F0E68C' }, { name: 'Lavender', hex: '#E6E6FA' }, { name: 'LavenderBlush', hex: '#FFF0F5' }, { name: 'LawnGreen', hex: '#7CFC00' }, { name: 'LemonChiffon', hex: '#FFFACD' }, { name: 'LightBlue', hex: '#ADD8E6' }, { name: 'LightCoral', hex: '#F08080' }, { name: 'LightCyan', hex: '#E0FFFF' }, { name: 'LightGoldenRodYellow', hex: '#FAFAD2' }, { name: 'LightGray', hex: '#D3D3D3' }, { name: 'LightGrey', hex: '#D3D3D3' }, { name: 'LightGreen', hex: '#90EE90' }, { name: 'LightPink', hex: '#FFB6C1' }, { name: 'LightSalmon', hex: '#FFA07A' }, { name: 'LightSeaGreen', hex: '#20B2AA' }, { name: 'LightSkyBlue', hex: '#87CEFA' }, { name: 'LightSlateGray', hex: '#778899' }, { name: 'LightSlateGrey', hex: '#778899' }, { name: 'LightSteelBlue', hex: '#B0C4DE' }, { name: 'LightYellow', hex: '#FFFFE0' }, { name: 'Lime', hex: '#00FF00' }, { name: 'LimeGreen', hex: '#32CD32' }, { name: 'Linen', hex: '#FAF0E6' }, { name: 'Magenta', hex: '#FF00FF' }, { name: 'Maroon', hex: '#800000' }, { name: 'MediumAquaMarine', hex: '#66CDAA' }, { name: 'MediumBlue', hex: '#0000CD' }, { name: 'MediumOrchid', hex: '#BA55D3' }, { name: 'MediumPurple', hex: '#9370DB' }, { name: 'MediumSeaGreen', hex: '#3CB371' }, { name: 'MediumSlateBlue', hex: '#7B68EE' }, { name: 'MediumSpringGreen', hex: '#00FA9A' }, { name: 'MediumTurquoise', hex: '#48D1CC' }, { name: 'MediumVioletRed', hex: '#C71585' }, { name: 'MidnightBlue', hex: '#191970' }, { name: 'MintCream', hex: '#F5FFFA' }, { name: 'MistyRose', hex: '#FFE4E1' }, { name: 'Moccasin', hex: '#FFE4B5' }, { name: 'NavajoWhite', hex: '#FFDEAD' }, { name: 'Navy', hex: '#000080' }, { name: 'OldLace', hex: '#FDF5E6' }, { name: 'Olive', hex: '#808000' }, { name: 'OliveDrab', hex: '#6B8E23' }, { name: 'Orange', hex: '#FFA500' }, { name: 'OrangeRed', hex: '#FF4500' }, { name: 'Orchid', hex: '#DA70D6' }, { name: 'PaleGoldenRod', hex: '#EEE8AA' }, { name: 'PaleGreen', hex: '#98FB98' }, { name: 'PaleTurquoise', hex: '#AFEEEE' }, { name: 'PaleVioletRed', hex: '#DB7093' }, { name: 'PapayaWhip', hex: '#FFEFD5' }, { name: 'PeachPuff', hex: '#FFDAB9' }, { name: 'Peru', hex: '#CD853F' }, { name: 'Pink', hex: '#FFC0CB' }, { name: 'Plum', hex: '#DDA0DD' }, { name: 'PowderBlue', hex: '#B0E0E6' }, { name: 'Purple', hex: '#800080' }, { name: 'RebeccaPurple', hex: '#663399' }, { name: 'Red', hex: '#FF0000' }, { name: 'RosyBrown', hex: '#BC8F8F' }, { name: 'RoyalBlue', hex: '#4169E1' }, { name: 'SaddleBrown', hex: '#8B4513' }, { name: 'Salmon', hex: '#FA8072' }, { name: 'SandyBrown', hex: '#F4A460' }, { name: 'SeaGreen', hex: '#2E8B57' }, { name: 'SeaShell', hex: '#FFF5EE' }, { name: 'Sienna', hex: '#A0522D' }, { name: 'Silver', hex: '#C0C0C0' }, { name: 'SkyBlue', hex: '#87CEEB' }, { name: 'SlateBlue', hex: '#6A5ACD' }, { name: 'SlateGray', hex: '#708090' }, { name: 'SlateGrey', hex: '#708090' }, { name: 'Snow', hex: '#FFFAFA' }, { name: 'SpringGreen', hex: '#00FF7F' }, { name: 'SteelBlue', hex: '#4682B4' }, { name: 'Tan', hex: '#D2B48C' }, { name: 'Teal', hex: '#008080' }, { name: 'Thistle', hex: '#D8BFD8' }, { name: 'Tomato', hex: '#FF6347' }, { name: 'Turquoise', hex: '#40E0D0' }, { name: 'Violet', hex: '#EE82EE' }, { name: 'Wheat', hex: '#F5DEB3' }, { name: 'White', hex: '#FFFFFF' }, { name: 'WhiteSmoke', hex: '#F5F5F5' }, { name: 'Yellow', hex: '#FFFF00' }, { name: 'YellowGreen', hex: '#9ACD32' }],
		type: 'color',
		id: 'selected_color'
	},
	measure_units: {
		details: {
			absolute_length: [{ value: 'cm', description: 'centimeters' }, { value: 'mm', description: 'millimeters' }, { value: 'in', description: 'inches (1in = 96px = 2.54cm)' }, { value: 'px', description: 'pixels (1px = 1/96th of 1in)' }, { value: 'pt', description: 'points (1pt = 1/72 of 1in)' }, { value: 'pc', description: 'picas (1pc = 12 pt)' }],
			relative_length: [{ value: 'em', description: 'Relative to the font-size of the element (2em means 2 times the size of the current font)' }, { value: 'ex', description: 'Relative to the x-height of the current font (rarely used)' }, { value: 'ch', description: 'Relative to width of the "0" (zero)' }, { value: 'rem', description: 'Relative to font-size of the root element' }, { value: 'vw', description: 'Relative to 1% of the width of the viewport' }, { value: 'vh', description: 'Relative to 1% of the height of the viewport' }, { value: 'vmin', description: 'Relative to 1% of viewport\'s* smaller dimension' }, { value: 'vmax', description: 'Relative to 1% of viewport\'s* larger dimension' }, { value: '%', description: 'Relative to the parent element' }]
		},
		browser_versions: {
			absolute_length: [[1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5]],
			relative_length: [[1.0, 3.0, 1.0, 1.0, 3.5], [1.0, 3.0, 1.0, 1.0, 3.5], [27.0, 9.0, 1.0, 7.0, 20.0], [4.0, 9.0, 3.6, 4.1, 11.6], [20.0, 9.0, 19.0, 6.0, 20.0], [20.0, 9.0, 19.0, 6.0, 20.0], [20.0, 9.0, 19.0, 6.0, 20.0], [26.0, -1, 19.0, 7.0, 20.0], [1.0, 3.0, 1.0, 1.0, 3.5]]
		}
	}
};

module.exports = css_properties;