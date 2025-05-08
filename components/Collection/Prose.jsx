import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { Grid } from '@/components/UI'
import { cn } from '@/lib/utils'

const CollectionProse = ({
	title,
	subtitle,
	body,
	items,
	color,
	dataset,
	position,
	link,
	text,
}) => {
	return (
		<Section className={cn('overflow-hidden')} {...dataset}>
			<Container
				layout='grid'
				cols={2}
				gap='xl'
				className='__xs items-start max-md:grid-cols-1'
			>
				<Prose
					className={cn(
						'w-full max-w-xl',
						position === 'Left' && 'order-2 ml-auto',
					)}
					title={title}
					body={[...subtitle, ...body]}
					bodyProps={{ space: '3xs' }}
					links={[{ link, text }]}
				/>
				<Grid
					cols={1}
					gap={false}
					items={items}
					bodyProps='__sm'
					className={{
						grid: cn('divide-y auto-rows-min', 'divide-indigo/10'),
						items: 'py-6 md:py-8 xl:py-12 first:pt-0 last:pb-0',
					}}
				/>
			</Container>
		</Section>
	)
}

export { CollectionProse }
