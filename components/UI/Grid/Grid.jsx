import { forwardRef } from 'react'
import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { GridItems } from '@/components/UI'
import { cols, gap } from '@/lib/tw'
import { cn, cp } from '@/lib/utils'

const variants = cva('relative grid', {
	variants: {
		cols: cols,

		gap: gap,

		pack: {
			false: 'auto-rows-fr',
			true: 'grid-flow-row-dense',
		},
	},

	defaultVariants: {
		cols: 3,
		gap: 'base',
		pack: false,
	},

	compoundVariants: [
		{
			cols: [null, undefined],
			className: 'grid-cols-1 xs:grid-cols-2 lg:grid-cols-3',
		},
	],
})

const Grid = forwardRef(
	(
		{
			as = 'dl',
			cols,
			gap,
			links,
			items,
			pack,
			className,
			children,
			...props
		},
		ref,
	) => {
		return (
			<Shell
				as={as}
				ref={ref}
				className={cn(
					'z-10',
					variants({ cols, gap, pack }),
					cp(className, 'grid', true),
				)}
			>
				<GridItems items={items} className={className} {...props}>
					{children}
				</GridItems>
			</Shell>
		)
	},
)

export { Grid }
