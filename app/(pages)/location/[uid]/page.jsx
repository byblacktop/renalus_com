import { Container, Section } from '@/components/Compose'
import { Lead, Prose } from '@/components/Content'
import { Flex } from '@/components/UI'
import { getDoc, getMeta, getStaticParams } from '@/lib/api'
import { invalidContent } from '@/lib/helpers'
import { Aside } from '@/location/Aside'
import { Details, Info } from '@/location/Info'

const Location = async ({ params }) => {
	const { uid } = await params
	const { title, address, ...asideProps } = await getDoc(
		'location',
		uid,
	)

	return (
		<Section className='__hero bg-slate-100' data-theme='light'>
			<Container width='xs' className='__xl' gap='base'>
				<Flex layout='stack' gap='xs'>
					<h6 className='__label __brief text-indigo-600'>
						Location Overview
					</h6>
					<h1 className='d2'>{title} Office</h1>
					<Info icon='address' title={address.text} size='__sm' />
				</Flex>

				<div className='w-full h-px bg-slate-400/50' />

				<Aside {...asideProps} />
			</Container>
		</Section>
	)
}

export const generateStaticParams = async () =>
	await getStaticParams('location')

export const generateMetadata = async ({ params }) =>
	await getMeta(params, 'location')

export default Location
