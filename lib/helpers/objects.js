import { invalidArrData } from '@/lib/helpers'

//// Objects
//
const objectString = Object.prototype.toString.call({})
// Reference for validating an object is an object literal
// Will always be the string '[object Object]'
// Feels more "the right way" vs comparing against "'[object Object]'" literally typed out as a string each time...
// ... though it's really not any better and just here to make us feel good that we're not using a magic string each time

export const validObject = obj =>
	!!obj &&
	[
		obj.constrcutor === Object,
		// obj.toString() === objectString, // TODO: This is not correct
		Object.prototype.toString.call(obj) === objectString,
	].some(Boolean)

export const invalidObject = obj => !validObject(obj)

export const validObjectData = obj =>
	validObject(obj) && Object.keys(obj).length > 0

export const invalidObjectData = obj => !validObjectData(obj)

export const validObjectKeys = (obj, values, validate = 'every') => {
	if (invalidObjectData(obj)) return false

	// Flatten values to accommodate arrays or arrays
	const keys = [values].flat().filter(Boolean)

	// Validate keys
	return keys[validate](
		key => key in obj && ![null, undefined].includes(obj[key]),
	)
}

export const invalidObjectKeys = (obj, keys, validate) =>
	!validObjectKeys(obj, keys, validate)

export const validObjectKeyValue = (obj, key, value) =>
	validObjectKeys(obj, [key]) && obj[key] === value

export const invalidObjectKeyValue = (...props) =>
	!validObjectKeyValue(...props)

export const validObjectValue = (obj, value) =>
	validObject(obj) && Object.values(obj).some(v => v === value)

export const invalidObjectValue = (obj, value) =>
	!validObjectValue(obj, value)

//// Components
//
export const validComponent = comp =>
	validObjectKeys(comp, '$$typeof')

export const invalidComponent = comp => !validComponent(comp)

export const validRender = comp =>
	validComponent(comp) && typeof comp.render === 'function'

export const invalidRender = comp => !validRender(comp)
