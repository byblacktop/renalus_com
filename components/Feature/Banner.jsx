import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { Parallax } from '@/components/Interactive'
import { CoverImage } from '@/components/Media'
import { bgColor, colorUtil } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { Overlay } from '../UI'

const FeatureBanner = ({
	color,
	overlay,
	img,
	dataset,
	...contentProps
}) => (
	<Section
		className={cn(
			'pl-8 md:pl-16 2xl:pl-24',
			'pt-8 md:pt-16 2xl:pt-24',
		)}
		{...dataset}
	>
		<div
			className={cn(
				'absolute inset-0',
				'bottom-24 md:bottom-40 xl:bottom-60',
				bgColor(color, 700),
			)}
		/>

		<div
			className={cn(
				'relative overflow-hidden',
				'rounded-l-2xl', // Round Corner
				'text-white',
			)}
		>
			<Container
				width='sm'
				className='__lg relative z-2 flex flex-col md:grid md:grid-cols-8 px __white'
			>
				{/* Spacer */}
				<div className='col-span-8 aspect-w-16 aspect-h-3 2xl:aspect-h-4' />

				{/* Content */}
				<Prose
					{...contentProps}
					wrap={true}
					linkProps={{
						color: [colorUtil(color), 'ghost'],
						variant: 'solid',
						size: 'lg',
						arrow: {
							direction: 'right',
						},
					}}
					className={{
						prose: 'col-span-5 col-start-2 text-balance max-w-none',
						subtitle: 'text-slate-600 __xs',
						lead: 'max-w-none',
						title: 'd2',
						body: '__xl',
					}}
				/>

				{/* Spacer */}
				<div className='col-span-8 aspect-w-16 aspect-h-3 2xl:aspect-h-4' />
			</Container>

			<CoverImage
				img={img}
				plx={{ speed: -1 }}
				className={{ figure: 'z-1', target: '-bottom-[20%]' }}
			>
				<Overlay gradient='dark' direction='tr' />
			</CoverImage>
		</div>
	</Section>
)

export { FeatureBanner }
