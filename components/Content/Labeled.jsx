import { Prose, Title } from '@/components/Content'
import { tw } from '@/lib/tw'
import { cn } from '@/lib/utils'

const Labeled = ({ title, subtitle, body, link, text, ...props }) => (
	<div className={cn('flex pb-fluid-x', tw.gap.prose)}>
		<Title title={subtitle} />
		<Prose
			title={title}
			subtitle={body}
			wrap={true}
			links={[{ link, text }]}
			{...props}
		/>
	</div>
)

export { Labeled }
