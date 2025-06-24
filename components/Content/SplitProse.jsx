import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { ButtonGroup } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const containerLayout = cva('', {
	variants: {
		color: {
			default: '__sm',
			false: '',
		},
	},

	defaultVariants: {
		color: 'default',
	},
})

const ContentSplitProse = ({
	color,
	dataset,
	links,
	size,
	linkPosition = 'body',
	linkProps,
	className,
	children,
	...contentProps
}) => {
	return (
		<Section
			dataset={dataset}
			className={cn(
				color && getTheme(color).className,
				cp(className, 'section', true),
			)}
		>
			<Container
				gap='sm'
				className={cn(
					containerLayout({ color }),
					cp(className, 'container'),
				)}
			>
				<ProseSplit
					color={color}
					className={className}
					{...contentProps}
				>
					{linkPosition === 'body' && (
						<ButtonGroup
							links={links}
							arrow={{
								direction: 'right',
							}}
							{...linkProps}
						/>
					)}
				</ProseSplit>

				{linkPosition === 'after' && (
					<ButtonGroup
						links={links}
						arrow={{
							direction: 'right',
						}}
						{...linkProps}
					/>
				)}
			</Container>

			{children}
		</Section>
	)
}

export { ContentSplitProse }
