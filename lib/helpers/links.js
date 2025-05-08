import { asLink } from '@prismicio/client'

import { SITE_URL } from '@/lib/constants'
import {
	invalidArr,
	invalidObjectKeys,
	invalidRequired,
	invalidString,
	slugify,
	validArr,
	validArrObjectData,
	validObject,
	validObjectKeys,
	validObjectKeyValue,
	validString,
} from '@/lib/helpers'

//// Links
//
export const validLink = link => {
	if (isPrismicLink(link)) return validObjectKeys(link, 'url')

	const href =
		typeof link === 'string'
			? link
			: validObjectKeys(link, 'href')
				? link.href
				: null

	return validHref(href) || validCta(href)
}

export const invalidLink = link => !validLink(link)

export const cleanLinks = links =>
	validArr(links) ? links.filter(validLink) : []

export const cleanButtonGroup = links =>
	validArrObjectData(links) ? links.filter(validButton) : []

export const validButton = ({ as, type, ...props }) =>
	validLink(props) || isButtonType(as, type)

export const invalidButton = atts => !validButton(atts)

export const isButtonType = (as, type) =>
	['button', 'submit', 'span'].some(el => as === el || type === el)

export const validHref = href =>
	typeof href === 'string' &&
	['http', '/', '#'].some(l => href.startsWith(l))

export const invalidHref = href => !validHref(href)

export const validMailTo = href =>
	typeof href === 'string' &&
	href.startsWith('mailto:') &&
	['@', '.com'].every(l => href.includes(l))

export const invalidMailTo = href => !validMailTo(href)

export const validTel = href =>
	typeof href === 'string' && href.startsWith('tel:')

export const invalidTel = href => !validTel(href)

export const isCta = link => isLinkTo(link, ['mailto:', 'tel:'])

export const validCta = link => validMailTo(link) || validTel(link)

export const isPrismicLink = link =>
	validObjectKeys(link, 'link_type')

export const isPrismicWebLink = link =>
	validObjectKeyValue(link, 'link_type', 'Web')

export const isPrismicDocLink = doc =>
	validObjectKeyValue(doc, 'link_type', 'Document')

export const isPrismicMediaLink = link =>
	validObjectKeyValue(link, 'link_type', 'Media')

export const isPanelLink = link =>
	(validObject(link) && !!link.panel) ||
	validObjectKeyValue(link, 'type', 'panel') ||
	validObjectKeys(link, 'data-panel')

export const isPrismicLinked = link =>
	[isPrismicDocLink, isPrismicMediaLink].some(fn => fn(link))

export const isLinkBroken = link =>
	!link ||
	invalidLink(link) ||
	validObjectKeyValue(link, 'type', 'broken_type') ||
	validObjectKeyValue(link, 'isBroken', true)

export const validPrismicLink = link =>
	validObjectKeys(link, ['link_type', 'url'])

export const isPrismicNavLink = props =>
	validObjectKeys(props, 'field')

export const linkAttributes = link =>
	!link
		? {}
		: [...link.attributes].reduce(
				(acc, att) => ({ ...acc, [att.name]: att.value }),
				{},
			)

export const isExternal = link =>
	validLink(link) && ![isInternal, isCta].some(fn => fn(link))

export const isInternal = link =>
	validLink(link) && isLinkTo(link, [SITE_URL, '/'])

export const isLinkTo = (link, opts) => {
	if (invalidLink(link)) return false

	const href =
		typeof link === 'string'
			? link
			: validObject(link)
				? link.url || link.href
				: typeof link.nodeName === 'string'
					? link.getAttribute('href')
					: ''

	if (!href) return false

	return opts.some(str => href.startsWith(str))
}

export const isTab = link =>
	validObjectKeyValue(linkAttributes(link), 'target', '_blank')

export const extractLink = link => {
	if (isLinkBroken(link)) return '#'

	if (typeof link === 'string') return link
	if (isPrismicLinked(link)) return asLink(link)

	if (validObjectKeys(link, 'url')) return link.url
	if (validObjectKeys(link, 'href')) return link.href
	if (validObjectKeys(link, 'link')) return link.href

	return '#'
}

export const cleanLink = link => {
	if (isLinkBroken(link)) return '#' // optional chaining prevents build error for items without link

	let href = extractLink(link)

	if (invalidString(href)) return '#'

	href = href?.replace('https://self', '')?.replace('https://#', '#')

	const hash = getHash(href)
	if (hash) href = hash

	return href
}

export const isAnchorLink = href =>
	validString(href) && href?.indexOf('#') === 0

export const cleanHash = str => slugify(str.trim())

export const hashify = str => `#${cleanHash(str)}`

export const getHash = href =>
	isAnchorLink(href) ? hashify(href) : null

export const validHash = hash => /^#[a-zA-Z0-9-]+$/.test(hash)

export const invalidHash = hash => !validHash(hash)

export const getHashAnchor = hash => {
	if (validHash(hash)) {
		const parent = document?.getElementById(hash.slice(1))
		if (parent) return parent
	}

	const haystack = document?.querySelectorAll(
		'h1, h2, h3, h4, h5, h6',
	)

	const title = [...(haystack || [])].find(
		el => hashify(el.textContent) === hash,
	)

	if (title) return title

	return null
}

export const getAnchor = (hash, el) => {
	if (
		invalidRequired(
			typeof window !== 'undefined',
			hash === '#' || validHash(hash),
		)
	)
		return

	const anchor = getHashAnchor(hash)
	if (anchor) return anchor

	const parent = el.closest('section')

	// IMPORTANT: must use nextElementSibling... nextSibling may return comment nodes
	return parent?.nextElementSibling
}

export const handleAnchor = e => {
	if (typeof window === 'undefined') return

	e.stopPropagation()
	e.preventDefault()

	const el = e.currentTarget
	const href = el.getAttribute('href')
	const hash = getHash(href)

	if (invalidString(href)) return

	const anchor = getAnchor(hash, el)

	if (!anchor) return

	const header = document.querySelector('header.header')
	const offsetY = header?.firstElementChild?.scrollHeight ?? 100

	const top =
		anchor.getBoundingClientRect().top + window.scrollY - offsetY

	window.scrollTo({
		top,
		left: 0,
		behavior: 'smooth',
	})
}

export const getLink = link => {
	const href = cleanLink(link)
	const hash = getHash(href)

	//// Link Attributes
	//
	let atts = {}

	// PDF links to open new tab if not specified
	if (href.includes('.pdf')) atts.target = '_blank'

	// Anchor link clicks
	if (hash) atts.onClick = handleAnchor

	return {
		href,
		...atts,
	}
}

export const getLinkField = field => {
	const { href, ...atts } = getLink(field)
	field.url = href

	return { field, ...atts }
}

//// Articles
//
export const getArticleLink = (link, doc) => {
	if (isPrismicLink(link) && asLink(link))
		return {
			href: asLink(link),
			target: '_blank',
			rel: 'noopener noreferrer',
		}

	return { href: cleanLink(doc) }
}
