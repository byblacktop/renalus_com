import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react'
import {
	ArrowDownIcon,
	ArrowsUpDownIcon,
	ArrowUpIcon,
	EyeSlashIcon,
} from '@heroicons/react/24/outline'

import { Shell } from '@/components/Compose'
import { getLabel } from '@/components/Table/helpers'
import { cn } from '@/lib/utils'

const DataTableColumnHeader = props => (
	<Shell
		{...props}
		as={
			props.column.getCanSort()
				? DataTableColumnSortable
				: DataTableColumnLabel
		}
	/>
)

const DataTableColumnLabel = ({ column, label }) => (
	<span className='btn btn-util btn-sm'>
		{getLabel(column, label)}
	</span>
)

const DataTableColumnSortable = ({ column, label }) => {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			{/* Trigger */}
			<MenuButton className='btn btn-util btn-sm whitespace-nowrap'>
				<>
					<span>{getLabel(column, label)}</span>

					<Shell
						as={
							{
								DEFAULT: ArrowsUpDownIcon,
								desc: ArrowDownIcon,
								asc: ArrowUpIcon,
							}[column.getIsSorted() || 'DEFAULT']
						}
						className={cn(
							'size-4',
							!column.getIsSorted() &&
								'opacity-0 group-hover:opacity-100',
						)}
					/>
				</>
			</MenuButton>

			{/* Options */}
			<MenuItems className='absolute left-0 flex flex-col items-start gap-1 py-2 px-3 mt-0.5 w-24 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg focus:outline-none'>
				{/* Asc */}
				<MenuItem
					as='button'
					onClick={() => column.toggleSorting(false)}
					className='btn btn-util btn-sm'
				>
					<ArrowUpIcon className='size-3.5 text-zinc-400' />
					<span>Asc</span>
				</MenuItem>

				{/* Desc */}
				<Menu.Item
					as='button'
					onClick={() => column.toggleSorting(true)}
					className='btn btn-util btn-sm'
				>
					<ArrowDownIcon className='size-3.5 text-zinc-400' />
					<span>Desc</span>
				</Menu.Item>

				{/* Off */}
				<MenuItem
					as='button'
					onClick={() => column.toggleVisibility(false)}
					className='btn btn-util btn-sm'
				>
					<EyeSlashIcon className='size-3.5 text-zinc-400' />
					<span>Hide</span>
				</MenuItem>
			</MenuItems>
		</Menu>
	)
}

export {
	DataTableColumnHeader,
	DataTableColumnLabel,
	DataTableColumnSortable,
}
