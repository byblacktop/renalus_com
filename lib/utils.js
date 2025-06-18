import { asImageSrc, asLink, asText } from '@prismicio/client'
import classNames from 'classnames'
import { cva } from 'cva'
import { twMerge } from 'tailwind-merge'

import {
	getTheme,
	validContent,
	validLink,
	validObjectKeys,
} from '@/lib/helpers'
import { tw } from '@/lib/tw'

//// Classes, Keys, and Props
//
export const cn = (...inputs) =>
	inputs?.filter(Boolean).length < 1
		? undefined
		: twMerge(classNames(inputs))

export const cp = (prop, el, pass) => {
	if (validObjectKeys(prop, el)) return prop[el]

	if (typeof prop === 'string' && (el === true || pass === true))
		return prop

	return undefined
}

export const kn = prop => {
	if (!prop) return '_'

	if (typeof prop === 'string') return prop.substring(0, 40)

	// TODO: Check on validContent, getExcerpt, or similar... if helpful
	// RichText
	const uid = ['key', 'id', 'uid'].find(key => key in prop)
	if (uid) return cleanKey(prop[uid], asText)

	// RichText
	const text = [
		'text',
		'title',
		'subtitle',
		'body',
		'label',
		'value',
		'name',
		'trigger',
		'caption',
		'placeholder',
		'url',
		'href',
	].find(key => key in prop && validContent(prop[key]))
	if (text) return cleanKey(prop[text], asText)

	// Link
	const link = ['link'].find(
		key => key in prop && validLink(prop[key]),
	)

	if (link) return cleanKey(prop[link], asLink)

	// Image
	const img = ['img', 'bg'].find(key => key in prop && prop[key])
	if (img) return cleanKey(prop[img], asImageSrc)

	// Fallback
	return '_'
}

// export const asText = text =>
// 	typeof text === 'string' ? text : text?.text || ''

// export const asLink = link =>
// 	typeof link === 'string' ? link : link.link || link.url || '#'

// export const asImageSrc = src =>
// 	typeof src === 'string' ? src : src?.url || ''

export const cleanKey = (key, fn) =>
	['string', 'number'].includes(typeof key)
		? String(key).substring(0, 40)
		: (fn(key) || '_').substring(0, 40)

export const getSliceData = (type, variation, color) => ({
	dataset: {
		'data-slice': type,
		'data-variation': variation,
		'data-theme': color ? getTheme(color).scheme : 'light',
	},
})

const getResolvedProp = (
	key,
	value,
	resolver,
	replaceNone = false,
) => {
	if (!!value) {
		if (replaceNone && String(value)?.toLowerCase() === 'none')
			return resolver[key]

		return value
	}

	return key in resolver ? resolver[key] : undefined
}

export const resolveProps = (props, resolver, replaceNone = false) =>
	Object.entries(props || {}).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]:
				getResolvedProp(key, value, resolver, replaceNone) ??
				(key in resolver ? resolver[key] : undefined),
		}),
		resolver,
	)

export const generateRange = (from, to) =>
	Array.from({ length: to - from + 1 }, (_, index) => index + from)

//// Button Variants
//
const propVariants = (prefix, keys) =>
	keys.reduce(
		(acc, curr) => ({ ...acc, [curr]: `${prefix}-${curr}` }),
		{},
	)

export const generateVariants = prefix => ({
	color: propVariants(prefix, [
		'primary',
		'secondary',
		'info',
		'accent',
		'highlight',
		'notice',
		'white',
		'gray',
		'light',
		'stone',
		'dark',
		'slate',
		'zinc',
		'indigo',
		'soft',
		'util',
		'ghost',
		'success',
		'warning',
		'danger',
	]),

	variant: propVariants(prefix, [
		'solid',
		'outline',
		'stroke',
		'flat',
		'nav',
		'soft',
		'link',
	]),

	size: propVariants(prefix, ['2xs', 'xs', 'sm', 'lg', 'icon']),

	cta: {
		true: 'btn-cta',
	},
})

