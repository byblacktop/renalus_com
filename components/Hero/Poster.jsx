import { ContentSplitProse } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { getBackdrop, Overlay } from '@/components/UI'
import { bgColor, getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const HeroPoster = ({ img, color, className, ...contentProps }) => (
	<ContentSplitProse
		{...contentProps}
		color='indigo' // TODO: Refactor more appropriately... forcing indigo to trigger dark theme for inner content
		group='Body'
		align='end'
		accent={true}
		linkPosition='after'
		className={{
			section: cn(
				className,
				bgColor(color),
				'rounded-b-5xl overflow-hidden',
				'h-[calc(max(92vh,1000px)-var(--h-banner)-48px)]',
				'-mb-10 [&+*]:pt-10',
			),
			container: 'h-full px-fluid-y py-fluid-x place-content-end',
			title: 'd2',
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
	>
		<CoverImage
			img={img}
			priority
			className={{
				figure: cn(
					getBackdrop('cover'),
					'top-[var(--h-header)]',
					'md:top-[var(--h-header)]',
					'2xl:top-[var(--h-header)]',
				),
				img: cn(
					// 'object-[50%_88%]',
					'object-bottom',
				),
			}}
		>
			<Overlay gradient='smoke' />
		</CoverImage>
	</ContentSplitProse>
)

export { HeroPoster }
