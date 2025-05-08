import { Container, Section } from '@/components/Compose'
import { Body, ProseSplit, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Flex, Grid } from '@/components/UI'
import { cn, kn } from '@/lib/utils'

const CollectionFeatured = ({
	img,
	items,
	accent,
	dataset,
	...contentProps
}) => {
	return (
		<Section {...dataset}>
			<Container gap='lg'>
				<ProseSplit
					className={{
						lead: 'grow-1',
						body: 'grow-1',
					}}
					{...contentProps}
				/>

				<Grid as='div' cols={13} className='items-center'>
					<Grid
						cols={1}
						gap={0}
						pack={true}
						className={cn(
							'relative z-1 items-start',
							'bg-stone-100',
							'col-span-5 md:-mr-36',
							'rounded-xl px-6 lg:px-8',
							'divide-y divide-stone-300',
						)}
					>
						{items.map(item => (
							<Item key={kn(item)} item={item} />
						))}
					</Grid>

					<div className='relative aspect-1 col-span-8'>
						<CoverImage
							img={img}
							className='rounded-xl overflow-hidden'
						/>
					</div>
				</Grid>
			</Container>
		</Section>
	)
}

const Item = ({ item }) => {
	return (
		<Flex as='dd' className='py-6 lg:py-8 text-indigo'>
			<Title title={item.title} className='flex-1 __sm' />

			<Body body={item.body} className='flex-2' role='nav' />
		</Flex>
	)
}

export { CollectionFeatured }
