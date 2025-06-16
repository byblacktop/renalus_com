import { Container, Section } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { Stack } from '@/components/Interactive'
import { invalidProse } from '@/helpers/data'

const CollectionStack = ({ items, dataset, ...contentProps }) => (
	<Section {...dataset}>
		<Intro {...contentProps} />

		<Stack items={items} layout='collection' />
	</Section>
)

const Intro = ({ title, subtitle, body, ...props }) => {
	if (invalidProse(title, subtitle, body)) return

	return (
		<Container className='__sm'>
			<ProseSplit
				title={title}
				subtitle={subtitle}
				body={body}
				{...props}
			/>
		</Container>
	)
}

export { CollectionStack }
