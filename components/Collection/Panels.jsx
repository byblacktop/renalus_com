import { Container, Section } from '@/components/Compose'
import { ProseSplit } from '@/components/Content'
import { Panels } from '@/components/Interactive'
import { bgColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const CollectionPanels = ({
	items,
	color,
	dataset,
	...contentProps
}) => (
	<Section className={cn(bgColor(color))} dataset={dataset}>
		<Container cols={2} className='max-w-[2080px]'>
			<ProseSplit
				{...contentProps}
				position='Right'
				color='None'
				className={{
					prose: 'col-span-2 md:mb-24',
				}}
			/>

			<Panels items={items} />
		</Container>
	</Section>
)

export { CollectionPanels }
