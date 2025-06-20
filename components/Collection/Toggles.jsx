import { Container, Section } from '@/components/Compose'
import { Body, ProseSplit } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { ButtonGroup, Toggle } from '@/components/UI'
import { getTheme, padZero } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionToggles = ({
	items,
	img,
	color,
	dataset,
	...contentProps
}) => {
	return (
		<>
			<Section {...dataset} className={getTheme(color).className}>
				<Container className='pb-fluid-x'>
					{/* Content */}
					<ProseSplit
						{...contentProps}
						position='Left'
						group='Body'
						align='end'
						color={color}
						className={{ lead: 'grow-1' }}
					/>
				</Container>

				{/* Divider */}
				<div className='h-px bg-slate-300/30' />

				{/* Image + Toggles */}
				<Container
					cols={2}
					gap='lg'
					className='pt-fluid-x'
					align='center'
				>
					<AspectImage
						img={img}
						w={7}
						h={8}
						className='rounded-3xl overflow-hidden'
					/>

					<Toggles items={items} color={color} />
				</Container>
			</Section>
		</>
	)
}

const Toggles = ({ items, color }) => {
	return (
		<dl className={cn('divide-y divide-slate-300/30')}>
			{items.map(({ title, body, links }, iidx) => (
				<Toggle
					key={kn({ title })}
					as='dd'
					color={color}
					title={title}
					subtitle={`${padZero(iidx + 1)}.`}
					className='py-2 md:py-3'
				>
					<Body body={body} className={cn('__sm pb-4')} />
					<ButtonGroup
						links={links}
						size='sm'
						className='pb-6'
						color={['highlight', 'primary']}
						variant={['solid', 'stroke']}
					/>
				</Toggle>
			))}
		</dl>
	)
}

export { CollectionToggles }
