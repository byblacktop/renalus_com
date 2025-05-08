import { asImageSrc, asImageWidthSrcSet } from '@prismicio/client'

import { FALLBACK_IMAGE } from '@/lib/constants'
import {
	invalidObjectKeys,
	invalidString,
	validArrObjectData,
	validObjectKeys,
	validObjectKeyValue,
} from '@/lib/helpers'

// TODO: Add extension validations and string literal validations
export const validImgString = img =>
	typeof img === 'string' &&
	['http', '/'].some(prefix => img.startsWith(prefix))

export const invalidImgString = img => !validImgString(img)

export const validImgObject = img =>
	validObjectKeys(img, ['url', 'src'], 'some')

export const invalidImgObject = img => !validImgObject(img)

export const validImg = img =>
	validImgString(img) || validImgObject(img)

export const invalidImg = img => !validImg(img)

export const isPrismicImg = img => {
	const src = validObjectKeys(img, ['url'])
		? img.url
		: typeof img === 'string'
			? img
			: ''

	return src.includes('prismic.io')
}

export const getFeaturedImg = img => {
	if (validImg(img)) return img

	if (validArrObjectData(img)) {
		if (validObjectKeys(img[0], 'img')) return img[0].img

		return FALLBACK_IMAGE
	}

	return FALLBACK_IMAGE
}

// TODO: Work on validSrc function
export const getImg = (img, size, fallback = false) => {
	if (typeof img === 'string') return { src: img }

	// Imported directly >> .src
	// Next will include all necessary props
	if (validObjectKeys(img, 'src')) return { ...img }

	// Prismic uses >> .url
	if (validObjectKeys(img, 'url')) {
		if (size && validObjectKeys(img, size)) {
			return { ...asImageWidthSrcSet(img[size]) }
		}

		return { src: asImageSrc(img) }
	}

	return fallback ? { src: FALLBACK_IMAGE.src } : { escape: true }
}

export const validSrc = (src, size, fill = true) => {
	if (
		invalidString(src) ||
		invalidObjectKeys(src, ['src', 'url'], 'some')
	)
		return {}

	if (typeof src === 'string') return { src }

	// Imported directly >> .src
	// Next will include all necessary props
	if (src?.hasOwnProperty('src')) {
		props = { ...src }
	}

	// Prismic uses >> .url
	if (src?.hasOwnProperty('url')) {
		props.src = src.url
	}

	//// Dimensions
	// Prismic uses >> src.dimensions.width/height
	if (src?.hasOwnProperty('dimensions')) {
		props.width = src.dimensions.width
		props.height = src.dimensions.height
	}

	// Prismic scaled image
	// overwites previously set fullsize image becuase it's easier than sorting out the logic
	// in one pass with negligible impact on performance
	if (size && src?.hasOwnProperty(size)) {
		props.src = src[size].url
		props.width = src[size].dimensions.width
		props.height = src[size].dimensions.height
	}

	if (props.blurDataURL) props.placeholder = 'blur'

	const { width, height, blurWidth, blurHeight, ...requiredProps } =
		props

	// const atts = fill ? requiredProps : props
	return fill ? requiredProps : props
}

export const getImgixParams = (img, size, props) => {
	const params = {}

	const dims =
		props?.width && props?.height
			? { width: props.width, height: props.height }
			: size && size in img
				? img[size].dimensions
				: {}

	if (dims.width) {
		params.w = dims.width
		params.maxW = dims.width
	}

	if (dims.height) {
		params.h = dims.height
		params.maxH = dims.height
	}

	if (dims.width && dims.height) {
		params.ar = `${dims.width}:${dims.height}`
		params.fit = 'crop'
	}

	return params
}

// TODO: Work on validSrc function
// const imgSizeKeys = ['w', 'h', 'maxW', 'maxH']
// export const getImg = (img, config = {}) => {
// 	if (typeof img === 'string') return { src: img }

// 	// Imported directly >> .src
// 	// Next will include all necessary config
// 	if (validObjectKeys(img, 'src')) return { ...img }

// 	// Prismic uses >> .url
// 	if (validObjectKeys(img, 'url')) return { src: img.url }

// 	return validObjectKeyValue(config, 'fallback', true)
// 		? { src: FALLBACK_IMAGE.src }
// 		: { escape: true }
// }

// export const validSrc = (src, size, fill = true) => {
// 	if (
// 		invalidString(src) ||
// 		invalidObjectKeys(src, ['src', 'url'], 'some')
// 	)
// 		return {}

// 	if (typeof src === 'string') return { src }

// 	// Imported directly >> .src
// 	// Next will include all necessary props
// 	if (src?.hasOwnProperty('src')) {
// 		props = { ...src }
// 	}

// 	// Prismic uses >> .url
// 	if (src?.hasOwnProperty('url')) {
// 		props.src = src.url
// 	}

// 	//// Dimensions
// 	// Prismic uses >> src.dimensions.width/height
// 	if (src?.hasOwnProperty('dimensions')) {
// 		props.width = src.dimensions.width
// 		props.height = src.dimensions.height
// 	}

// 	// Prismic scaled image
// 	// overwites previously set fullsize image becuase it's easier than sorting out the logic
// 	// in one pass with negligible impact on performance
// 	if (size && src?.hasOwnProperty(size)) {
// 		props.src = src[size].url
// 		props.width = src[size].dimensions.width
// 		props.height = src[size].dimensions.height
// 	}

// 	if (props.blurDataURL) props.placeholder = 'blur'

// 	const { width, height, blurWidth, blurHeight, ...requiredProps } =
// 		props

// 	// const atts = fill ? requiredProps : props
// 	return fill ? requiredProps : props
// }

// export const getImgixParams = (img, size, props) => {
// 	const params = {}

// 	const dims =
// 		props?.width && props?.height
// 			? { width: props.width, height: props.height }
// 			: size && size in img
// 				? img[size].dimensions
// 				: {}

// 	if (dims.width) {
// 		params.w = dims.width
// 		params.maxW = dims.width
// 	}

// 	if (dims.height) {
// 		params.h = dims.height
// 		params.maxH = dims.height
// 	}

// 	if (dims.width && dims.height) {
// 		params.ar = `${dims.width}:${dims.height}`
// 		params.fit = 'crop'
// 	}

// 	return params
// }
