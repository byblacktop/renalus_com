import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { Grid } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
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
		<Section
			className={cn(
				'relative z-10 rounded-4xl overflow-hidden',
				'm-4 md:m-6 mb-0 md:mb-0',
				getTheme(color).className,
			)}
			{...dataset}
		>
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
						grid: cn(
							'divide-y auto-rows-min',
							getTheme(color).isDark
								? 'divide-slate-300/20'
								: 'divide-indigo/20',
						),
						items: 'py-6 md:py-8 xl:py-12 first:pt-0 last:pb-0',
					}}
				/>
			</Container>
		</Section>
	)
}

export { CollectionProse }
