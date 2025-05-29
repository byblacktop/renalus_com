import { Title } from '@/components/Content'
import { Flex } from '@/components/UI'

const ToggleTitle = ({ title, subtitle }) => (
	<Flex gap='xs'>
		{/* Trigger Subtitle */}
		<Title
			title={subtitle}
			as={typeof subtitle === 'string' && 'h6'}
			className='__label __sm text-slate'
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
