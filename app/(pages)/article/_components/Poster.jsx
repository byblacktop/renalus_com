import { AspectImage } from '@/components/Media'
import { validObjectData } from '@/lib/helpers'
import { Video } from './Video'

const Poster = ({ img, video }) => {
	if (validObjectData(video)) return <Video img={img} video={video} />

	return (
		<AspectImage
			img={img}
			priority
			className={'rounded-4xl overflow-hidden'}
		/>
	)
}

export { Poster }
