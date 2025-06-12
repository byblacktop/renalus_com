import { ContentSplitProse } from '@/components/Content'
import { CoverImage } from '@/components/Media'
import { Overlay } from '@/components/UI'
import { bgColor, getTheme } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const HeroPoster = ({ img, color, className, ...contentProps }) => (
	<ContentSplitProse
		{...contentProps}
		color='indigo' // TODO: Refactor more appropriately... forcing indigo to trigger dark theme for inner content
		align='end'
		accent={true}
		linkPosition='after'
		className={{
			section: cn(
				className,
				bgColor(color),
				'rounded-b-4xl overflow-hidden',
				'h-[calc(max(92vh,1000px)-var(--h-banner)-48px)]',
				'-mb-8 [&+*]:pt-8',
			),
			container: 'h-full px-fluid-y place-content-end',
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
			className={cn(
				'rounded-3xl overflow-hidden',
				'inset-4 md:inset-6 2xl:inset-8',
				'top-[var(--h-header)]',
				'md:top-[var(--h-header)]',
				'2xl:top-[var(--h-header)]',
			)}
		>
			<Overlay gradient='smoke' />
		</CoverImage>
	</ContentSplitProse>
)

export { HeroPoster }
