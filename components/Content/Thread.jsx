import { Container, Section, Shell } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const Thread = ({
	color,
	className,
	isSection = false,
	dataset,
	...contentProps
}) => {
	return (
		<Shell
			as={isSection ? ContentThread : 'div'}
			color={color}
			flow={contentProps.flow}
			className={cn('__thread', cp(className, 'thread', true))}
			{...dataset}
		>
			<Prose color={color} className={className} {...contentProps} />
		</Shell>
	)
}

const ContentThread = ({ color, flow, className, children }) => (
	<Section
		className={cn(
			getTheme(color).className,
			cp(className, 'section'),
		)}
	>
		<Container
			className={cn(
				!flow && 'max-w-4xl',
				cp(className, 'thread', true),
			)}
		>
			{/* Main Content */}
			{children}
		</Container>
	</Section>
)

export { ContentThread, Thread }
