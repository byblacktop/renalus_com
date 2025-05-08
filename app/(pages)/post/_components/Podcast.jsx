'use client'

import { useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'

import { invalidObjectKeys } from '@/lib/helpers'
import { podcastAtom } from '@/lib/store'
import { cn } from '@/lib/utils'

const PodcastPlayer = () => {
	const [podcast, setPodcast] = useAtom(podcastAtom)
	const ref = useRef(null)

	const getEpisode = () => {
		const match = podcast.embed_url.match(/episode\/(.*?)\?/)
		return match ? match[1] : null
	}

	const handleSpotify = IFrameAPI => {
		// Player options
		const options = {
			uri: `spotify:episode:${getEpisode()}`,
			height: podcast.height,
		}

		// Play the episode when the controller is ready
		const callback = EmbedController => EmbedController.play()

		// Create a controller for the iframe
		IFrameAPI.createController(ref.current, options, callback)
	}

	useEffect(() => {
		if (invalidObjectKeys(podcast, 'embed_url')) return

		window.onSpotifyIframeApiReady = handleSpotify
	}, [podcast])

	if (invalidObjectKeys(podcast, 'embed_url')) return null

	return (
		<>
			<Transition show={!!podcast} appear={true}>
				<div
					layout='stack'
					items='center'
					justify='center'
					gap={0}
					className={cn(
						'fixed z-99 inset-x-2 bottom-2 overflow-hidden',
						'flex flex-col items-center justify-center',
						'transition-all duration-500 ease-in-out',
						'data-[closed]:opacity-0 data-[closed]:translate-y-full data-[closed]:scale-95',
						'data-[open]:opacity-100 data-[open]:translate-y-0 data-[open]:scale-100',
					)}
				>
					<button
						className={cn(
							'flex items-center gap-1.5',
							'bg-indigo *:text-white',
							'rounded-full overflow-hidden',
							'px-4 py-1.5  -mb-4',
						)}
						onClick={() => setPodcast(null)}
					>
						<XMarkIcon className='size-4' />{' '}
						<h6 className='__sm font-semibold'>Hide</h6>
					</button>

					<div
						ref={ref}
						id='spotify-frame'
						className='h-full w-full'
						style={{ height: `${podcast.height}px` }}
					/>
				</div>
			</Transition>
		</>
	)
}

export { PodcastPlayer }
