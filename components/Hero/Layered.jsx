import { Container, Section } from '@/components/Compose'
import { Prose } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Overlay, Spacer } from '@/components/UI'
import { bgColor, contrastUtil, getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const HeroLayered = ({
	img,
	color,
	accent,
	className,
	dataset,
	...contentProps
}) => {
	const { className: themeClass } = getTheme(color)

	return (
		<Section className={cn(themeClass, className)} dataset={dataset}>
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
						width='sm'
						className={{
							prose: '*:text-zinc-100',
							subtitle: '__label __brief text-indigo-200',
							body: 'max-w-md',
						}}
						linkProps={{
							variant: ['outline', 'stroke'],
							color: [contrastUtil(color)],
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
					className='left-1/4 rounded-4xl -right-[calc(var(--m-stretch)-var(--px))] overflow-hidden'
				>
					<Overlay direction='r' gradient='smoke' />
				</CoverImage>
			</Container>

			{/* Backdrop */}
			<div
				className={cn(
					'absolute inset-x-0 bottom-0 top-auto',
					'h-24 translate-y-0 rounded-t-4xl',
					bgColor(accent),
				)}
			/>
		</Section>
	)
}

export { HeroLayered }
