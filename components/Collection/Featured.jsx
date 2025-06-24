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
		<Section dataset={dataset}>
			<Container gap='lg'>
				<ProseSplit
					className={{
						lead: 'grow-1',
						body: 'grow-1',
					}}
					{...contentProps}
				/>

				<Grid as='div' cols={13} className='items-center'>
					<dl
						className={cn(
							'relative z-1 rounded-xl',
							'col-span-5 md:-mr-36',
							'px-6 lg:px-8',
							'bg-slate-100',
							'divide-y divide-slate-300',
						)}
					>
						{items.map(item => (
							<Item key={kn(item)} item={item} />
						))}
					</dl>

					<div className='relative aspect-11/12 col-span-8'>
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
		<Flex as='dd' align='start' className='py-6 lg:py-8'>
			<Title
				title={item.title}
				// as='h5'
				className='flex-4 __xs'
			/>

			<Body body={item.body} className='flex-7 __sm' role='nav' />
		</Flex>
	)
}

export { CollectionFeatured }
