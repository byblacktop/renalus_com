'use client'

import { useRef } from 'react'
import { Transition } from '@headlessui/react'
import { useAtom, useSetAtom } from 'jotai'

import { AspectImage } from '@/components/Media'
import { invalidObjectData, invalidObjectKeys } from '@/lib/helpers'
import { videoAtom } from '@/lib/store'

const modifyVideo = video => {
	return video.html
		.replace('feature=oembed', 'feature=oembed&autoplay=1')
		.replace('width="200"', 'width="100%"')
		.replace('height="113"', 'height="100%"')
		.replace('></iframe>', ' class="w-full h-full"></iframe>')
}

const Video = ({ video, img }) => {
	const setVideo = useSetAtom(videoAtom)

	if (invalidObjectData(video)) return

	return (
		<AspectImage
			img={img}
			priority
			className={'rounded-4xl overflow-hidden'}
			onClick={() => setVideo(video)}
		>
			<VideoPlayer />
		</AspectImage>
	)
}

const VideoPlayer = () => {
	const ref = useRef()
	const [player, setPlayer] = useAtom(videoAtom)

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

export { Video }
