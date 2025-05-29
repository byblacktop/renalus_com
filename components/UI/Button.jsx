'use client'

import Link from 'next/link'

import { Shell } from '@/components/Compose'
import { NavLink } from '@/components/NavLink'
import { LinkArrow, LoadingDots } from '@/components/UI'
import {
	getLink,
	invalidButton,
	invalidObjectData,
	isButtonType,
	isPanelLink,
	isPrismicLink,
	validObjectData,
	validObjectKeys,
} from '@/lib/helpers'
import { cn, getVariants } from '@/lib/utils'

const variants = getVariants('btn', {
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
	},
})

const isCurrentPageAnchor = (link) => {
	if (!link?.href.includes('#')) return false

	return link.href.startsWith(window.location.pathname + '#')
}

// TODO: Resolve "Reference Error: Cannot access before initialazation" error with tree shaking imports
// Ref: <Video /> for alternate, but equally as unideal handling
function Button({
	link = {},
	as = 'a',
	variant,
	size,
	color,
	cta,
	loading,

	// Utility
	className,
	children,
	...props
}) {
	if (invalidButton({ as, ...link })) return

	const { icon, arrow, loadingText, ...atts } = props

	return (
		<ButtonLink
			as={as}
			link={link}
			className={cn(
				variants({ variant, size, color, cta }),
				className,
				'group',
			)}
			{...atts}
		>
			<Shell
				as={loading ? BtnLoading : BtnCore}
				text={loading ? loadingText : link.text}
				size={size}
				cta={cta}
				{...props}
			>
				{children}
			</Shell>
		</ButtonLink>
	)
}

const ButtonLink = ({ as, link, type, children, ...atts }) => {
	if (isButtonType(as, type))
		return (
			<button type={type} {...atts} data-type='button-link'>
				{children}
			</button>
		)

	if (isPrismicLink(link)) {
		if (isPanelLink(link)) atts.panel = link.uid

		return (
			// TODO: Test thoroughly
			<NavLink field={link} {...atts} data-type='prismic-link'>
				{children}
			</NavLink>
		)
	}

	const hash = typeof window !== 'undefined' && link?.href?.includes(window.location.pathname + '#') ? link.href.split('#')[1] : null

	if (hash) {
		return (
			<Link {...getLink({ ...link, href: `#${hash}` })} {...atts} data-hash={`#${hash}`} data-type='next-link'>
				{children}
			</Link>
		)
	}

	return (
		<Link {...getLink(link)} {...atts} data-type='next-link'>
			{children}
		</Link>
	)
}

const BtnCore = ({ link, text = '', children, ...props }) => {
	const label = text || (validObjectKeys(link, 'text') && link.text)

	return (
		<>
			{/* Button/Link Text */}
			{label && <span className='btn__text'>{label}</span>}

			{/* Children Elements/Components */}
			{children}

			{/* Icon -- After content */}
			<Deco {...props} />
		</>
	)
}

const Deco = ({ icon, arrow, size, cta }) => {
	if ([icon, arrow].every(invalidObjectData)) return

	if (validObjectData(arrow))
		return <LinkArrow size={size} cta={cta} {...arrow} />

	if (validObjectData(icon)) return <Icon icon={icon} />
}

const Icon = ({ icon }) => {
	if (invalidObjectData(icon)) return

	const className = icon?.props?.className || 'w-4 h-4'

	// Alternative to React.cloneElement() for adding props
	return <icon.type {...icon.props} {...{ className }} />
}

const BtnLoading = ({ text, color }) => (
	<LoadingDots
		beforeText={text}
		color={['accent'].includes(color) ? 'trueblack' : 'white'}
	/>
)

export { Button, ButtonLink }
