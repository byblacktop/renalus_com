//// Validation
//
export const validString = str =>
	typeof str === 'string' ? str?.trim().length > 0 : false

export const invalidString = str => !validString(str)

//// Conversions
//
export const trimify = str => {
	if (invalidString(str)) return ''

	// Normalize and prep for replacements
	let val = str.toString().normalize('NFKD').trim()

	// Replace empty chars at the beginning and end of string
	// Accounts for spaces, tabs, or other whitespace characters (Maybe some missed by trim())
	val = val.replace(/^\s+|\s+$/g, '')

	return val
}

export const slugify = (str, spacer = '-') => {
	if (!str) return ''

	// Normalize and prep for replacements
	// let val = str.toString().normalize('NFKD').toLowerCase().trim()

	// // Replace empty chars at the beginning and end of string
	// // Accounts for spaces, tabs, or other whitespace characters (Maybe some missed by trim())
	// val = val.replace(/^\s+|\s+$/g, '')

	let val = trimify(str).toLowerCase()

	// Remove accents, swap ñ for n, etc
	var from =
		'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
	var to =
		'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
	for (var i = 0, l = from.length; i < l; i++) {
		val = val.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
	}

	// Remove invalid chars
	val = val
		.replace(/[^a-z0-9 -]/g, '')
		// Collapse whitespace and replace by -
		.replace(/\s+/g, spacer)
		// Collapse dashes
		.replace(/-+/g, spacer)

	return val
}

export const unslug = str =>
	String(str ?? '')
		.replace('_', '-')
		.split('-')
		.map(w => [w.charAt(0).toUpperCase(), w.slice(1)].join(''))
		.filter(Boolean)
		.join(' ')

export const removeSpaces = str =>
	(String(str) || '').replace(/\s+/g, '')

export const singularize = str =>
	cleanString(str)
		.toString()
		.normalize('NFKD')
		.toLowerCase()
		.trim()
		.replace(/s$/, '')

export const camelCase = str =>
	(String(str) || '')
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase()
		})
		.replace(/\s+/g, '')
		.replace(/\-/g, '')

export const unCamel = str =>
	(String(str) || '')
		.split(/(?<=[a-z])(?=[A-Z])/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

export const toTitleCase = str =>
	(String(unslug(str)) || '')
		.toLowerCase()
		.replace(/_/g, ' ')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

export const snakeToTitleCase = str =>
	(String(str) || '')
		.trim()
		.replace(/_/g, ' ')
		.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))

export const capitalizeFirst = str =>
	(String(str) || '').trim().replace(/^\w/, c => c.toUpperCase())

export const capitalizeWords = str =>
	(String(str) || '')
		.trim()
		.toLowerCase()
		.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))

export const slugToTitle = str => capitalizeWords(unslug(str))

export const pluralize = str => {
	if (invalidString(str)) return ''

	const trimmed = trimify(str)
	const cleaned = cleanString(str)

	// Common irregular plurals
	const irregulars = {
		child: 'children',
		person: 'people',
		man: 'men',
		woman: 'women',
		tooth: 'teeth',
		foot: 'feet',
		mouse: 'mice',
		goose: 'geese',
	}

	if (irregulars[cleaned]) return irregulars[cleaned]

	// Rules for regular plurals
	if (
		cleaned.endsWith('y') &&
		!['ay', 'ey', 'iy', 'oy', 'uy'].some(end => cleaned.endsWith(end))
	)
		return [trimmed.slice(0, -1), 'ies'].join('')

	if (['s', 'x', 'z', 'ch', 'sh'].some(end => cleaned.endsWith(end)))
		return [trimmed, 'es'].join('')

	return [trimmed, 's'].join('')
}

//// Cleaners
//
export const cleanString = str =>
	(String(str) || '')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, ' ')
		.replace(/\s\s+/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.trim()

export const cleanJSONString = json =>
	JSON.stringify(json || {})
		.toLowerCase()
		.replace(/null|true|false/g, '')
		.replace(/[^a-z0-9]/g, ' ')
		.replace(/\s\s+/g, ' ')
		.trim()

export const compareClean = (a, b) =>
	cleanString(a) === cleanString(b)

export const cleanIncludes = (a, b) =>
	a && b && a.includes(cleanString(b))

export const searchData = (data, search) =>
	cleanIncludes(cleanJSONString(Object.values(data)), search)
