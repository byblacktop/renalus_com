import { SliceZone } from '@prismicio/react'
import {
	getSlices,
	SliceSimulator,
} from '@slicemachine/adapter-next/simulator'

import { components } from '@/slices/'

export default async function SliceSimulatorPage({ searchParams }) {
	const { state } = await searchParams
	const slices = getSlices(state)

	return (
		<SliceSimulator>
			<main className='overflow-y-visible'>
				<SliceZone slices={slices} components={components} />
			</main>
		</SliceSimulator>
	)
}

export const metadata = {
	robots: {
		index: false,
		follow: false,
	},
}
