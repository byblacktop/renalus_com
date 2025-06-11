import { Container, Section } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { AspectImage, VideoTrigger } from '@/components/Media'
import { Backdrop, Flex, Info } from '@/components/UI'
import { formattedDate } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { Poster } from './Poster'
import { MediaTriggers, TitleTrigger } from './Triggers'
import { Video } from './Video'

const Hero = ({
	img,
	tags,
	date,
	children,
	podcast,
	video,
	...contentProps
}) => (
	<Section className='__hero' data-theme='light'>
		<Container
			width='sm'
			layout='stack'
			gap='md'
			className='place-items-center pb-0'
		>
			{/* Post Title + Meta */}
			<Flex className='max-w-4xl'>
				<TitleTrigger video={video} podcast={podcast} />
				<Lead
					{...contentProps}
					as={{ title: 'h1', subtitle: 'h6' }}
					subtitle={[formattedDate(date), ...tags].join(' · ')}
					className={{
						lead: 'text-pretty',
						title: 'h2',
						subtitle: '__label __xs',
					}}
				/>
			</Flex>

			{/* Image w/ Color Overlay */}
			<Poster video={video} img={img} />

			<MediaTriggers podcast={podcast} video={video} />
		</Container>

		<Backdrop offset='bottom' color='slate-100' layer />
	</Section>
)

export { Hero }
