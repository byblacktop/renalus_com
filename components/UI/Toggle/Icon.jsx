import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { cva } from 'cva'

import { getTheme } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		theme: {
			light: cn(
				'bg-zinc-50',
				'group-hover:text-white',
				'group-hover:bg-indigo',
			),
			dark: cn(
				'bg-slate-800/50',
				'group-hover:text-white',
				'group-hover:bg-slate-800',
			),
		},
	},

	defaultVariants: {
		theme: 'light',
	},
})

const ToggleIcon = ({ open, color }) => (
	<div className='flex justify-end'>
		<div
			className={cn(
				'size-6',
				'md:size-7',
				'xl:size-8',
				'flex items-center justify-center rounded-full',
				'transition rotate-0 group-hover:rotate-180',
				variants({ theme: getTheme(color).scheme }),
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
