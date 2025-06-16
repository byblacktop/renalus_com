import { PrismicRichText } from '@prismicio/react'
import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { invalidContent, validArrData } from '@/lib/helpers'
import { tw } from '@/lib/tw'
import { cn, cp } from '@/lib/utils'

const variants = cva('__body', {
	variants: {
		flow: {
			true: 'sm:columns-2 sm:gap-12 lg:gap-16 2xl:gap-20',
		},

		offset: {
			true: 'sm:w-11/12 sm:ml-auto',
		},

		gap: tw.spaceY,
	},

	defaultVariants: {
		gap: 'md',
	},
})

const Body = ({
	body,
	gap,
	offset,
	flow,
	wrap,
	className,
	...props
}) => {
	if (invalidContent(body)) return

	if (validArrData(body) && body.length < 2) gap = 'none'

	const classeNames = cn(
		variants({ gap, flow, offset }),
		cp(className, 'body', true),
	)

	if (typeof body === 'string')
		return (
			<Shell
				as={wrap ? 'div' : false}
				className={classeNames}
				{...props}
			>
				<p className={wrap ? undefined : classeNames} {...props}>
					{body}
				</p>
			</Shell>
		)

	return (
		<Shell
			as={wrap || className || body.length > 1 ? 'div' : false}
			className={classeNames}
			{...props}
		>
			<PrismicRichText field={body} />
		</Shell>
	)
}

export { Body }
