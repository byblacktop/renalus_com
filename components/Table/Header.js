import { Handlers } from '@/components/Table'
import { debounce } from '@/lib/helpers'

const DataHeader = ({ data, handleFilter, table }) => {
	return (
		<div className='flex gap-2'>
			<Handlers data={data} table={table} />

			<input
				name='s'
				placeholder='Search Terms'
				onChange={debounce(e => handleFilter(e.target.value), 150)}
			/>
		</div>
	)
}

export { DataHeader }
