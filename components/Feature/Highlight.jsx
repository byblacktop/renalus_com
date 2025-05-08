import { cva } from 'cva'

import { Section } from '@/components/Compose'
import { Prose, Title } from '@/components/Content'
import { AspectImage, CoverImage } from '@/components/Media'
import { getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		prose: {
			Left: cn(
				'col-span-12',
				'md:col-span-7',
				'lg:col-span-6',
				'2xl:col-span-4 2xl:col-start-2',
				'3xl:col-span-3 3xl:col-start-2',
			),
			Right: cn(
				'col-start-1',
				'lg:col-start-8',
				'2xl:col-start-7',
				'col-end-12',
				'2xl:col-end-11',
			),
		},

		quote: {
			Left: cn(
				'col-start-1 col-end-10',
				'lg:col-start-3',
				'2xl:col-start-4',
			),
			Right: cn(
				'col-start-4 col-end-13',
				'lg:col-start-5',
				'lg:col-end-13',
				'xl:col-end-12',
				'2xl:col-end-11',
			),
		},

		accent: {
			Left: cn(
				'col-start-3 col-end-13',
				'lg:col-start-1 lg:col-end-7',
				'max-lg:rounded-bl-6 lg:rounded-tr-8',
			),
			Right: cn(
				'col-start-1 col-end-11',
				'lg:col-start-7 lg:col-end-13',
				'max-lg:rounded-tr-6 lg:rounded-bl-8',
			),
		},

		bg: {
			Left: 'left-auto rounded-bl-16',
			Right: 'right-auto rounded-tr-16',
		},

		cover: {
			Left: 'bg-gradient-to-tr',
			Right: 'bg-gradient-to-tl',
		},

		highlight: {
			Indigo: 'bg-gradient-to-b from-yellow-200  to-green-300',
			Blue: 'bg-gradient-to-b from-yellow-200 to-blue-300',
			Yellow: 'bg-gradient-to-b from-green-200  to-yellow-50',
			Green: 'bg-gradient-to-b from-yellow-100  to-green-200',
			Yellow: 'bg-gradient-to-b from-yellow-100  to-green-200',
		},
	},
})

const FeatureHighlight = ({
	caption,
	img,
	accent,
	color,
	position,
	dataset,
	...contentProps
}) => {
	return (
		<Section className={cn(getTheme(color).className)} {...dataset}>
			{/* Gradient Backdrop */}

			<article
				className={cn(
					'relative z-10 pxy grid grid-cols-12 grid-flow-col-dense',
					'place-items-center',
					'gap-8 2xl:gap-y-24',
				)}
			>
				{/* Top title + subtitle */}
				<Prose
					className={variants({ prose: position })}
					{...contentProps}
				/>

				{/* Centered Quote */}
				<Title
					title={caption}
					className={cn(
						'd2 relative z-20',
						'row-start-2 row-end-3',
						variants({ quote: position }),
					)}
				/>

				{/* Center Accent Image */}
				<div
					className={cn(
						'relative',
						'w-full max-w-sm 2xl:max-w-md mx-auto',
						'row-start-2 row-end-3',
						'max-lg:rounded-2xl rounded-2xl overflow-hidden',
						variants({ accent: position }),
					)}
				>
					<AspectImage
						img={accent}
						w={13}
						h={16}
						className={{
							figure: cn(
								'md:aspect-w-3 md:aspect-h-4 z-1',
								variants({ highlight: color }),
							),
							img: cn(
								'brightness-115',
								'opacity-30',
								'mix-blend-luminosity',
							),
						}}
					/>
				</div>
			</article>

			{/* Background Image */}
			<div
				className={cn(
					'absolute inset-3 w-[48%]',
					'max-lg:rounded-2xl rounded-2xl overflow-hidden',
					variants({ bg: position }),
				)}
			>
				<CoverImage img={img} className='max-lg:hidden'>
					<div
						className={cn(
							'absolute z-2 inset-0',
							color &&
								getTheme(color).isDark &&
								'from-indigo-900 via-indigo-900/30 to-transparent opacity-80',
							!getTheme(color).isDark &&
								'from-yellow-200 via-green-300/50 to-transparent',
							variants({ cover: position }),
						)}
					/>
				</CoverImage>
			</div>
		</Section>
	)
}

export { FeatureHighlight }
