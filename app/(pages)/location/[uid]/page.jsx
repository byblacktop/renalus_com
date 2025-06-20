import { Section } from '@/components/Compose'
import { Button } from '@/components/UI'
import { getDoc, getMeta, getStaticParams } from '@/lib/api'
import { getFeaturedImg } from '@/lib/helpers'
import { Aside } from '@/location/Aside'
import { Body } from '@/location/Body'
import { Hero } from '@/location/Hero'

const Location = async ({ params }) => {
	const { uid } = await params
	const location = await getDoc('location', uid)

	const img = getFeaturedImg(location.imgs)

	return (
		<>
			<Hero img={img} subtitle='Location Overview' {...location} />

			{/* <Body {...location} /> */}

			{/* Back button */}
			{/* <Section
				container
				width='sm'
				className={{ container: '__3xs' }}
			>
				<Button
					size='sm'
					link={{
						href: '/locations',
						text: 'Back to All Locations',
					}}
					arrow={{
						direction: 'left',
						variant: 'long',
						size: 'lg',
						className: '-order-1',
					}}
				/>
			</Section> */}
		</>
	)
}

export const generateStaticParams = async () =>
	await getStaticParams('location')

export const generateMetadata = async ({ params }) =>
	await getMeta(params, 'location')

export default Location
