import { Container, Section } from '@/components/Compose'
import { Thread } from '@/components/Content'
import { Parallax } from '@/components/Interactive'
import { CoverImage } from '@/components/Media'
import { bgColor, colorUtil, textColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const FeatureStatement = ({
	color,
	img,
	dataset,
	...contentProps
}) => {
	return (
		<Section
			className={cn('pl-8 md:pl-16 xl:pl-24 z-2', bgColor(color))}
			{...dataset}
		>
			<div className='__bg rounded-tl-6 md:rounded-tl-8 xl:rounded-tl-12'>
				<Container
					layout='grid'
					gap='xl'
					width='full'
					className={cn(
						'items-center md:grid-cols-2',
						'p-8',
						'md:p-16',
					)}
				>
					{/* TODO: Double check this... kinda weird... or extract to component */}
					<div
						className={cn(
							'relative overflow-hidden',
							'rounded-3 md:rounded-4 xl:rounded-6', // Round sides
							'rounded-bl-xl md:rounded-bl-xl xl:rounded-bl-2xl', // Flat side
							'aspect-w-16 aspect-h-12 xl:aspect-h-11',
						)}
					>
						<CoverImage
							img={img}
							plx={{ speed: 0.5 }}
							className={{ target: '-top-24 -bottom-24' }}
						/>
					</div>

					{/* Content */}
					<Thread
						linkProps={{
							color: [colorUtil(color), 'highlight'],
							variant: ['solid', 'stroke'],
						}}
						className={{
							thread: 'max-w-lg xl:max-w-xl text-pretty',
							lead: '__lg',
							subtitle: textColor(color, 500),
						}}
						{...contentProps}
					/>
				</Container>
			</div>

			{/* TODO: Find a stable solution for this */}
			{!contentProps.uid?.includes('home') && (
				<div className='__bg absolute left-0 bottom-0 w-8 md:w-16 xl:w-24 h-24'>
					<div
						className={cn(
							'absolute inset-0 rounded-br-full',
							bgColor(color),
						)}
					/>
				</div>
			)}
		</Section>
	)
}

export { FeatureStatement }
