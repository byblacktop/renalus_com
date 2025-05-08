import { SliceZone } from '@prismicio/react'

import { getMeta, getSlices } from '@/lib/api'
import { components } from '@/slices/index'

const Home = async () => {
	const slices = await getSlices('home')

	// TODO: Implement slice data modification
	// const blurs = await getImageBlurs(slices)
	return (
		<SliceZone
			slices={slices}
			components={components}
			context={{ uid: 'home' }}
		/>
	)
}

export const generateMetadata = async () =>
	await getMeta({ uid: 'home' })

export default Home
