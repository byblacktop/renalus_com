import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { Grid } from '@/components/UI'
import { getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const CollectionCore = ({
	items,
	cols,
	color,
	dataset,
	link,
	text,
	...contentProps
}) => {
	return (
		<Section
			className={cn(getTheme(color).className)}
			dataset={dataset}
		>
			<Container
				layout='grid'
				gap='prose'
				className='__xs xl:grid-cols-4 max-xl:gap-12 items-start'
			>
				<Prose
					links={[{ link, text }]}
					className='__xs max-w-xl'
					{...contentProps}
				/>
				<Grid
					items={items}
					cols={cols}
					gap='sm'
					icon={true}
					// TODO: Find better global config
					className='max-xs:grid-cols-1 xl:col-span-3'
					itemsProseProps={cn(
						'bg-slate-200/10 rounded-xl',
						'p-4 md:p-6',
						'max-xs:flex',
					)}
					leadProps={{ titleProps: 'text-slate-100' }}
				/>
			</Container>
		</Section>
	)
}

export { CollectionCore }
