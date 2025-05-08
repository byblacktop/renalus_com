import { asText } from '@prismicio/client'

import {
	invalidArrData,
	invalidObjectData,
	validArr,
	validArrData,
	validArrObjectData,
	validNumber,
	validObject,
	validObjectData,
	validObjectKeys,
	validString,
} from '@/lib/helpers'
import { cn } from '@/lib/utils'

//// Props
//
export const cleanProps = (props = {}, className) =>
	typeof props === 'string'
		? { className: cn(props, className) }
		: validObjectData(props)
			? { ...props, className: cn(props.className, className) }
			: {}

export const isFalsy = prop =>
	[undefined, null, false, 0, '', 'None'].some(v => prop === v)

export const isValue = prop => !isFalsy(prop)

//// Refs
//
export const validRef = ref =>
	validObjectKeys(ref, ['current']) && !!ref.current

export const invalidRef = ref => !validRef(ref)

//// Data
//
export const isEmpty = obj =>
	(validArr(obj) && invalidArrData(obj)) ||
	(validObject(obj) && invalidObjectData(obj))

export const regex = {
	phone:
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
	password: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
	email: !/\S+@\S+\.\S+/,
	alpha: /[a-zA-Z]/,
	numeric: /[0-9]/,
	nonNumeric: /[^0-9.]/g,
}

//// Content
//
export const validLineObject = line => !!line?.text?.trim()

export const validContentObject = content =>
	validArrObjectData(content) &&
	content?.filter(Boolean).filter(c => !!c?.text).length > 0

export const invalidContentObject = content =>
	!validContentObject(content)

export const validFieldObject = field =>
	validObjectKeys(field, ['title', 'subtitle', 'body'], 'some')

export const invalidFieldObject = field => !validFieldObject(field)

export const validContent = content =>
	content &&
	[
		{ type: 'string', fn: validString },
		{ type: 'number', fn: validNumber },
		{
			type: 'object',
			fn: c => validContentObject(c) || validLineObject(c),
		},
	].find(({ type, fn }) => typeof content === type && fn(content))

export const invalidContent = content => !validContent(content)

export const invalidProse = (...content) =>
	!validContent(content.flat())

export const getFirstLine = body => {
	if (!body) return ''

	if (typeof body === 'string') return body

	if (validObjectKeys(body, 'text')) return asText([body])

	if (validArrData(body)) {
		const line = body[0]

		if (typeof line === 'string') return line

		if (validObjectKeys(line, 'text')) return asText([line])
	}

	return ''
}

export const getExcerpt = (body, length = 100) =>
	[
		getFirstLine([body].flat().find(Boolean)).substring(0, length),
		'...',
	].join('')

export const getImgTags = img =>
	img?.alt
		?.split(',')
		.map(tag => tag.trim())
		.filter(Boolean)

//// Types
//
export const validFunction = fn => typeof fn === 'function'

export const invalidFunction = fn => !validFunction(fn)
