import { Button } from '@/components/UI'
import { cn } from '@/lib/utils'

const NoResults = ({
	title = 'No Results Found',
	text = 'Back',
	link = '/',
	className,
	...btnProps
}) => {
	return (
		<div
			className={cn('text-center space-y-2 md:space-y-4', className)}
		>
			<h3>{title}</h3>
			<Button text={text} href={link} {...btnProps} />
		</div>
	)
}

export { NoResults }
