'use client'

import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'

import { Shell } from '@/components/Compose'
import { PanelLink } from '@/components/PanelLink'
import {
	getLink,
	getLinkField,
	invalidLink,
	isPanelLink,
	isPrismicNavLink,
} from '@/lib/helpers'

const NavLink = ({ panel, href, field, ...props }) => {
	//// Handle panel links
	//
	if (!!panel || !!props['data-panel'] || isPanelLink(field))
		return (
			<PanelLink
				as='button'
				panel={panel || props['data-panel']}
				{...{ onClick, ...props }}
			/>
		)

	//// Handle Invalid Links
	//
	if (invalidLink(href || field)) return <Shell {...props} />

	//// Handle Prismic Links
	//
	if (field)
		return <PrismicNextLink {...getLinkField(field)} {...props} />

	//// Handle normal links
	//
	return <Link {...getLink(href)} {...props} />
}

export { NavLink }
