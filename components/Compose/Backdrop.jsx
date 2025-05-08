import { slugify } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const Backdrop = ({ color, offset, className }) => {
	if (!color) return

	return (
		<div
			className={cn(
				'absolute inset-0 pointer-events-none -z-1',
				'w-[var(--w-stretch)-2rem]',
				'2xl:w-[var(--w-stretch)]',
				'max-2xl:left-8',
				color && `bg-${slugify(color)}`,
				offset === 'right' && 'left-auto',
				className,
			)}
		/>
	)
}

export { Backdrop }
