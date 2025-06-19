import { Container, Section } from '@/components/Compose'
import { Body, Lead } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { ButtonGroup, Toggle } from '@/components/UI'
import { getTheme, padZero } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const CollectionHighlight = ({
	items,
	img,
	body,
	color,
	dataset,
	...contentProps
}) => {
	return (
		<>
			<Section
				{...dataset}
				className={cn(getTheme(color).className, 'mt-24')}
			>
				<Container cols={2} gap='lg' align='center' className='py-0'>
					<AspectImage
						img={img}
						w={7}
						h={8}
						className={{
							figure: '-mt-24',
							img: 'rounded-3xl overflow-hidden',
						}}
					/>
					<Lead
						{...contentProps}
						className={{ subtitle: '__label __brief __sm' }}
					/>
				</Container>

				<Container cols={2} align='start'>
					<Body
						body={body}
						className={cn('sticky top-24', 'md:pr-12')}
					/>
					<Toggles items={items} color={color} />
				</Container>
			</Section>
		</>
	)
}

const Toggles = ({ items, color }) => {
	return (
		<dl
			className={cn(
				'divide-y divide-slate-300/30',
				'md:pl-12 border-l border-slate-300/30',
			)}
		>
			{items.map(({ title, body, links }, idx) => (
				<Toggle
					key={kn({ title })}
					as='dd'
					color={color}
					title={title}
					subtitle={`${padZero(idx + 1)}.`}
					className={cn({
						'pb-2 md:pb-3 -mt-2 md:-mt-3': idx === 0,
						'pt-2 md:pt-3 -mb-2 md:-mb-3': idx === items.length - 1,
						'py-2 md:py-3': idx > 0 && idx < items.length - 1,
					})}
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

export { CollectionHighlight }
