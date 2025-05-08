import { AspectImage, CoverImage } from '@/components/Media'
import { Grid } from '@/components/UI'
import { cn, kn } from '@/lib/utils'

const Gallery = ({ imgs }) => (
	<Grid cols={2} gap='sm'>
		{imgs.map(({ img }, i) => {
			return (
				<CoverImage
					key={kn(img)}
					img={img}
					w={16}
					h={13}
					className={{
						figure: cn(
							'relative',
							'rounded-lg overflow-hidden',
							'row-span-2',

							// Set aspect ratio for the start and end of the pattern —— Other will fill the grid
							'nth-[4n+1]:aspect-16/13',
							'nth-[4n+4]:aspect-16/13',

							// Set row span for the middle
							'nth-[4n+2]:row-span-3',
							'nth-[4n+3]:row-span-3',
						),
					}}
				/>
			)
		})}
	</Grid>
)

export { Gallery }
