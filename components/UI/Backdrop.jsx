import { cva } from 'cva'

import { bgColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
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
				// 'inset-y-1 md:inset-y-1.5 3xl:inset-y-2',
				// 'inset-x-2 md:inset-x-3 3xl:inset-x-4',
				'inset-4 md:inset-6',
				'rounded-3xl md:rounded-4xl',
			),
		},
	],
})

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

export { Backdrop }
