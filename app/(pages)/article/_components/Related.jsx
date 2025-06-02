import { Container, Section } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { Backdrop, ButtonGroup } from '@/components/UI'
import { getRelatedDocs } from '@/lib/api'
import { invalidString } from '@/lib/helpers'
import { spaceY } from '@/lib/tw'
import { PostHighlights } from '@/article/Highlights'

const Related = async ({ id, links }) => {
	if (invalidString(id)) return

	const related = await getRelatedDocs(id)

	return (
		<Section className='__dark'>
			<Container layout='stack' gap='md' className='pb-3'>
				<div className={spaceY.lg}>
					<ProseSplit
						title='Check out some of our other related posts'
						subtitle='More Resources'
						position='Right'
						color='blue'
						as={{ title: 'h3', subtitle: 'h5' }}
						className={{
							title: 'text-white',
						}}
					/>

					<PostHighlights
						results={related}
						featured={false}
						cols={12}
					/>
				</div>

				<ButtonGroup
					links={links}
					color={['highlight', 'primary']}
					variant={['solid', 'stroke']}
					arrow={[
						{
							direction: 'upLeft',
							className: '-order-1',
						},
					]}
				/>
			</Container>

			<Backdrop
				color='blue'
				offset='boxed'
				className='rounded-2xl md:rounded-3xl'
			/>
		</Section>
	)
}

export { Related }
