import { Container } from '@/components/Compose'
import { Title } from '@/components/Content'
import { Video } from '@/components/Media'
import { Flex } from '@/components/UI'
import { invalidContent } from '@/lib/helpers'

const Bio = ({ start, education, media, bio }) => {
	return (
		<Container gap='prose' className='px-0'>
			<Details
				title='Industry Start'
				body={start}
				as='h4'
				className='__xs'
			/>
			<Details
				title='Education'
				body={education}
				as='h4'
				className='__xs'
			/>

			<Video {...media} />
			<Details title='Bio' body={bio} />
		</Container>
	)
}

const Details = ({ title, body, ...props }) => {
	if (invalidContent(body)) return

	return (
		<Flex layout='stack' gap='xs'>
			<h6 className='__label __sm'>{title}</h6>
			<Title title={body} {...props} />
		</Flex>
	)
}

export { Bio }
