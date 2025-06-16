import { Container, Section } from '@/components/Compose'
import { Intro, Prose } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Backdrop, Box, Grid, Spacer } from '@/components/UI'
import { cn, kn } from '@/lib/utils'

const CollectionCards = ({
	img,
	items,
	cols,
	link,
	dataset,
	...contentProps
}) => (
	<Section {...dataset}>
		<article>
			<Container as='div' className='__dark __lg z-2 -mb-(--py)'>
				<Spacer size={3} split={true} />
				<Prose
					width='sm'
					className={{
						subtitle: '__label __brief __sm text-indigo-100',
					}}
					{...contentProps}
				/>
			</Container>

			<CoverImage
				img={img}
				className={{
					figure: cn(
						'@container z-1 bg-indigo-500',
						'inset-x-4 md:inset-x-7 2xl:inset-x-10',
						'rounded-3xl md:rounded-4xl',
					),
					img: cn('z-2', 'mix-blend-multiply grayscale-100'),
				}}
			>
				{/* Gradient */}
				<div
					className={cn(
						'absolute z-3 inset-0 aspect-1 bg-radial-[at_calc(50vw-33cqw)_28cqh]',
						'from-indigo/70 to-indigo-200/0 to-40%',
					)}
				/>

				{/* Backdrop */}
				{/* <div className='absolute inset-x-stretch bg-indigo' /> */}
			</CoverImage>

			<Backdrop color='indigo' offset='split' />
		</article>

		<Container className='z-3 pt-0 pb-fluid-x'>
			<Grid cols={cols}>
				<div />
				{items.map(item => (
					<Card key={kn(item)} {...item} />
				))}
			</Grid>
		</Container>
	</Section>
)

const Card = props => (
	<Box>
		<Intro {...props} />
	</Box>
)

export { CollectionCards }
