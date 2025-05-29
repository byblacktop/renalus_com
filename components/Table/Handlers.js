'use client'

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { download, generateCsv, mkConfig } from 'export-to-csv'

const csvConfig = mkConfig({
	useKeysAsHeaders: true,
	filename: 'Inquiries — Renalus Center for Kidney Care',
})

const Handlers = ({ data }) => {
	const handleDownload = () => {
		const csv = generateCsv(csvConfig)(data)

		download(csvConfig)(csv)
	}

	return (
		<div>
			<button
				className='btn btn-2xs btn-trigger'
				onClick={handleDownload}
			>
				<ArrowDownTrayIcon className='size-4' />
				<span>Download Data</span>
			</button>
		</div>
	)
}

export { Handlers }
