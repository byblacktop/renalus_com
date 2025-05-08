import { forwardRef, Fragment } from 'react'

import { ButtonLink } from '@/components/UI'
import { invalidLink } from '@/lib/helpers'

const Shell = forwardRef(({ as = 'div', ...props }, ref) => {
	// Render children only
	if ([false, null].includes(as))
		return <Fragment>{props.children}</Fragment>

	// Component/Element to rendering
	const Component = as

	return <Component ref={ref} {...props} />
})

const LinkShell = forwardRef(({ href, link, ...fields }, ref) => {
	const linked = href || link

	if (invalidLink(linked)) return <Shell ref={ref} {...fields} />

	return <ButtonLink ref={ref} link={linked} {...fields} />
})

export { Shell, LinkShell }
