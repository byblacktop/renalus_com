import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Prose, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Divider } from '@/components/UI'
import { contrastUtil, getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		size: {
			Default: 'md:min-h-[60vh] xl:min-h-[70vh]',
			'X Small': 'md:min-h-[40vh] xl:min-h-[50vh]',
			Small: 'md:min-h-[50vh] xl:min-h-[60vh]',
			Large: 'md:min-h-[75vh] xl:min-h-[85vh]',
			Fullscreen: 'md:min-h-[calc(100vh-3rem)]',
		},
	},
})

const HeroSplit = ({
	subtitle,
	img,
	color,
	size,
	className,
	dataset,
	...contentProps
}) => {
	const { bg, accent, className: themeClass } = getTheme(color)

	return (
		<Section
			className={cn(
				'grid grid-cols-1 md:grid-cols-2 max-md:content-start',
				'rounded-b-4xl overflow-hidden',
				variants({ size }),
				themeClass,
				'bg-bg',
				className,
			)}
			{...dataset}
			data-theme='light'
		>
			<Container
				layout='grid'
				cols={1}
				gap='sm'
				className='max-w-2xl max-md:pt-12 max-md:pb-0'
			>
				<Title title={subtitle} className={cn(accent, 'w-full')} />

				<Prose
					{...contentProps}
					gap={{ prose: 'xs' }}
					className={{
						prose: 'content-start',
						title: 'h2',
						links: 'mt-4 lg:mt-6',
					}}
					linkProps={{
						variant: 'outline',
						color: [contrastUtil(color)],
						arrow: [
							{
								direction: 'downRight',
							},
						],
					}}
				/>
			</Container>

			<div className='relative z-1 grid grid-cols-2 items-end'>
				<CoverImage
					priority
					img={img}
					className={{
						figure: 'inset-16 top-8 md:left-0',
						img: 'rounded-3xl overflow-hidden',
					}}
				/>

				{/* Empty div to control the min-height */}
				<div className='h-0 aspect-w-8 aspect-h-10' />
			</div>

			<div
				className={cn(
					'rounded-4xl overflow-hidden',
					'absolute z-0 inset-4 md:inset-6 2xl:inset-8',
					'top-[var(--h-header)]',
					'md:top-[var(--h-header)]',
					'2xl:top-[var(--h-header)]',
					bg,
				)}
			/>

			{/* <Divider
				color='Steel 100'
				size='full'
				position='center'
				className='z-10 h-px max-w-8xl'
			/> */}
		</Section>
	)
}

export { HeroSplit }
