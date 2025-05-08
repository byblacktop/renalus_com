import { Shell } from '@/components/Compose'
import { cn, cp } from '@/lib/utils'

const Cover = ({ className, ...props }) => (
	<Shell
		className={cn(
			'__cover',
			'absolute inset-0 overflow-hidden',
			cp(className, 'cover', true),
		)}
		{...props}
	/>
)

export { Cover }
