import { TagManager } from '@/components/TagManager'
import {
	FALLBACK_IMAGE,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from '@/lib/constants'
import { geist, nib } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import '@/styles/app.css'

export default async function RootLayout({ children }) {
	return (
		<html lang='en' className={cn(geist.variable, nib.variable)}>
			<body>
				{children}

				{/* Tools and helpers */}
				<TagManager />
			</body>
		</html>
	)
}

//// Metadata
// Head/Meta components are deprecated in Next 13.4+; now uses exported metadata object
// msapplication meta tags are no longer supported/needed
export const metadata = {
	// Config
	title: SITE_NAME,
	description: SITE_DESCRIPTION,
	metadataBase: new URL(SITE_URL),

	// Favicon
	manifest: '/site.webmanifest',

	// Social
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		image: FALLBACK_IMAGE,
	},
}
