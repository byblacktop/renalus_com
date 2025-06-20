// import { headers } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { PrismicPreview } from '@prismicio/next'
import { Analytics } from '@vercel/analytics/react'
import { VercelToolbar } from '@vercel/toolbar/next'

import { repositoryName } from '@/prismicio'

// Ref: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-tag-manager
// TODO: Setup tag manager
const GOOGLE_TAG_MANAGER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID

const TagManager = () => {
	// TODO: Remove when no longer in development
	// if (process.env.NODE_ENV === 'development') return

	// TODO: Add when no longer in development
	// const isStaging = process.env.NODE_ENV === 'staging'
	const isStaging = false

	// const referer = headers().get('referer')
	// const showToolbar = !referer?.includes(
	// 	process.env.NEXT_PUBLIC_SITE_URL,
	// )
	// TODO: Figure out why above doesn't work
	// const showToolbar = true

	return (
		<>
			{/* Prismic Toolbar */}
			<PrismicPreview repositoryName={repositoryName} />
			{/* Google — TagManager */}
			{/* TODO: Implement */}
			{/* <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} /> */}
			{/* Vercel — Analytics & Toolbar */}
			{/* <Analytics /> */}
			{/* {isStaging && <VercelToolbar />} */}
		</>
	)
}

export { TagManager }
