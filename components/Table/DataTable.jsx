'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/UI/Table'
import { Shell } from '@/components/Compose'
import { TableSkeleton } from '@/components/Skeleton'
import { Handlers } from '@/components/Table'
import { getDataCols } from '@/components/Table/helpers'
import {
	DataTableColumnHeader,
	DataTableColumnLabel,
	DataTablePagination,
} from '@/components/Table/ui'
import { invalidObjectKeyValue } from '@/lib/helpers'

const defaultConfig = {
	actions: false,
	selectable: false,
	sortable: true,
}

const useCols = (columns = [], config = {}) => {
	if (columns?.length < 1) return []

	// Setup column config
	config = {
		...defaultConfig,
		...config,
	}

	return getDataCols(columns)
		.filter(c => invalidObjectKeyValue(c, 'hidden', true))
		.map(col => ({
			...col,
			header:
				col.header ??
				(config.sortable && col.enableSorting !== false
					? DataTableColumnHeader
					: DataTableColumnLabel),
		}))
}

// TODO: see if we still need this
const hiddenCols = cols =>
	cols.reduce(
		(acc, curr) =>
			curr.hidden
				? { ...acc, [curr.accessorKey ?? curr.id]: false }
				: acc,
		{},
	)

const DataTable = ({
	data = [],
	cols = [],
	scope,
	pagination,
	toolbar = true,
	rowClick = false,
	isLoading = false,
	...props
}) => {
	const [sorting, setSorting] = useState([])
	const [rowSelection, setRowSelection] = useState({})
	const [columnFilters, setColumnFilters] = useState([])
	const [columnVisibility, setColumnVisibility] = useState({})

	const columns = useCols(cols, props)

	const table = useReactTable({
		// Core data
		data,
		columns,

		// Get plugins
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),

		// Events handlers
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,

		// Options
		enableRowSelection: props.selectable,
		//// TODO: See if resizing is helpful
		// columnResizeMode: 'onChange',

		// State vars
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	// Row Click
	const { push } = useRouter()
	const handleClick = e => {
		if (!e.currentTarget.dataset.link) return

		push(e.currentTarget.dataset.link)
	}

	if (columns.length < 1) return <></>

	return (
		<div>
			{/* {!!toolbar && <DataTableToolbar table={table} />} */}
			<Handlers data={data} table={table} />

			<Table>
				{/* Header */}

				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>

				{/* Body */}
				<TableBody>
					<Shell
						colSpan={columns.length}
						as={
							//// TODO: Make sure we don't need this instead
							//// Might need if on a page that doesn't have active data
							// table.getRowModel().rows?.length < 1 && DataResultsEmpty
							isLoading
								? DataResultsLoading
								: data.length < 1 && DataResultsEmpty
						}
					>
						{/* Rows */}
						{table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								onClick={rowClick ? handleClick : undefined}
								data-link={
									rowClick
										? `/${scope}/${row.original.id}`
										: undefined
								}
								data-state={row.getIsSelected() && 'selected'}
							>
								{/* Cell */}
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className={cell.column.columnDef.className}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</Shell>
				</TableBody>
			</Table>

			{data.length > 0 && pagination !== false && (
				<DataTablePagination table={table} />
			)}
		</div>
	)
}

const DataResultsLoading = ({ colSpan }) => (
	<TableRow>
		<TableCell colSpan={colSpan}>
			<TableSkeleton />
		</TableCell>
	</TableRow>
)

const DataResultsEmpty = ({ colSpan }) => (
	<TableRow>
		<TableCell colSpan={colSpan} className='h-24 text-center'>
			No results.
		</TableCell>
	</TableRow>
)

export { DataTable }
