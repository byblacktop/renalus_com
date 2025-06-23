import { clamp, invalidObjectKeys, slugify } from '@/lib/helpers'
import { cn } from '@/lib/utils'

//// Colors
//
export const colorDefault = 'bg'

export const themeColors = {
	default: {
		bg: 'bg-zinc-100',
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
		bg: 'bg-zinc-100',
		text: 'text-indigo',
		accent: 'text-blue',
	},
	dark: {
		bg: 'bg-indigo',
		text: 'text-zinc-100',
	},
	blue: {
		bg: 'bg-blue',
		text: 'text-zinc-100',
		accent: 'text-blue-100',
	},
	green: {
		bg: 'bg-green-200',
		text: 'text-indigo',
		accent: 'text-green-800',
	},
	red: {
		bg: 'bg-red',
		text: 'text-zinc-100',
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
	highlight: 'red',
	notice: 'blue',
	slate: 'slate',
	zinc: 'zinc',
	light: 'indigo',
	dark: 'indigo',
	white: 'white',
	none: 'zinc',
}

export const colorMap = Object.entries(variantColors).reduce(
	(acc, [key, value]) => ({ ...acc, [value]: key }),
	{},
)

// TODO: FIx bad logic here
const contrastMap = {
	indigo: 'blue',
	zinc: 'indigo',
	blue: 'zinc',
	green: 'indigo',
	red: 'slate',
	slate: 'indigo',
	none: 'indigo',
	white: 'indigo',
}

const defaultShades = {
	slate: 700,
	zinc: 500,
	indigo: 700,
	blue: 700,
	green: 200,
	red: 500,
	light: 100,
	dark: 700,
	none: '',
	white: '',
}

const accentShades = {
	slate: 100,
	zinc: 100,
	zinc: 700,
	indigo: 100,
	blue: 100,
	green: 800,
	red: 100,
	light: 100,
	dark: 100,
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
// ])
