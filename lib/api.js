import { notFound } from 'next/navigation'
import { asImageSrc, filter } from '@prismicio/client'

import {
	FALLBACK_IMAGE,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from '@/lib/constants'
import {
	capitalizeWords,
	invalidArrData,
	invalidObjectData,
	isPrismicImg,
	normalizeDoc,
	normalizeDocs,
	normalizeTitle,
	safeCatchArray,
	safeCatchData,
	slugToTitle,
	unslug,
	validArrData,
	validImg,
	validObjectKeys,
} from '@/lib/helpers'
import { createClient } from '@/prismicio'

//// Query Filters and Orderings
//
export const filterDocs = {
	media: [filter.any('document.tags', ['Podcast', 'Video'])],
	articles: [filter.not('document.tags', ['Podcast', 'Video'])],
}

export const orderDocs = {
	post: [{ field: 'my.post.date', direction: 'desc' }],
	team: [{ field: 'my.team.priority', direction: 'asc' }],
}

export const getQryParams = (type, filter) => {
	const filters = validObjectKeys(filterDocs, filter, 'some')
		? filterDocs[filter]
		: undefined

	const orderings = validObjectKeys(orderDocs, type, 'some')
		? orderDocs[type]
		: undefined

	return { filters, orderings }
}

//// Documents
//
export const getDoc = async (type = 'page', uid) => {
	const client = createClient()

	const data = await client
		.getByUID(type, uid)
		.then(normalizeDoc)
		.catch(notFound)

	return data
}

export const getDocs = async (type = 'post') => {
	const client = createClient()

	const data = await client
		.getAllByType(type)
		.then(normalizeDocs)
		.catch(notFound)

	return data
}

export const getLatestDoc = async (
	type = 'post',
	filter,
	qry = {},
) => {
	const client = createClient()

	const params = getQryParams(type, filter)

	try {
		const data = await client
			.getSingle(type, {
				...params,
				...qry,
			})
			.then(normalizeDoc)

		return data
	} catch (error) {
		console.warn(error)

		return {}
	}
}

export const getFilteredDocs = async (
	type = 'page',
	{ filters, ...qry },
) => {
	const client = createClient()

	try {
		const data = await client
			.getSingle(type, {
				filters: filters.map(({ fn, path, value }) =>
					filter[fn](path, value),
				),
				...qry,
			})
			.then(normalizeDoc)

		return data
	} catch (error) {
		console.warn(error)

		return {}
	}
}

export const getRelatedDocs = async id => {
	const client = createClient()

	const data = await client
		.getAllByType('post', {
			limit: 3,
			filters: [filter.similar(id, 10)],
			orderings: [
				{
					field: 'my.post.date',
					direction: 'desc',
				},
			],
		})
		.then(normalizeDocs)

	return data
}

export const getRepoTags = async () => {
	const client = createClient()

	const data = await client.getTags()

	return data
}

//// Slices
//
export const getSlices = async (uid, type = 'page') => {
	const client = createClient()

	const {
		data: { slices },
	} = await client.getByUID(type, uid).catch(notFound)

	return slices
}

//// Params
//
const ignoreStaticParamUIDs = ['home']
export const getStaticParams = async (type = 'page') => {
	const client = createClient()

	const pages = await client
		.getAllByType(type, {
			graphQuery: `{
				doc {
					uid
				}
			}`,
		})
		.catch(safeCatchArray)

	return pages
		.filter(
			({ uid }) => !!uid && !ignoreStaticParamUIDs.includes(uid),
		)
		.map(({ uid }) => ({ uid }))
}

export const getCatchAllStaticParams = async (type = 'page') => {
	const params = await getStaticParams(type)

	return [{}, ...params.map(({ uid }) => ({ uid: [uid] }))]
}

//// Normalize Meta Data
//
export const getMeta = async (
	params,
	type = 'page',
	prefix = `${capitalizeWords(type)} | `,
) => {
	const { uid } = await params
	const client = createClient()

	const { url, data } = await client
		.getByUID(type, uid)
		.catch(safeCatchData)

	const {
		img,
		title,
		slices,
		meta_title,
		meta_description,
		meta_social_title,
		meta_social_description,
		meta_social_image,
	} = data

	const tabTitle = getMetaTitle({ title, meta_title, uid, prefix })

	const description = meta_description || SITE_DESCRIPTION

	const openGraph = {
		siteName: SITE_NAME,
		url: [SITE_URL, url].join(''),
		title: getOGMetaTitle({ meta_social_title, tabTitle, prefix }),
		description: meta_social_description || description,
		images: [getMetaImages(meta_social_image, img, slices)],
	}

	return {
		title: tabTitle,
		description,
		openGraph,
	}
}

export const getMetaTitle = ({
	title,
	meta_title,
	uid,
	prefix = `${capitalizeWords(uid)} | `,
}) => {
	const cmsTitle = [
		meta_title,
		normalizeTitle(title),
		slugToTitle(uid),
	]
		.find(Boolean)
		.replace(prefix, '')

	return [prefix, cmsTitle].filter(Boolean).join('')
}

export const getOGMetaTitle = ({
	meta_social_title,
	tabTitle,
	prefix,
}) =>
	meta_social_title
		? [prefix, meta_social_title].filter(Boolean).join('')
		: tabTitle

export const getMetaImages = (meta, img, slices) => {
	const { seo, page, fallback } = {
		seo: asImageSrc(meta),
		page: asImageSrc(img),
		fallback: FALLBACK_IMAGE,
	}

	// Return explicit meta or article featured image
	if (seo) return getMetaImage(seo)

	if (page) return getMetaImage(page)

	// Return image from slices
	const imgs = getImagesFromSlices(slices)
	if (validArrData(imgs)) return getMetaImage(imgs[0])

	// Return fallbacks if nothing else
	return {
		url: fallback.src,
		width: fallback.width,
		height: fallback.height,
	}
}

export const getMetaImage = img => {
	if (!img) return {}

	if (typeof img === 'string') return { url: img }

	if (isPrismicImg(img))
		return {
			url: img.url,
			...img.dimensions,
		}

	if (validObjectKeys(img, ['src']))
		return {
			url: img.src,
			width: img.width,
			height: img.height,
		}

	return {}
}

//// Images
//
export const getImagesFromSlices = slices => {
	if (invalidArrData(slices)) return []

	return slices.map(getImagesFromSlice).flat()
}

export const getImagesFromSlice = slice => {
	if (!slice) return []

	const { primary, items, ...props } = slice

	if (invalidObjectData(primary) && invalidArrData(items)) return []

	const pImg = primary?.img
	const iImg = items?.map(item => item?.img)

	return [pImg, ...iImg].filter(validImg)
}

//// Get image base64 string (for blurDataURL)
//
export const getImageBlurs = async slices => {
	if (!slices || slices.length < 1) return []

	const imgs = slices
		.map(getImagesFromSlice)
		.map(getSliceImageBlurUrls)

	const blurs = await Promise.all(imgs)

	// TODO: Maybe add slice modification before returning
	return await getBlurDataURLs(blurs.flat())
}

export const getSliceImageBlurUrls = imgs => {
	return imgs
		.filter(Boolean)
		.map(getBlurURL)
		.filter(
			img =>
				img?.blurURL &&
				img.blurURL.includes('prismic.io') &&
				/\.jpg|\.jpeg|\.png|\.gif/.test(img.blurURL),
		)
}

export const getBlurURL = src => {
	if (!src || typeof src !== 'object') return src

	const { dimensions, url, blur } = src

	if (blur?.url) return { ...src, blurURL: blur.url }

	let blurURL = url

	if (url && dimensions) {
		const params = {
			w: `w=${dimensions.width}`,
			h: `h=${dimensions.height}`,
		}

		if (blurURL.includes(params.w))
			blurURL = blurURL.replace(params.w, 'w=16')
		if (blurURL.includes(params.h))
			blurURL = blurURL.replace(params.h, 'h=16')
	}

	return { ...src, blurURL }
}

export const getBlurDataURLs = async imgs =>
	await Promise.all(
		imgs.map(async img => ({
			url: img?.url,
			blurDataURL: await getBase64(img?.blurURL),
		})),
	)

export const getBase64 = async url =>
	fetch(url)
		.then(async response => ({
			type: response.headers.get('content-type'),
			arrayBuffer: await response.arrayBuffer(),
		}))
		.then(({ type, arrayBuffer }) => {
			const base64String = Buffer.from(arrayBuffer).toString('base64')

			return `data:${type};base64,${base64String}`
		})
		.catch(error => 'data:jpeg;base64,')

export const strToBase64 = str =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str)

//// Get search and filter results
//
export const getParams = params =>
	[...new Map(params.entries())].reduce(
		(acc, [key, value]) => ({ ...acc, [key]: value }),
		{},
	)

export const getOptions = filters =>
	filters.map(({ filter }) => ({
		param: filter.slug,
		placeholder: `All ${unslug(filter.slug)}`,
		items: [
			{ label: `All ${unslug(filter.slug)}`, value: 'all' },
			...filter.tags.map(tag => ({ label: tag, value: tag })),
		],
	}))

export const getSelections = (data = [], key) =>
	data.filter(({ param }) => param in key)

export const getChoices = (data = {}, values) =>
	data.reduce(
		(acc, { param }) => ({
			...acc,
			[param]: values[param],
		}),
		{},
	)

export const getSearched = (data, s) =>
	s
		? data.filter(d =>
				[d.name, d.accreditation]
					.join(' ')
					.toLowerCase()
					.includes(s.toLowerCase()),
			)
		: []

export const getFiltered = (items, f) => {
	return Object.entries(f)
		.map(([key, value]) =>
			items.filter(item => item.tags.includes(value)),
		)
		.flat()
}

export const getResults = (searched, filtered) => [
	...searched,
	...filtered,
]
