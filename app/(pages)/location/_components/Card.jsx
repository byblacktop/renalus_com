import { ClockIcon, PhoneIcon } from '@heroicons/react/24/outline'

import { LinkShell } from '@/components/Compose'
import { Body, Lead } from '@/components/Content'
import { AspectImage } from '@/components/Media'
import { Flex, LinkArrow } from '@/components/UI'
import {
	getFeaturedImg,
	invalidArr,
	invalidArrObjectData,
	invalidObjectKeys,
	invalidString,
} from '@/lib/helpers'
import { gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'

const getHours = hours => {
	if (invalidObjectKeys(hours, 'body')) return

	if (invalidObjectKeys(hours.body, 'rows')) return

	if (invalidArrObjectData(hours.body.rows)) return

	const firstRow = [
		hours.body.rows[0].cells[0],
		hours.body.rows[0].cells[1],
	]

	return firstRow
}

const LocationCard = ({ link, imgs, variant = '', ...props }) => {
	const img = getFeaturedImg(imgs)

	return (
		<dd className='group relative z-1 p-2'>
			<div className='px-2.5'>
				<LinkShell
					href={link}
					className={cn(
						'py-2.5',
						'relative z-1 flex flex-wrap',
						'border-b border-slate-100',
						'group-hover:border-slate-100/0',
						variant === 'default' && 'group-last-of-type:border-b-0',
						gap.sm,
					)}
				>
					{variant === 'default' && (
						<div>
							<AspectImage
								img={img}
								w={5}
								h={4}
								className={cn('w-24', 'rounded-lg overflow-hidden')}
							/>
						</div>
					)}

					<LocationPreview variant={variant} {...props} />

					<div
						className={cn(
							'absolute ',
							variant === 'default'
								? 'top-2 md:top-3.5 right-2 md:right-3.5'
								: 'top-1 -right-1.5',
						)}
					>
						<LinkArrow
							loop
							cta
							size={variant === 'default' ? 'sm' : 'xs'}
							direction='upRight'
							className={cn(
								'transition-all duration-300',
								'text-slate',
								variant === 'default'
									? 'group-hover:text-slate-50 bg-slate-50/70 group-hover:bg-slate'
									: 'bg-white group-hover:bg-white',
							)}
						/>
					</div>
				</LinkShell>
			</div>
			<div
				className={cn(
					'absolute inset-0 z-0 rounded-xl overflow-hidden',
					'bg-slate-50/0 group-hover:bg-slate-50',
					'scale-95 group-hover:scale-100',
					'transition duration-300',
					'pointer-events-none',
				)}
			/>
		</dd>
	)
}

const LocationPreview = ({
	title,
	address,
	phone,
	hours,
	variant,
}) => {
	return (
		<Flex layout='stack' gap='3xs' className='grow'>
			<Label
				title={title}
				address={variant === 'default' ? address : null}
			/>

			<LocationMeta phone={phone} hours={hours} variant={variant} />
		</Flex>
	)
}

const LocationMeta = ({ phone, hours, variant }) => {
	return (
		<Flex justify='between' className='whitespace-nowrap'>
			<Phone phone={phone} />

			<Hours hours={getHours(hours)} />
		</Flex>
	)
}

const Label = ({ title, address }) => {
	return (
		<Lead
			title={title}
			subtitle={address?.text}
			layout='stack'
			gap='none'
			as={{
				title: 'h6',
				subtitle: 'p',
			}}
			className={{
				subtitle: '__2xs font-medium',
			}}
		/>
	)
}

const Phone = ({ phone }) => {
	if (invalidString(phone)) return

	return (
		<Flex align='center' gap='3xs'>
			<PhoneIcon className='size-4 shrink-0 text-slate' />
			<p className='__xs'>{phone}</p>
		</Flex>
	)
}

const Hours = ({ hours }) => {
	if (invalidArr(hours) || hours?.length < 2) return

	return (
		<Flex align='center' gap='3xs'>
			<ClockIcon className='size-4 shrink-0 text-slate' />
			{hours.map(h => (
				<Body key={kn(h)} body={h.content} className='__xs' />
			))}
		</Flex>
	)
}

export { LocationCard, LocationMeta }
