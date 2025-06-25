import { MapPinIcon, PrinterIcon } from '@heroicons/react/24/outline'

import { LinkShell } from '@/components/Compose'
import { Lead, Title } from '@/components/Content'
import { Button, Flex, Spacer } from '@/components/UI'
import { spaceY } from '@/lib/tw'
import { cn } from '@/lib/utils'
import { LocationMeta } from '@/location/Card'

const cta = {
	default: 'Read More',
	location: 'View Location',
}

const CardUtility = ({
	url,
	title,
	subtitle,
	type,
	tags,
	...props
}) => {
	return (
		<LinkShell
			href={url}
			className={cn(
				'__article group flex h-full flex-col',
				'bg-white rounded-xl p-4',
				spaceY.sm,
			)}
		>
			<Flex
				layout='stack'
				justify='between'
				gap='sm'
				className='px-4 grow'
			>
				<Flex layout='stack' gap='sm'>
					<h4>{title}</h4>

					<LocationData {...props} />
				</Flex>

				<PostFooter type={type} />
			</Flex>
		</LinkShell>
	)
}

const LocationData = ({ address, phone, hours, faxes }) => {
	return (
		<Flex layout='stack' gap='2xs'>
			<Flex align='start' gap='3xs'>
				<MapPinIcon className='size-4 shrink-0 text-slate' />
				<p className='__xs'>{address?.text}</p>
			</Flex>

			<LocationMeta phone={phone} hours={hours} />

			{faxes.length > 0 && (
				<Flex align='start' gap='3xs'>
					<PrinterIcon className='size-4 shrink-0 text-slate' />
					<p className='__xs'>{faxes[0].number}</p>
				</Flex>
			)}

			{/* {faxes.map(f => (
				<Flex align='start' gap='3xs'>
					<PrinterIcon className='size-4 shrink-0 text-slate' />
					<p className='__xs'>{f.number}</p>
				</Flex>
			))} */}
			{/* <Flex align='start' gap='3xs'>
				<MapPinIcon className='size-4 shrink-0 text-slate' />
				<p className='__xs'>{address?.text}</p>
			</Flex> */}
		</Flex>
	)
}

const PostFooter = ({ subtitle, type }) => {
	return (
		<footer
			className={cn(
				'flex items-center justify-between',
				'border-b border-indigo-300',
			)}
		>
			<div />
			<Button
				as='span'
				text={cta[type] ?? cta.default}
				size='xs'
				variant='flat'
				color='dark'
				arrow={{ default: true }}
			/>
		</footer>
	)
}

export { CardUtility }
