import {
	validFieldObject,
	validObject,
	validObjectData,
	validObjectKeys,
	validRef,
} from '@/lib/helpers'

//// Validate
//
export const cleanArrayObjects = data =>
	invalidArrData(data)
		? []
		: data.filter(d => (validObjectData(d) ? true : false))

export const validArr = arr => Array.isArray(arr)

export const invalidArr = arr => !validArr(arr)

export const validArrItems = arr =>
	validArr(arr) && arr.filter(Boolean).length > 0

export const invalidArrItems = arr => !validArrItems(arr)

export const validArrData = arr =>
	validArr(arr) && arr.filter(validItem).length > 0

export const invalidArrData = arr => !validArrData(arr)

export const validArrObjectData = arr =>
	cleanArrayObjects(arr).length > 0

export const invalidArrObjectData = arr => !validArrObjectData(arr)

export const validRefArr = ref =>
	validObjectKeys(ref, 'current') && validArr(ref.current)

export const invalidRefArr = ref => !validRefArr(ref)

export const validRefArrData = ref =>
	validObjectKeys(ref, ['current']) && validArrData(ref.current)

export const invalidRefArrData = ref => !validRefArrData(ref)

export const validRequired = (...vars) =>
	validArr(vars.flat()) &&
	vars.flat().every(v => {
		if (!v) return false

		if (validObjectKeys(v, 'current')) return validRef(v)

		return !!v
	})

export const invalidRequired = (...vars) => !validRequired(...vars)

export const validItem = item => {
	if (validArr(item)) return validArrData(item)

	if (validObject(item)) return validObjectData(item)

	return !!item
}

export const invalidItem = item => !validItem(item)

export const validArrFieldObject = arr =>
	[...(arr || [])].some(validFieldObject)

export const invalidArrFieldObject = arr => !validFieldObject(arr)

//// Mutate
//
export const sortByLastName = items =>
	items.sort((a, b) => {
		const nameA = a.name.split(',')[0].trim().split(' ').pop()
		const nameB = b.name.split(',')[0].trim().split(' ').pop()

		return nameA.localeCompare(nameB)
	})

export const filterUnique = (value, i, self) =>
	self.indexOf(value) === i

export const getUnique = arr => [...new Set(arr)]

export const reduceUnique = arr =>
	invalidArrData(arr)
		? []
		: arr.reduce((acc, curr) =>
				acc.includes(curr) ? acc : [...acc, curr],
			)

export const getUniqueByKey = (arr, key) => {
	const seen = new Set()

	return arr.filter(item => {
		const itemKey = item[key]

		if (!seen.has(itemKey)) {
			seen.add(itemKey)
			return true
		}

		return false
	})
}

export const arrFill = (items, cb) => {
	if (Array.isArray(items)) return items.map(cb)

	if (typeof items === 'object') return Object.entries(items).map(cb)

	if (typeof items === 'number') return Array(items).fill('*').map(cb)

	return []
}
