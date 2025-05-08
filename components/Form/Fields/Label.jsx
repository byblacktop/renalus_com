import { cn } from '@/lib/utils'

const Label = ({ name, label, required, className }) => {
	return (
		<label htmlFor={name} className={cn('label __sm', className)}>
			{label}
			{required && <em className='text-danger-400'>*</em>}
		</label>
	)
}

export { Label }
