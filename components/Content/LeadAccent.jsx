import { cva } from 'cva'

import { Thread } from '@/components/Content'
import { tw } from '@/lib/tw'
import { cn, cp } from '@/lib/utils'

const bodyAccent = cn(
	//// Accent
	//// TODO: Might be overcomplicating this
	//
	'before:block before:relative before:shrink-0',
	'before:rounded-full overflow-hidden',
	// Top
	'before:top-2.5',
	// Width
	'xs:before:w-10 sm:before:w-20 md:before:w-1/4 xl:before:w-[30%]',
	// Height
	'before:h-0.5',
	'before:bg-current',
)

const variants = cva('', {
	variants: {
		title: {
			'2xl': 'd1',
			xl: 'd2',
		},

		body: {
			default: '__lg max-w-3xl',
			xl: '__xl max-w-4xl',
		},

		links: {
			default: 'max-w-3xl',
			xl: 'max-w-4xl',
		},
	},
})

const LeadAccent = ({ linkProps, size, className, ...props }) => {
	return (
		<Thread
			linkProps={{
				...linkProps,
				gap: 'md',
			}}
			className={{
				...className,
				title: cn(variants({ title: size }), cp(className, 'title')),
				body: cn(
					variants({ body: size ?? 'default' }),
					'w-full flex',
					tw.gap.md,
					bodyAccent,
					cp(className, 'body'),
				),
				links: cn(
					variants({ links: size ?? 'default' }),
					bodyAccent,
					'before:bg-transparent',
					cp(className, 'links'),
				),
			}}
			{...props}
		/>
	)
}

export { LeadAccent }
