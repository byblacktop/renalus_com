import { cn } from '@/lib/utils'

const FieldError = ({ status, position = 'inline' }) => {
	const message =
		status?.message ||
		(typeof status === 'string' ? status : 'Required Field')

	if (typeof status === 'undefined') return <></>

	return (
		<div className='h6 __sm relative z-30 text-danger'>
			<div className={cn(position === 'inline' && 'absolute -top-2')}>
				<span
					className={cn(
						'px-1.5 py-px inline-block p__2xs font-bold',
						position === 'inline' &&
							'rounded-md bg-danger text-white',
					)}
				>
					{message}
				</span>
			</div>
		</div>
	)
}

export { FieldError }
