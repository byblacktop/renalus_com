import { ContentSplitProse } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { cn } from '@/lib/utils'

const HeroHighlight = ({
	img,
	fullscreen,
	className,
	...contentProps
}) => {
	return (
		<ContentSplitProse
			align='end'
			accent={true}
			linkPosition='after'
			linkProps={{
				variant: ['outline', 'stroke'],
				arrow: [
					{
						direction: 'downRight',
						loop: true,
					},
				],
			}}
			className={{
				section: className,
				container: 'pb-4 md:pb-6 xl:pb-8',
				title: 'd2',
			}}
			{...contentProps}
		>
			<article className='mx-auto px-fluid __sm'>
				<AspectImage
					img={img}
					h={8}
					className='rounded-3xl rounded-bl-11xl overflow-hidden'
					priority
				/>
			</article>
		</ContentSplitProse>
	)
}

export { HeroHighlight }
