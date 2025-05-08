import {
	invalidArrObjectData,
	invalidContentObject,
	invalidObjectKeyValue,
	invalidObjectValue,
	validArrData,
	validObjectKeys,
} from '@/lib/helpers'

//// Normalize Prismic Data & Documents
//
export const normalizeTitle = title =>
	typeof title === 'string'
		? title
		: validArrData(title)
			? title[0].text
			: ''

export const normalizeDocs = docs =>
	validObjectKeys(docs, 'results')
		? normalizeDocs(docs.results)
		: invalidArrObjectData(docs)
			? []
			: docs.map(normalizeDoc)

export const normalizeDoc = ({ id, uid, url, tags, data }) => ({
	id,
	uid,
	tags,
	url,
	link: url,
	...data,
})

export const normalizeResults = ({ results }) =>
	results.map(normalizeDoc)

//// Rich Text Renders
//
// Adds classes to dom (if necessary)
// Avoids creating unnecessary wrapper div
export const richFields = {
	heading1: 'h1',
	heading2: 'h2',
	heading3: 'h3',
	heading4: 'h4',
	heading5: 'h5',
	heading6: 'h6',
	paragraph: 'p',
	// 'list-item': 'li',
	// 'o-list-item': 'li',
	// preformatted: 'pre',
	// strong: 'strong',
	// hyperlink: 'a',
	// span: 'span',
	// em: 'em',
	dd: 'dd',
}

export const getRichField = as =>
	Object.entries(richFields).find(f => f.includes(as)) || [null, null]

export const setRichTags = (field, as) => {
	if (invalidContentObject(field)) return []

	if (invalidObjectValue(richFields, as)) return field

	return field.map(f => ({
		...f,
		type: getRichField(as)[0] ?? f.type,
	}))
}

//// Groups, Tgs, Filters, etc
//
export const normalizeByField = (items, field) =>
	items.reduce((acc, curr) => {
		const key = curr[field]

		acc[key] = [...(acc[key] ?? []), curr]

		return acc
	}, {})

export const groupByTag = (tags, items) =>
	tags.map(tag => ({
		tag: tag,
		items: filterByTag({ tag, items }),
	}))

// TODO: reduce would be better, but more confusing
export const filterByTag = ({ tag, items }) =>
	items.filter(item => item.tags.includes(tag)).map(normalizeDoc)

export const flattenTagItems = data =>
	data.map(({ items }) => items).flat()

export const normalizeTagGroups = (key, data) =>
	data
		.map(d => ({ ...d[key] }))
		.map(({ id, uid, tags }) => ({ id, uid, tags }))

export const getUniqueTags = data => {
	if (invalidArrObjectData(data)) return []

	return data.reduce((acc, { tags }) => {
		tags.map(t => {
			if (acc.includes(t)) return

			acc.push(t)
		})

		return acc
	}, [])
}

//// Safe catches
//
export const safeCatch = err => {
	console.error(err)

	return ''
}
export const safeCatchArray = err => {
	console.error(err)

	return []
}
export const safeCatchObject = err => {
	console.error(err)

	return {}
}
export const safeCatchData = err => {
	console.error(err)

	return { data: {} }
}
export const safeCatchSlices = err => {
	console.error(err)

	return { data: { slices: [] } }
}
