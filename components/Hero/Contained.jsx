import { cva } from 'cva'

import { Container, Section } from '@/components/Compose'
import { Prose, Title } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Flex } from '@/components/UI'
import { contrastUtil, getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		size: {
			Default: 'aspect-h-7',
			'X Small': 'aspect-h-5',
			Small: 'aspect-h-6',
			Large: 'aspect-h-8',
			'X Large': 'aspect-h-9',
		},
	},
})

const HeroContained = ({
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
				'rounded-b-4xl overflow-hidden',
				themeClass,

				className,
			)}
			{...dataset}
		>
			<Container
				layout='grid'
				cols={2}
				gap='2xl'
				className={cn(
					'__xs',
					// TODO: Import variable too replace hardcoded "Stone 50"
					['None', 'Stone 50'].includes(color) &&
						'border-b border-steel-200',
				)}
			>
				<Flex layout='stack' justify='between'>
					<Title title={subtitle} className={cn(accent, 'w-full')} />

					<Prose
						{...contentProps}
						gap={{ prose: 'xs' }}
						className={{
							prose: 'content-start',
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
				</Flex>

				<div className='relative z-1'>
					<CoverImage
						priority
						img={img}
						className={{
							img: 'rounded-3xl overflow-hidden',
						}}
					/>

					{/* Empty div to control the min-height */}
					<div className={cn('h-0 aspect-w-8', variants({ size }))} />
				</div>
			</Container>
		</Section>
	)
}

export { HeroContained }
