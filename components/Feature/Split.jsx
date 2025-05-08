import { Container, Section } from '@/components/Compose'
import { Thread } from '@/components/Content'
import { Parallax } from '@/components/Interactive'
import { AspectImage } from '@/components/Media'
import { bgColor, colorUtil, textColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const FeatureSplit = ({ color, img, dataset, ...contentProps }) => (
	<Section
		className={cn('pl-8 md:pl-16 xl:pl-24 z-2', bgColor(color))}
		{...dataset}
	>
		<div className='__bg'>
			<Container
				layout='grid'
				className='py-0 grid-cols-1 md:grid-cols-2'
			>
				<div className='__xl max-lg:pt-16 pt pb-16 space-y-8 max-md:order-2'>
					{/* Content */}
					<Thread
						{...contentProps}
						linkProps={{
							color: [colorUtil(color), 'primary'],
							variant: ['solid', 'stroke'],
						}}
						className={{
							thread: 'lg:max-w-lg xl:max-w-2xl pr',
							subtitle: textColor(color, 800),
						}}
					/>
				</div>

				<Parallax
					speed={0.5}
					position='reverse'
					className='relative max-md:order-1'
				>
					<AspectImage
						img={img}
						h={12}
						className={cn(
							'md:absolute overflow-hidden',
							'rounded-2xl xl:rounded-2xl',
							'md:aspect-w-3 md:aspect-h-4',
						)}
					/>
				</Parallax>
			</Container>
		</div>
	</Section>
)

export { FeatureSplit }
