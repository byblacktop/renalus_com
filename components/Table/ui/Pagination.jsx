import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react'
import {
	ArrowLeftEndOnRectangleIcon,
	ArrowRightEndOnRectangleIcon,
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { cva } from 'cva'

import { Shell } from '@/components/Compose'
import { Button } from '@/components/UI'
import { cn } from '@/lib/utils'

const variants = cva('', {
	variants: {
		layout: {
			button: 'btn btn-util',
			options:
				'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none ',
			option: 'relative cursor-default select-none py-1 pl-7 pr-2',
		},

		active: {
			true: 'bg-amber-100 text-amber-900',
			false: 'text-zinc-900',
		},
	},
})

const DataTablePagination = ({ table }) => {
	return (
		<div className='table-data--pagination flex items-center justify-end gap-2 border-t p-2 text-xs text-muted-foreground'>
			{/* Selected */}
			{table.getIsSomeRowsSelected() && (
				<div className='mr-auto'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			)}

			{/* Page Options */}
			<div className='flex items-center gap-4 lg:gap-6'>
				{/* Rows Selector */}
				<div className='flex items-center gap-2'>
					<span>Rows per page</span>

					{/* Select Options */}
					<Listbox
						as='div'
						value={`${table.getState().pagination.pageSize}`}
						onChange={value => {
							table.setPageSize(Number(value))
						}}
						className='relative'
					>
						<ListboxButton className={cn('btn-trigger w-16 h-7')}>
							<span>{table.getState().pagination.pageSize}</span>
						</ListboxButton>
						<ListboxOptions
							portal={false}
							modal={false}
							className={variants({ layout: 'options' })}
						>
							{[5, 10, 20, 30, 40, 50].map(value => (
								<Option key={value} value={`${value}`} />
							))}
						</ListboxOptions>
					</Listbox>
				</div>

				{/* Current Page */}
				<div className='flex items-center justify-center '>
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</div>

				{/* Nav Arrows */}
				<DataTableNav table={table} />
			</div>
		</div>
	)
}

const DataTableNav = ({ table }) => (
	<div className='flex items-center'>
		{/* First */}
		<Button
			as='button'
			size='xs'
			variant='flat'
			color='gray'
			onClick={() => table.setPageIndex(0)}
			disabled={!table.getCanPreviousPage()}
		>
			<span className='sr-only'>Go to first page</span>
			<ArrowLeftEndOnRectangleIcon className='size-5' />
		</Button>

		{/* Prev */}
		<Button
			as='button'
			size='xs'
			variant='flat'
			color='gray'
			onClick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			<span className='sr-only'>Go to previous page</span>
			<ChevronLeftIcon className='size-5' />
		</Button>

		{/* Next */}
		<Button
			as='button'
			size='xs'
			variant='flat'
			color='gray'
			onClick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			<span className='sr-only'>Go to next page</span>
			<ChevronRightIcon className='size-5' />
		</Button>

		{/* Last */}
		<Button
			as='button'
			size='xs'
			variant='flat'
			color='gray'
			onClick={() => table.setPageIndex(table.getPageCount() - 1)}
			disabled={!table.getCanNextPage()}
		>
			<span className='sr-only'>Go to last page</span>
			<ArrowRightEndOnRectangleIcon className='size-5' />
		</Button>
	</div>
)

const Option = ({ value }) => {
	return (
		<ListboxOption
			value={value}
			className={cn(
				variants({ layout: 'option' }),
				'text-zinc-900',
				'data-[focus]:bg-slate-100/30 data-[focus]:text-slate-900',
				'cursor-pointer',
			)}
		>
			{({ selected }) => (
				<>
					<span
						className={cn('block truncate', selected && 'font-bold')}
					>
						{value}
					</span>

					<Shell
						as='span'
						render={selected}
						className='absolute inset-y-0 left-0 flex items-center pl-1.5 text-slate-600'
					>
						<CheckIcon className='h-4 w-4' aria-hidden='true' />
					</Shell>
				</>
			)}
		</ListboxOption>
	)
}

export { DataTablePagination }
