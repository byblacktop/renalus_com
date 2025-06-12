import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { cols, gap } from '@/lib/tw'
import { cn } from '@/lib/utils'

const variants = cva('__container', {
	variants: {
		layout: {
			flex: 'flex',
			stack: 'flex flex-col',
			row: 'flex flex-row',
			flip: 'flex flex-row-reverse',
			reverse: 'flex flex-col-reverse',
			grid: 'grid grid-cols-1 grid-flow-row-dense',
		},

		align: {
			center: 'items-center',
			start: 'items-start',
			end: 'items-end',
		},

		justify: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
		},

		content: {
			center: 'place-content-center',
			start: 'place-content-start',
			end: 'place-content-end',
			between: 'place-content-between',
		},

		items: {
			center: 'place-items-center',
			start: 'place-items-start',
			end: 'place-items-end',
		},

		width: {
			full: 'max-w-none',
			stretch: 'max-w-none p-edge',
			'3xs': 'max-w-(--breakpoint-md)',
			'2xs': 'max-w-4xl',
			xs: 'max-w-(--breakpoint-lg)',
			sm: 'max-w-(--breakpoint-xl)',
			lg: 'max-w-(--breakpoint-3xl)',
			xl: 'max-w-(--breakpoint-4xl)',
			'2xl': 'max-w-(--breakpoint-5xl)',
		},

		cols: cols,

		gap: gap,
	},

	compoundVariants: [
		{
			layout: undefined,
			cols: Object.keys(cols),
			className: 'grid',
		},
		{
			layout: ['grid', 'stack'],
			gap: undefined,
			className: gap.base,
		},
		{
			gap: Object.keys(gap),
			layout: undefined,
			className: 'grid',
		},
		{
			layout: ['grid', undefined],
			cols: undefined,
			gap: Object.keys(gap),
			className: 'grid-cols-1',
		},
	],
})

const Container = ({
	as = 'article',
	layout,
	width,
	align,
	justify,
	content,
	items,
	cols,
	gap,
	className,
	children,
	...props
}) => {
	return (
		<Shell
			as={as}
			className={cn(
				variants({
					layout,
					align,
					justify,
					content,
					items,
					width,
					cols,
					gap,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</Shell>
	)
}

export { Container }
