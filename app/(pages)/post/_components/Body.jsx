import { Section } from '@/components/Compose'
import { Body as Content } from '@/components/Content'

const Body = ({ body }) => {
	return (
		<Section
			container
			width='2xs'
			className={{
				section: 'bg-bg',
				container: '__article __2xs',
			}}
		>
			<Content body={body} wrap className={{ body: '__sm' }} />
		</Section>
	)
}

export { Body }
