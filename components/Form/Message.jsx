import {
	CheckCircleIcon,
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

import { Shell } from '@/components/Compose'
import { Button } from '@/components/UI'
import { cn } from '@/lib/utils'

const defaultMessage = {
	success:
		'Thank you for reaching out! We will respond as soon as we gather info to serve you best.',
	error:
		'Sorry, we could not process your message, please try again soon.',
}

const FormMessage = ({ message, cta, type = 'success', close }) => {
	const bg = type === 'success' ? 'bg-success-50' : 'bg-danger-100'
	const color =
		type === 'success' ? 'text-success-600/90' : 'text-danger-700/90'
	const colorTitle =
		type === 'success' ? 'text-success-600' : 'text-danger-700'
	const title =
		type === 'success' ? 'Success' : 'Something went wrong'

	return (
		<div
			className={cn(
				'relative rounded-lg px-4 py-5 sm:p-6 flex gap-2 md:gap-4',
				bg,
				color,
			)}
		>
			<Shell
				as={
					type === 'success'
						? CheckCircleIcon
						: ExclamationTriangleIcon
				}
				className={cn('w-7 h-7 md:w-10 md:h-10', colorTitle)}
			/>
			<div className='flex flex-col gap-2 relative top-1.5 md:top-2.5'>
				<h6 className={colorTitle}>{title}</h6>
				<div className='sm:flex sm:items-start sm:justify-between'>
					<div className='max-w-xl'>
						<p className='__xs'>{message ?? defaultMessage[type]}</p>
					</div>

					{cta && (
						<div className='sm:flex-shrink-0 sm:flex sm:items-center'>
							<Button {...cta} />
						</div>
					)}
				</div>
			</div>

			{typeof close === 'function' && (
				<div
					className='absolute top-3 right-3 group cursor-pointer'
					onClick={close}
				>
					<XMarkIcon className='w-5 h-5 duration-200 ease-in-out text-black/40 group-hover:text-black/60' />
				</div>
			)}
		</div>
	)
}

export default FormMessage
