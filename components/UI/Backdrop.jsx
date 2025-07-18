import { cva } from 'cva'

import { bgColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		layout: {
			default: cn(
				'm-1.5 md:m-2 xl:m-3',
				'rounded-3xl md:rounded-4xl overflow-hidden',
			),
			cover: cn(
				'inset-1.5 md:inset-2 xl:inset-3',
				'rounded-3xl md:rounded-4xl overflow-hidden',
			),
		},

		offset: {
			bottom: 'bottom-[calc(10%+32px)]',
			top: 'top-1/12',
			split: 'bottom-1/2',
			panel: 'top-36 bottom-18',
		},

		stretch: {
			true: 'w-[var(--w-stretch)]',
		},
	},

	compoundVariants: [
		{
			offset: ['boxed', 'panel'],
			className: cn(
				'inset-1.5 md:inset-2 xl:inset-3',
				'rounded-3xl md:rounded-4xl',
			),
		},
	],
})

const getBackdrop = layout => variants({ layout })

const Backdrop = ({
	color,
	offset,
	stretch,
	layer = false,
	className,
}) => (
	<div
		className={cn(
			'__backdrop',
			'absolute inset-0',
			variants({ offset, stretch }),
			bgColor(color),
			className,
		)}
	>
		{layer && (
			<div className='absolute inset-x-0 bottom-0 top-auto h-8 rounded-t-4xl bg-bg' />
		)}
	</div>
)

export { Backdrop, getBackdrop }
