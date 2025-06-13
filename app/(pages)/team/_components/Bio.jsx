import { Container } from '@/components/Compose'
import { Title } from '@/components/Content'
import { Video } from '@/components/Media'
import { Flex } from '@/components/UI'
import { invalidContent } from '@/lib/helpers'

const Bio = ({ bio, affiliations }) => {
	return (
		<Container gap='prose' className='px-0' data-theme='light'>
			<Details title='Bio' body={bio} />

			<Details
				title='Hospital Affiliations'
				body={affiliations}
				as='h4'
				className='__2xs'
			/>
		</Container>
	)
}

const Details = ({ title, body, ...props }) => {
	if (invalidContent(body)) return

	return (
		<Flex layout='stack' gap='xs'>
			<h6 className='__label __brief text-blue'>{title}</h6>
			<Title title={body} {...props} />
		</Flex>
	)
}

export { Bio }
