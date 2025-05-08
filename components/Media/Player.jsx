'use client'

import { useRef } from 'react'
import { Transition } from '@headlessui/react'
import { useAtomValue, useSetAtom } from 'jotai'

import { invalidObjectKeys } from '@/lib/helpers'
import { videoAtom } from '@/lib/store'
import { cn, cp } from '@/lib/utils'

const modifyVideo = video => {
	return video.html
		.replace('feature=oembed', 'feature=oembed&autoplay=1')
		.replace('width="200"', 'width="100%"')
		.replace('height="113"', 'height="100%"')
		.replace('></iframe>', ' class="w-full h-full"></iframe>')
}

const VideoProvider = ({ video, className, children }) => {
	const setVideo = useSetAtom(videoAtom)

	return (
		<div
			onClick={() => setVideo(video)}
			className={cn(
				'group relative cursor-pointer overflow-hidden',
				className,
			)}
		>
			{children}
			<VideoPlayer video={video} />
		</div>
	)
}

const VideoPlayer = () => {
	const ref = useRef()
	const player = useAtomValue(videoAtom)

	if (invalidObjectKeys(player, 'embed_url')) return

	return (
		<div className='absolute inset-0 overflow-hidden bg-indigo'>
			<Transition show={!!player} appear={true}>
				<div
					ref={ref}
					id='video-frame'
					className='absolute inset-0'
					dangerouslySetInnerHTML={{
						__html: modifyVideo(player),
					}}
				/>
			</Transition>
		</div>
	)
}

export { VideoPlayer, VideoProvider }
