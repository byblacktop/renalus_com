import { SliceZone } from '@prismicio/react'

import { getMeta, getSlices, getStaticParams } from '@/lib/api'
import { components } from '@/slices/index'

const Page = async ({ params, searchParams }) => {
	const { uid } = await params
	const search = await searchParams
	const slices = await getSlices(uid, 'page')

	return (
		<SliceZone
			slices={slices}
			components={components}
			context={{ searchParams: search, uid }}
		/>
	)
}

// TODO: Test duplicating exact query instead of only uid for params and {data} for metadata
export const generateStaticParams = async () =>
	await getStaticParams()

export const generateMetadata = async ({ params }) =>
	await getMeta(params)

export default Page
