import { Shell } from '@/components/Compose'
import { cn } from '@/lib/utils'

const Prompt = ({ label, as = 'h4', className }) => {
	if (!label) return <></>

	return (
		<Shell as={as} className={cn('col-span-2', className)}>
			{label}
		</Shell>
	)
}

export { Prompt }