export const getVariants = (prefix, keys) => {
	const variants = generateVariants(prefix)

	return cva(prefix, {
		variants,

		compoundVariants: [],

		defaultVariants: {},

		...keys,
	})
}

//// Variant Utilities
//
export const spaceYVariants = cva('', {
	variants: {
		space: tw.spaceY,
	},

	defaultVariants: {
		gap: 'md',
	},
})

export const spaceYProps = space => spaceYVariants({ space })

//// Gap Utilities
//
export const gapVariants = cva('', {
	variants: {
		gap: tw.gap,
	},

	defaultVariants: {
		gap: 'md',
	},
})

export const gapProps = gap => gapVariants({ gap })

//// HeadlessUI Transitions/Animations
//
export const transitions = {
	fade: {
		// Enter
		enter: 'duration-500',
		enterFrom: 'opacity-0',
		enterTo: 'opacity-100',
		// Leave
		leave: 'duration-300',
		leaveFrom: 'opacity-100',
		leaveTo: 'opacity-0',
	},

	fadeGrow: cn(
		'transition duration-300 origin-top',
		'data-closed:scale-95 data-closed:opacity-0',

		// Enter
		// enter: 'transition duration-500 origin-top ease-in-out',
		// enterFrom: 'opacity-0 scale-90',
		// enterTo: 'opacity-100 scale-100',
		// Leave
		// leave: 'transition duration-300 origin-top ease-in-out',
		// leaveFrom: 'opacity-100 scale-100',
		// leaveTo: 'opacity-0 scale-90',
	),

	fadeShrink: {
		// Enter
		enter: 'duration-500 ease-out',
		enterFrom: 'opacity-0 scale-120',
		enterTo: 'opacity-100 scale-100',
		// Leave
		leave: 'duration-200 ease-in',
		leaveFrom: 'opacity-100 scale-100',
		leaveTo: 'opacity-0 scale-120',
	},

	fadeScale: {
		// Enter
		enter: 'duration-500 ease-in-out-dramatic',
		enterFrom: 'opacity-0 scale-0',
		enterTo: 'opacity-100 scale-100',
		// Leave
		leave: 'delay-[400ms] duration-500 ease-in-dramatic',
		leaveFrom: 'opacity-100 scale-100',
		leaveTo: 'opacity-0 scale-0',
	},

	slideDownFull: {
		// Enter
		enter: 'duration-500',
		enterFrom: '-translate-y-0',
		enterTo: 'translate-y-0',
		// Leave
		leave: 'duration-300',
		leaveFrom: 'translate-y-0',
		leaveTo: '-translate-y-0',
	},

	slideDown: {
		// Enter
		enter: 'duration-950 delay-300',
		enterFrom: '-translate-y-32 opacity-0',
		enterTo: 'translate-y-0 opacity-100',
		// Leave
		leave: 'duration-500',
		leaveFrom: 'translate-y-0 opacity-100',
		leaveTo: '-translate-y-32 opacity-0',
	},

	slideLeft: {
		// Enter
		enter: 'duration-500 sm:duration-700',
		enterFrom: 'translate-x-full',
		enterTo: 'translate-x-0',
		// Leave
		leave: 'duration-500 sm:duration-700',
		leaveFrom: 'translate-x-0',
		leaveTo: 'translate-x-full',
	},

	revealY: {
		// Enter
		enter: 'duration-500',
		enterFrom: 'h-0',
		enterTo: 'h-[var(--h-header)]',
		// Leave
		leave: 'duration-300',
		leaveFrom: 'h-[var(--h-header)]',
		leaveTo: 'h-0',
	},

	fadeRight: {
		// Enter
		enter: 'delay-300 duration-700 ease-in-out',
		enterFrom: 'opacity-0 -translate-x-16',
		enterTo: 'opacity-100 translate-x-0',
		// Leave
		leave: 'duration-100 ease-out-smooth',
		leaveFrom: 'opacity-100 translate-x-0 translate-y-0',
		leaveTo: 'opacity-0 -translate-x-16 -translate-y-full',
	},
}
