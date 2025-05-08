import { AspectImage, VideoProvider } from '@/components/Media'
import { invalidObjectData } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'
import PlayIcon from '@/public/icons/play.svg'

const Video = ({ video, img }) => {
	if (invalidObjectData(video)) return

	return (
		<VideoProvider video={video} className='rounded-2xl'>
			<AspectImage
				img={img}
				className={{
					figure: 'aspect-video',
				}}
			>
				<VideoTrigger className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
			</AspectImage>
		</VideoProvider>
	)
}

const VideoTrigger = ({ className, ...props }) => {
	return (
		<div
			className={cn(
				'size-24 rounded-full',
				'flex items-center justify-center',
				'bg-gray-50 scale-100 group-hover:scale-105 duration-400',
				cp(className, 'bg', true),
			)}
			{...props}
		>
			<PlayIcon
				className={cn(
					'size-10 text-gold translate-x-1',
					'scale-100 group-hover:scale-110 duration-400',
					cp(className, 'icon'),
				)}
			/>
		</div>
	)
}

export { Video, VideoTrigger }
