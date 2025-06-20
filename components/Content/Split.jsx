import { Container, Section } from '@/components/Compose'
import { Body, Prose, Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { bgColor, getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const ContentSplit = ({
	// title,
	// subtitle,
	// body,
	img,
	position,
	flow,
	color,
	dataset,
	...contentProps
}) => (
	<Section
		className={cn('__content __split', getTheme(color).className)}
		{...dataset}
	>
		<Container layout='grid' cols={12} gap='xl'>
			<div
				className={cn(
					'z-20 col-span-12 md:col-span-6',
					// 'grid grid-cols-3',
					// 'sm:gap-8 lg:gap-12',
					// 'items-start',
					// 'space-y-6 sm:space-y-0',
					position === 'Right' && 'sm:order-2',
				)}
			>
				<Prose {...contentProps} />
				{/* <Title title={title} className='col-span-3' /> */}
				{/* 
				<Title
					title={subtitle}
					as='h4'
					className='max-lg:col-span-3'
				/>
				<Body body={body} className='max-lg:col-span-3 col-span-2' /> */}
			</div>

			<div className='col-span-6 max-md:hidden'>
				<AspectImage
					img={img}
					w={3}
					h={4}
					className={{
						figure: cn(
							'z-20 mt-10 md:-mt-32 xl:-mt-48 overflow-hidden',
							'rounded-2xl', // Flat side
						),
					}}
				/>
			</div>

			{/* Separator */}
			{/* <div
				className={cn(
					'col-span-12 h-px order-3',
					// getTheme(color).isDark ? 'bg-white/15' : 'bg-black/15',
				)}
			/> */}
		</Container>
	</Section>
)

export { ContentSplit }
