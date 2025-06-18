import { Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Box, Button, Flex } from '@/components/UI'
import {
	invalidContent,
	invalidObjectData,
	slugify,
} from '@/lib/helpers'
import { Hours, Info } from './Info'

const Aside = ({ hours, ...contact }) => (
	<Flex as='aside' layout='grid' columns={2} gap='md'>
		<Contact {...contact} />
		<Open hours={hours} />
	</Flex>
)

const Contact = ({ title, address, phone, fax, link }) => {
	return (
		<div className='max-w-2xs space-y-4'>
			<h5 className='__label __sm'>Contact</h5>

			{/* Contact details */}
			<dl className='p __xs space-y-1 md:space-y-2'>
				{/* Location label */}
				<dd>
					<Title title={title} as='h5' className='__sm' />
				</dd>

				{/* Location details */}
				<Details
					title='Address'
					icon='address'
					data={address.text}
					link={address}
				/>
				<Details title='Phone' icon='phone' data={phone} />
				<Details title='Fax' icon='fax' data={fax} />
			</dl>

			{/* CTA — Appointment */}
			{/* <Button
				color='accent'
				link={{
					href: `/contact?location=${slugify(title)}`,
					text: 'Request Appointment',
				}}
				arrow={{
					direction: 'upRight',
					loop: true,
					className: 'p-2 rounded-full bg-green-700 text-green-100',
				}}
				className='btn-cta w-full'
			/> */}
		</div>
	)
}

const Details = ({ title, icon, data, ...props }) => {
	if (invalidContent(data)) return

	return (
		<>
			<dt className='sr-only'>{title}</dt>
			<dd>
				<Info icon={icon} title={data} size='__sm' {...props} />
			</dd>
		</>
	)
}

const Open = ({ hours }) => {
	if (invalidObjectData(hours)) return

	return (
		<div className='max-w-2xs space-y-4'>
			<h5 className='__label __sm'>Hours</h5>
			<Hours hours={hours} />
		</div>
	)
}

export { Aside }
