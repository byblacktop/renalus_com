import { Title } from '@/components/Content'
import { Flex } from '@/components/UI'
import { cn } from '@/lib/utils'

const ToggleTitle = ({ title, subtitle }) => (
	<Flex gap='xs' align='start'>
		{/* Trigger Subtitle */}
		<Title
			title={subtitle}
			as={typeof subtitle === 'string' && 'h6'}
			className={cn(
				'__label',
				'relative top-[0.15em]',
				'leading-none font-semibold text-accent',
			)}
		/>

		{/* Trigger Title */}
		<Title
			title={title}
			as={typeof title === 'string' && 'h4'}
			className='__sm leading-none'
		/>
	</Flex>
)

export { ToggleTitle }
