import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Overlay, Spacer } from '@/components/UI'
import { bgColor } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const HeroLayered = ({ img, color, className, ...contentProps }) => (
	<Section
		className={cn(bgColor(color), className)}
		data-theme='dark'
	>
		<Spacer size={1} split={true} />
		<Container className='pb-48'>
			{/* Content */}
			<div className='relative z-1 flex flex-col gap-4'>
				{/* Spacer */}
				<Spacer size={1} />

				{/* Content */}
				<Prose
					{...contentProps}
					as={{ subtitle: 'h6' }}
					className={{
						prose: '*:text-stone-50',
						subtitle: '__label text-indigo-200',
						body: 'max-w-md',
					}}
					linkProps={{
						variant: 'outline',
						color: ['notice', 'white'],
						arrow: [
							{
								direction: 'downRight',
							},
						],
					}}
				/>

				<Spacer size={1} />
			</div>

			{/* Image w/ Color Overlay */}
			<CoverImage
				priority
				img={img}
				className='left-1/4 -right-[calc(var(--m-stretch)-var(--px))] rounded-4xl overflow-hidden'
				style={{
					right: `calc(var(--m-stretch)-var(--px))`,
				}}
			>
				<Overlay direction='r' gradient='indigo' blend='multiply' />
			</CoverImage>
		</Container>

		{/* Backdrop */}
		<div className='absolute inset-x-0 bottom-0 top-auto h-24 translate-y-0 rounded-t-4xl bg-bg' />
	</Section>
)

export { HeroLayered }
