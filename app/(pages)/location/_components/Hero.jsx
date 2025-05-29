import { Container, Section } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Overlay, Spacer } from '@/components/UI'
import { cn } from '@/lib/utils'

const Hero = ({ img, children, ...contentProps }) => (
	<Section className='__hero bg-indigo' data-theme='dark'>
		<Spacer size={1} split={true} />
		<Container
			layout='block'
			className={cn(
				'pb-fluid-x max-w-[min(96vw,var(--breakpoint-2xl))]',
				'rounded-4xl overflow-hidden',
			)}
		>
			{/* Content */}
			<div className='relative z-1 flex flex-col gap-4 justify-end'>
				{/* Spacer */}
				<Spacer size={6} />

				{/* Location Title */}
				<Lead
					{...contentProps}
					as={{ subtitle: 'h6' }}
					className={{
						lead: '*:text-stone-50',
						subtitle: '__label',
					}}
				/>

				{/* Content */}
				{children}
			</div>

			{/* Image w/ Color Overlay */}
			<CoverImage priority img={img}>
				<Overlay gradient='indigo' blend='multiply' />
			</CoverImage>
		</Container>

		{/* Backdrop */}
		<div className='absolute inset-x-0 bottom-0 top-auto h-[calc(10%+32px)] rounded-t-4xl bg-bg' />
	</Section>
)

export { Hero }
