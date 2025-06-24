import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { Body, Lead } from '@/components/Content'
import { ButtonGroup } from '@/components/UI'
import {
	validArrObjectData,
	validContent,
	validObjectKeys,
} from '@/lib/helpers'
import { tw } from '@/lib/tw'
import { cn, cp } from '@/lib/utils'

// Experimental
const variants = cva('__prose', {
	variants: {
		layout: {
			grid: 'grid grid-cols-1 grid-flow-row-dense',
			flex: 'flex flex-col',
			reverse: 'flex flex-col-reverse',
			block: '',
		},

		width: {
			default: 'max-w-4xl',
			sm: 'max-w-2xl',
			xs: 'max-w-lg',
			'2xs': 'max-w-md',
		},

		gap: tw.gap,

		flow: {
			true: 'max-w-screen-2xl',
		},
	},

	defaultVariants: {
		layout: 'grid',
		width: 'default',
		gap: 'md',
	},
})

const Prose = ({
	body,
	layout,
	width,
	offset,
	flow,
	gap,
	links,
	linkProps,
	wrap,
	className,
	children,
	...leadContent
}) => {
	const hasBody = !!validContent(body)
	const hasChildren =
		validArrObjectData(children) && children?.length > 0

	const hasShell = wrap || hasBody || hasChildren

	return (
		<Shell
			as={hasShell ? 'div' : false}
			className={cn(
				variants({
					width,
					flow,
					gap: cp(gap, 'prose', true),
					layout: cp(layout, 'prose', true),
				}),
				cp(className, 'prose', true),
			)}
		>
			<Lead
				layout={cp(layout, 'lead')}
				gap={cp(gap, 'lead')}
				className={
					validObjectKeys(
						className,
						['lead', 'title', 'subtitle'],
						'some',
					) && className
				}
				{...leadContent}
			/>

			<Body
				body={body}
				flow={flow}
				offset={offset}
				gap={cp(gap, 'body')}
				className={cp(className, 'body')}
			/>

			<ButtonGroup
				links={links}
				offset={offset}
				className={cp(className, 'links')}
				{...linkProps}
			/>

			{children}
		</Shell>
	)
}

export { Prose }
