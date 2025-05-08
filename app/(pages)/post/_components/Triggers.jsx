'use client'

import { MicrophoneIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'

import { VideoTrigger } from '@/components/Media'
import { Flex, Info } from '@/components/UI'
import { invalidObjectData, validObjectData } from '@/lib/helpers'
import { podcastAtom, videoAtom } from '@/lib/store'
import { cn } from '@/lib/utils'

const TitleTrigger = ({ video, podcast }) => {
	const [podcastState, setPodcastState] = useAtom(podcastAtom)
	const [videoState, setVideoState] = useAtom(videoAtom)

	if ([video, podcast].every(invalidObjectData)) return

	const handleMedia = () => {
		if (video) setVideoState(video)
		else if (podcast) setPodcastState(podcast)
	}

	return (
		<button
			onClick={handleMedia}
			className={cn(
				'group cursor-pointer',
				[videoState, podcastState].some(validObjectData) &&
					'pointer-events-none',
			)}
		>
			<VideoTrigger
				className={{
					bg: 'size-20 bg-indigo shrink-0',
					icon: 'size-10 fill-white',
				}}
			/>
		</button>
	)
}

const MediaTriggers = ({ podcast, video }) => {
	const [podcastState, setPodcastState] = useAtom(podcastAtom)
	const [videoState, setVideoState] = useAtom(videoAtom)

	if ([podcast, video].every(invalidObjectData)) return

	const handlePodcast = () => {
		setPodcastState(podcast)
		setVideoState(null)
	}

	const handleVideo = () => {
		setVideoState(video)
		setPodcastState(null)
	}

	return (
		<Flex
			as='ul'
			items='center'
			className={cn(
				'bg-blue-100/10 backdrop-blur-sm',
				'rounded-full overflow-hidden',
				'p-2 md:p-3 -mt-12',
			)}
		>
			<li className='leading-none'>
				<button onClick={handlePodcast}>
					<Trigger icon={MicrophoneIcon} title='Listen Now' />
				</button>
			</li>
			<li className='leading-none'>/</li>
			<li className='leading-none'>
				<button onClick={handleVideo}>
					<Trigger icon={PlayIcon} title='Watch Video' />
				</button>
			</li>
		</Flex>
	)
}

const Trigger = ({ icon, title }) => (
	<Info
		as='h5'
		icon={icon}
		title={title}
		className={{
			info: cn(
				'*:text-blue cursor-pointer',
				'hover:*:text-blue-800 ',
			),
			icon: cn(
				'size-6 transition-all duration-300',
				'scale-100 fill-transparent',
				'group-hover:scale-120 group-hover:fill-current',
			),
		}}
	/>
)

export { TitleTrigger, MediaTriggers }
