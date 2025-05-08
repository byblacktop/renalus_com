// TODO: WTF doesn't this work
// import { generateRange } from '@/lib/utils'

const getCols = (from, to) =>
	Array.from(
		{ length: to - from + 1 },
		(_, index) => index + from,
	).reduce(
		(acc, cols) => ({ ...acc, [cols]: `grid-cols-${cols}` }),
		{},
	)

//// Layouts and Displays
export const layout = {
	flex: 'flex',
	stack: 'flex flex-col',
	reverse: 'flex flex-col-reverse',
	row: 'flex-row',
	flip: 'flex-row-reverse',
	grid: 'grid grid-cols-1 grid-flow-row-dense',
	block: '',
}

export const align = {
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
	between: 'content-between',
}

export const justify = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
}

export const items = {
	start: 'place-items-start',
	center: 'place-items-center',
	end: 'place-items-end',
	between: 'place-items-between',
}

export const content = {
	start: 'place-content-start',
	center: 'place-content-center',
	end: 'place-content-end',
	between: 'place-content-between',
}

export const width = {
	full: 'max-w-none',
	stretch: 'max-w-none p-edge',
	'8xs': 'max-w-md', // 448px
	'7xs': 'max-w-lg', // 512px
	'6xs': 'max-w-xl', // 576px
	'5xs': 'max-w-screen-sm', // 640px
	'4xs': 'max-w-2xl', // 672px
	'3xs': 'max-w-screen-md', // 768px
	'2xs': 'max-w-4xl', // 896px
	xs: 'max-w-screen-lg', // 1024px
	sm: 'max-w-screen-xl', // 1280px
	md: 'max-w-screen-2xl', // 1536px
	base: 'max-w-screen-3xl', // 1600px
	lg: 'max-w-screen-4xl', // 1800px
	xl: 'max-w-screen-5xl', // 2000px
}

export const maxW = {
	none: 'max-w-none',
	'6xs': 'max-w-md', // 448px
	'5xs': 'max-w-lg', // 512px
	'4xs': 'max-w-xl', // 576px
	'3xs': 'max-w-screen-sm', // 640px;
	'2xs': 'max-w-2xl', // 672px
	xs: 'max-w-3xl', // 768px
	sm: 'max-w-4xl', // 896px
	lg: 'max-w-5xl', // 1024px
	xl: 'max-w-6xl', // 1152px
	'2xl': 'max-w-7xl', // 1280px
	'3xl': 'max-w-screen-2xl', // 1536px
	'4xl': 'max-w-screen-3xl', // 1600px
	'5xl': 'max-w-screen-4xl', // 1800px
	'6xl': 'max-w-screen-5xl', // 2000px
}

//// Grid
//
export const cols = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-2',
	3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
	4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
	5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
	6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
	...getCols(7, 24),
}

export const gap = {
	0: 'gap-0 md:gap-0 xl:gap-0',
	none: 'gap-0 md:gap-0 xl:gap-0',
	'3xs': 'gap-0.5 md:gap-1',
	'2xs': 'gap-1 md:gap-1.5 xl:gap-2',
	xs: 'gap-1.5 md:gap-2 xl:gap-2.5',
	sm: 'gap-2 md:gap-3 xl:gap-4',
	md: 'gap-2 md:gap-4 xl:gap-6',
	base: 'gap-4 md:gap-6 xl:gap-8',
	prose: 'gap-6 md:gap-8 xl:gap-10',
	lg: 'gap-8 md:gap-12 xl:gap-16',
	xl: 'gap-10 md:gap-12 lg:gap-16 xl:gap-24',
	'2xl': 'gap-12 md:gap-16 lg:gap-24 2xl:gap-32',
	'3xl': 'gap-16 md:gap-24 lg:gap-36 2xl:gap-48',
}

//// Space
//
export const spaceX = {
	'5xs': 'space-x-1',
	'4xs': 'space-x-1 md:space-x-2',
	'3xs': 'space-x-1 md:space-x-2 xl:space-x-3',
	'2xs': 'space-x-2 md:space-x-3 xl:space-x-4',
	xs: 'space-x-4 md:space-x-6 xl:space-x-8',
	sm: 'space-x-6 md:space-x-8 xl:space-x-10',
	md: 'space-x-6 md:space-x-10 xl:space-x-12',
	lg: 'space-x-8 md:space-x-12 xl:space-x-16',
	xl: 'space-x-10 md:space-x-16 xl:space-x-20',
}

export const spaceY = {
	'3xs': 'space-y-0.5 md:space-y-1 xl:space-y-2',
	'2xs': 'space-y-1 md:space-y-2 xl:space-y-3',
	xs: 'space-y-2 md:space-y-3 xl:space-y-4',
	sm: 'space-y-3 md:space-y-4 xl:space-y-5',
	md: 'space-y-4 md:space-y-5 xl:space-y-6',
	lg: 'space-y-5 md:space-y-6 xl:space-y-8',
	xl: 'space-y-6 md:space-y-8 xl:space-y-12',
	'2xl': 'space-y-8 md:space-y-12 xl:space-y-16',
	'3xl': 'space-y-12 md:space-y-16 xl:space-y-20',
}

//// Rounded — Border Radius
export const rounded = {
	md: 'rounded-sm md:rounded-md',
	lg: 'rounded-md md:rounded-lg',
	xl: 'rounded-md sm:rounded-lg md:rounded-xl',
	'2xl': 'rounded-lg sm:rounded-xl md:rounded-2xl',
	'3xl': 'rounded-xl sm:rounded-2xl md:rounded-3xl',
	'4xl': 'rounded-2xl sm:rounded-3xl md:rounded-4xl',
}

//// ClassNames
//
export const tw = {
	layout,
	align,
	justify,
	items,
	content,
	width,
	maxW,
	cols,
	gap,
	spaceX,
	spaceY,
}
