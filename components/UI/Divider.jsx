import { cva } from 'cva'

import { bgColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('__divider', {
	variants: {
		size: {
			xs: 'w-16',
			sm: 'w-32',
			lg: 'w-64',
			xl: 'w-96',
			full: 'w-full',
		},

		position: {
			center: 'mx-auto',
			left: 'mr-auto',
			right: 'ml-auto',
		},
	},

	defaultVariants: {
		size: 'xs',
		position: 'left',
	},
})

export const Divider = ({ color, size, position, className }) => {
	return (
		<div
			className={cn([
				'h-1',
				bgColor(color),
				variants({ size, position }),
				className,
			])}
		/>
	)
}
