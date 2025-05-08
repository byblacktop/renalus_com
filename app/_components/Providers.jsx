'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import {
	createStore,
	Provider as StoreProvider,
	useSetAtom,
} from 'jotai'

import { useHash } from '@/lib/hooks/useHash'
import { useWatchToolbar } from '@/lib/hooks/useLayout'
import {
	getHashAnchor,
	normalizeDocs,
	safeCatchArray,
} from '@/lib/helpers'
import { locationsAtom, podcastAtom, videoAtom } from '@/lib/store'
import { createClient } from '@/prismicio'

const store = createStore()

const Providers = ({ children }) => {
	// TODO: Enable for staging previews
	useWatchToolbar()

	return (
		<StoreProvider store={store}>
			<Globals>{children}</Globals>

			<Script src='https://open.spotify.com/embed/iframe-api/v1' />
		</StoreProvider>
	)
}

// TODO: Evaluate if necessary
const Globals = ({ children }) => {
	const path = usePathname()
	const client = createClient()
	const setLocations = useSetAtom(locationsAtom)
	const setVideo = useSetAtom(videoAtom)
	const setPodcast = useSetAtom(podcastAtom)

	try {
		client
			.getAllByType('location', {
				fetch: [
					'location.title',
					'location.address',
					'location.phone',
					'location.hours',
					'location.imgs',
				],
			})
			.then(normalizeDocs)
			.then(data => {
				setLocations(data)
			})
	} catch (error) {
		console.warning(error)
	}

	const hash = useHash()

	useEffect(() => {
		setTimeout(() => {
			const anchor = getHashAnchor(hash)
			if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
		}, 500)
	}, [hash])

	useEffect(() => {
		setVideo(null)
		setPodcast(null)
	}, [path])

	return <>{children}</>
}

export { Providers }
