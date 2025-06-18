import { Section } from '@/components/Compose'
import { Body as Content } from '@/components/Content'
import { cn } from '@/lib/utils'
import { Aside } from './Aside'

const Body = ({ body, imgs, ...asideProps }) => {
	return (
		<Section
			container
			width='xs'
			className={{ container: '__article __xs pt-0' }}
		>
			<Aside {...asideProps} />

			<div></div>
		</Section>
	)
}

export { Body }
