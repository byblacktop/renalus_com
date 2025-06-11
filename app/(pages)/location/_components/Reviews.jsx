import { Container, Section } from '@/components/Compose'
import { Lead } from '@/components/Content'
import { Backdrop, Flex } from '@/components/UI'
import { ReviewList } from './DynamicReviews'

const Reviews = ({ title, rid }) => {
	return (
		<Section>
			<Container width='sm' className='__3xs py-0'>
				<Flex
					align='start'
					className='bg-white rounded-4xl p-6 md:p-12 xl:p-16'
				>
					<Lead
						title='Hear what our patients have to say'
						subtitle='Reviews'
						as={{ title: 'h3', subtitle: 'h5' }}
						className={{
							lead: 'flex-4',
							subtitle: '__label __sm text-slate',
						}}
					/>

					<div className='flex-5 spce-y-4 md:space-y-8'>
						<ReviewList rid={rid} />
					</div>
				</Flex>
			</Container>

			<Backdrop color='slate-200' offset='panel' />
		</Section>
	)
}

export { Reviews }
