import { cva } from 'cva'

import { cn } from '@/lib/utils'

const variants = cva('aspect-w-16', {
	variants: {
		size: {
			// Numbers
			default: 'aspect-h-1',
			0: 'aspect-h-0',
			1: 'aspect-h-1',
			2: 'aspect-h-2',
			3: 'aspect-h-3',
			4: 'aspect-h-4',
			5: 'aspect-h-5',
			6: 'aspect-h-6',
			7: 'aspect-h-7',
			8: 'aspect-h-8',
			9: 'aspect-h-9',
			10: 'aspect-h-10',
			11: 'aspect-h-11',
			12: 'aspect-h-12',
			13: 'aspect-h-13',
			14: 'aspect-h-14',
			15: 'aspect-h-15',
			16: 'aspect-h-16',

			// Strings
			'2XS': 'aspect-h-1',
			XS: 'aspect-h-3',
			SM: 'aspect-h-6',
			MD: 'aspect-h-9',
			LG: 'aspect-h-12',
			XL: 'aspect-h-14',
			'2XL': 'aspect-h-16',
		},
	},

	defaultVariants: {
		size: 'default',
	},
})

const Spacer = ({ size, split, ...props }) =>
	split ? (
		<SpacerSplit size={size} {...props} />
	) : (
		<div className={cn(variants({ size }), props.className)} />
	)

const SpacerSplit = props => (
	<div className='grid grid-cols-1 sm:grid-cols-2'>
		<Spacer {...props} />
	</div>
)

export { Spacer }
