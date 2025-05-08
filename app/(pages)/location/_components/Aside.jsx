import { Title } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Box, Button, Flex } from '@/components/UI'
import {
	invalidContent,
	invalidObjectData,
	slugify,
} from '@/lib/helpers'
import { Hours, Info } from './Info'

const Aside = ({ logo, hours, ...contact }) => (
	<Flex as='aside' layout='stack' gap='sm'>
		<AspectImage
			img={logo}
			w={16}
			h={5}
			className={{ img: 'object-contain' }}
		/>

		<Contact {...contact} />
		<Open hours={hours} />
	</Flex>
)

const Contact = ({ title, address, phone, fax, link }) => {
	return (
		<Box>
			<h4>Contact</h4>

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
			<Button
				color='accent'
				link={{
					href: `/contact?location=${slugify(title)}`,
					text: 'Contact Us',
				}}
				arrow={{
					direction: 'upRight',
					loop: true,
					className: 'p-2 rounded-full bg-green-700 text-green-100',
				}}
				className='btn-cta w-full'
			/>
		</Box>
	)
}

const Details = ({ title, icon, data, ...props }) => {
	if (invalidContent(data)) return

	return (
		<>
			<dt className='sr-only'>{title}</dt>
			<dd>
				<Info icon={icon} title={data} {...props} />
			</dd>
		</>
	)
}

const Open = ({ hours }) => {
	if (invalidObjectData(hours)) return

	return (
		<Box>
			<h4>Hours</h4>
			<Hours hours={hours} />
		</Box>
	)
}

export { Aside }
