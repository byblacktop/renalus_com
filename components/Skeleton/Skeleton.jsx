import { cn } from '@/lib/utils'

const Skeleton = ({ children, className, show = true }) => {
	return <span className={cn('skeleton', className)}>{children}</span>
}

export { Skeleton }
