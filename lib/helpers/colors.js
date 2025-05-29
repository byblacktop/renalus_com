import { clamp, invalidObjectKeys, slugify } from '@/lib/helpers'
import { cn } from '@/lib/utils'

//// Colors
//
export const colorDefault = 'bg'

export const themeColors = {
	default: {
		bg: 'bg-stone-50',
		fg: 'text-slate',
		text: 'text-slate',
	},
	none: {
		bg: 'bg-bg',
		text: 'text-fg',
	},
	white: {
		bg: 'bg-white',
		text: 'text-indigo',
		accent: 'text-blue',
	},
	light: {
		bg: 'bg-stone-50',
		text: 'text-indigo',
		accent: 'text-blue',
	},
	dark: {
		bg: 'bg-indigo',
		text: 'text-stone-50',
	},
	indigo: {
		bg: 'bg-indigo',
		text: 'text-stone-50',
		accent: 'text-blue-100',
	},
	blue: {
		bg: 'bg-blue',
		text: 'text-stone-50',
		accent: 'text-blue-100',
	},
	green: {
		bg: 'bg-green-300',
		text: 'text-green-50',
		accent: 'text-indigo-500',
	},
	yellow: {
		bg: 'bg-blue-50',
		text: 'text-indigo',
		accent: 'text-indigo-500',
	},
	red: {
		bg: 'bg-red',
		text: 'text-stone-50',
		accent: 'text-green-100',
	},
	accent: {
		bg: 'text-blue-300',
		text: 'text-indigo-600',
	},
}

export const variantColors = {
	primary: 'blue',
	secondary: 'indigo',
	info: 'blue',
	accent: 'green',
	highlight: 'yellow',
	notice: 'red',
	steel: 'steel',
	stone: 'stone',
	white: 'white',
	none: 'stone',
}

export const colorVariants = {
	blue: 'primary',
	indigo: 'secondary',
	green: 'accent',
	yellow: 'highlight',
	red: 'notice',
	steel: 'steel',
	stone: 'stone',
	white: 'white',
	none: 'indigo',
}

export const colorMap = Object.entries(variantColors).reduce(
	(acc, [key, value]) => ({ ...acc, [value]: key }),
	{},
)

export const variantMap = Object.entries(colorVariants).reduce(
	(acc, [key, value]) => ({ ...acc, [value]: key }),
	{},
)

// TODO: FIx bad logic here
const contrastMap = {
	indigo: 'yellow',
	blue: 'green',
	yellow: 'indigo',
	green: 'indigo',
	red: 'green',
	gray: 'blue',
	steel: 'blue',
	stone: 'blue',
	none: 'indigo',
	white: 'indigo',
}

const defaultShades = {
	indigo: 800,
	blue: 500,
	yellow: 500,
	green: 500,
	red: 500,
	steel: 600,
	stone: 200,
	gray: 700,
	none: '',
	white: '',
}

const accentShades = {
	indigo: 50,
	blue: 50,
	green: 50,
	yellow: 100,
	red: 100,
	steel: 500,
	stone: 500,
	gray: 500,
	none: '',
	white: '',
}

const getColorProps = (color, props) => [
	String(color)?.toLowerCase() === 'none'
		? colorDefault
		: !!color
			? String(color).toLowerCase()
			: colorDefault,
	...props,
]

const resolveColor =
	fn =>
	(color, ...props) =>
		fn(...getColorProps(color, props))

const getColorBase = color =>
	slugify(color).replace(/^(bg|text|border|stroke|fill)-/, '')

const getColorPalette = resolveColor((color, variant) => {
	const [base, shade = variant || defaultShades[color]] =
		getColorBase(color).split('-')

	const accent = accentShades[base]

	return { base, shade, accent }
})

export const normalizeColor = resolveColor(color => {
	const { base, shade } = getColorPalette(color)

	return [base, shade].join('-')
})

export const colorClass = resolveColor((color, shade, prefix) =>
	[prefix, getColorPalette(color).base, shade]
		.filter(Boolean)
		.join('-'),
)

export const colorUtil = resolveColor(
	color => colorMap[getColorPalette(color).base],
)

export const getTheme = resolveColor((color, variant) => {
	if (!color) return { scheme: 'light', isDark: false }

	const { base, shade, accent } = getColorPalette(color, variant)

	if (!shade)
		return { scheme: 'light', isDark: false, bg: bgColor(color) }

	const scheme = Number(shade) >= 500 ? 'dark' : 'light'
	const isDark = scheme === 'dark'

	const theme = {
		...(themeColors[base] ||
			themeColors[color] ||
			themeColors[scheme]),
	}

	if (invalidObjectKeys(themeColors, base)) theme.bg = bgColor(color)

	const className = cn(`__${scheme}`, theme.bg, `*:${theme.text}`)
	console.log(color, base, shade, accent)

	return { ...theme, scheme, isDark, className }
})

//// Colors -- Text
export const textColor = resolveColor((color, shade) =>
	colorClass(
		color,
		shade || (getTheme(color).isDark ? 100 : 500),
		'text',
	),
)

//// Colors -- Background and Sections
export const bgColor = resolveColor((color, shade) =>
	colorClass(color, shade || getColorPalette(color)?.shade, 'bg'),
)

//// Colors -- Contrast
export const colorShift = resolveColor((color, shift = 1, prefix) => {
	const { base, shade } = getColorPalette(color)

	const shifted = clamp(100, Number(shade) + 100 * shift, 1000)

	return colorClass(base, shifted, prefix)
})

export const contrastColor = resolveColor(
	(color, shade, prefix = 'text') => {
		const contrast = contrastMap[getColorPalette(color)?.base]

		return colorClass(
			contrast,
			shade || getColorPalette(contrast)?.shade,
			prefix,
		)
	},
)

export const contrastUtil = color => colorUtil(contrastColor(color))

//// Color Generator (Playground)
//
// const _SHADES = generateRange(1, 10)
// 	.map(n => n * 100)
// 	.reverse()

// const _GENERATE_COLOR = curr =>
// 	_SHADES.reduce(
// 		(s, c, i) => ({
// 			...s,
// 			[c]: `hsl(${curr.hue}, ${curr.sat}%, ${curr.lightness + i * 10}%)`,
// 		}),
// 		{},
// 	)

// const _GENERATE_COLORS = colors =>
// 	colors.reduce((acc, curr) => {
// 		return {
// 			...acc,
// 			[curr.name]: {
// 				50: `hsl(${curr.hue}, ${curr.sat}%, ${Math.round(90 + curr.lightness + (100 - (90 + curr.lightness)) / 2)}%)`,
// 				..._GENERATE_COLOR(curr),
// 				950: `hsl(${curr.hue}, ${curr.sat}%, ${Math.round(curr.lightness / 2)}%)`,
// 			},
// 		}
// 	}, {})

// export const _COLORS = _GENERATE_COLORS([
// 	{ name: 'indigo', hue: 216, sat: 52, lightness: 4 },
// 	{ name: 'blue', hue: 236, sat: 68, lightness: 8 },
// 	{ name: 'red', hue: 12, sat: 76, lightness: 20 },
// 	{ name: 'green', hue: 180, sat: 39, lightness: 16 },
// 	{ name: 'yellow', hue: 44, sat: 52, lightness: 24 },
// ])
