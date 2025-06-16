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
				'bg-zinc-50',
				'group-hover:text-white',
				'group-hover:bg-indigo',
				'transition rotate-0 group-hover:rotate-180',
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
