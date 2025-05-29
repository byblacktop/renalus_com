import * as React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef(({ className, ...props }, ref) => (
	<div className='table-data __xs'>
		<div className='table-data--container'>
			<table
				ref={ref}
				className={cn('table-data--table', className)}
				{...props}
			/>
		</div>
	</div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef(
	({ className, ...props }, ref) => (
		<thead
			ref={ref}
			className={cn('table-data--header', className)}
			{...props}
		/>
	),
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={cn('table-data--body __2xs p', className)}
		{...props}
	/>
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={cn('table-data--footer', className)}
			{...props}
		/>
	),
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn('table-data--row', className)}
		{...props}
	/>
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn('table-data--head', className)}
		{...props}
	/>
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('table-data--cell', className)}
		{...props}
	/>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef(
	({ className, ...props }, ref) => (
		<caption
			ref={ref}
			className={cn('table-data--caption', className)}
			{...props}
		/>
	),
)
TableCaption.displayName = 'TableCaption'

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
}
