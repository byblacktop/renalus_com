import { cva } from 'cva'

import { ContentSplitProse } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		size: {
			default: 'min-h-[72vh] md:min-h-[calc(72vh+(var(--py)*2))] pb',
			fullscreen: 'h-screen',
		},
	},

	defaultVariants: {
		size: 'default',
	},
})

const HeroLead = ({
	img,
	fullscreen,
	className,
	...contentProps
}) => {
	return (
		<ContentSplitProse
			align='end'
			linkPosition='after'
			accent={true}
			linkProps={{
				color: ['primary', 'light'],
				variant: ['solid', 'stroke'],
				// cta: [true],
				arrow: [
					null,
					{
						direction: 'downRight',
						loop: true,
					},
				],
			}}
			className={{
				section: className,
				lead: 'text-balance',
				title: 'd2',
			}}
			{...contentProps}
			color='indigo 700'
		>
			<article className='max-w-(--breakpoint-5xl) mx-auto px-fluid __sm'>
				<AspectImage
					img={img}
					className='rounded-3xl overflow-hidden'
					priority
				/>
			</article>
		</ContentSplitProse>
	)
}

export { HeroLead }
