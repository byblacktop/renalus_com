import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { tw } from '@/lib/tw'
import { cn } from '@/lib/utils'

const variants = cva('relative flex', {
	variants: {
		layout: {
			stack: 'flex-col',
			reverse: 'flex-col-reverse',
			row: 'flex-row',
			flip: 'flex-row-reverse',
		},

		align: {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			between: 'items-between',
		},

		justify: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
		},

		items: {
			start: 'place-items-start',
			center: 'place-items-center',
			end: 'place-items-end',
			between: 'place-items-between',
		},

		content: {
			start: 'place-content-start',
			center: 'place-content-center',
			end: 'place-content-end',
			between: 'place-content-between',
		},

		wrap: {
			true: 'flex-wrap',
		},

		gap: tw.gap,
	},

	defaultVariants: {
		gap: 'sm',
	},
})

const Flex = ({ as, className, children, props = {}, ...layout }) => (
	<Shell
		as={as}
		className={cn(variants(layout), className)}
		{...props}
	>
		{children}
	</Shell>
)

export { Flex }
