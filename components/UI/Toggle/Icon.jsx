import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { bgColor, colorShift } from '@/helpers/colors'

const ToggleIcon = ({ open, color }) => (
	<div className='flex justify-end'>
		<div
			className={cn(
				'size-6',
				'md:size-7',
				'xl:size-8',
				'flex items-center justify-center rounded-full',
				'duration-400 bg-slate-100',
				// 'group-hover:text-white',
				// colorShift(bgColor(color), -2, 'bg'),
				// colorShift(bgColor(color), -3, 'group-hover:bg'),
			)}
		>
			{/* Icons */}
			{open ? (
				<MinusIcon className='size-3.5 md:size-4.5' />
			) : (
				<PlusIcon className='size-3.5 md:size-4.5' />
			)}
		</div>
	</div>
)

export { ToggleIcon }
