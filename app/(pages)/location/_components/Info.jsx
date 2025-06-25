import {
	ClockIcon,
	MapPinIcon,
	PhoneIcon,
	PrinterIcon,
} from '@heroicons/react/24/outline'
import { asText } from '@prismicio/client'
import { PrismicTable } from '@prismicio/react'

import { LinkShell } from '@/components/Compose'
import { Title } from '@/components/Content'
import { Flex } from '@/components/UI'
import { invalidContent, invalidObjectData } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const icons = {
	address: MapPinIcon,
	phone: PhoneIcon,
	fax: PrinterIcon,
	hours: ClockIcon,
}

const Info = ({
	icon,
	title,
	label,
	link,
	as = 'p',
	size = '__xs',
	className,
}) => {
	if ([icon, title].some(invalidContent)) return

	const Icon = icons[icon] ?? icons.address

	return (
		<LinkShell as={false} link={link}>
			<Flex
				align='center'
				gap='2xs'
				className={cp(className, 'info')}
			>
				<Icon
					className={cn('size-4.5 shrink-0', cp(className, 'icon'))}
				/>
				<Title
					title={title}
					as={as}
					className={cn(
						size,
						'leading-4.5 text-indigo',
						cp(className, 'title', true),
					)}
				/>

				{label && <h6 className='__xs'>{label}</h6>}
			</Flex>
		</LinkShell>
	)
}

const Details = ({ title, icon, data, children, ...props }) => {
	if (invalidContent(data) && !children) return

	return (
		<dd className='max-w-2xs space-y-4'>
			<h5 className='__label __sm text-indigo-600'>{title}</h5>
			<div className='p __xs space-y-1 md:space-y-2'>
				<Info icon={icon} title={data} size='__sm' {...props} />
				{children}
			</div>
		</dd>
	)
}

const Hours = ({ hours }) => {
	if (invalidObjectData(hours)) return

	return (
		<PrismicTable
			field={hours}
			components={{
				table: ({ children }) => (
					<div className='__table'>{children}</div>
				),

				tbody: ({ children }) => (
					<dl className='__tbody space-y-1.5 md:space-y-2.5'>
						{children}
					</dl>
				),

				thead: ({ children }) => (
					<div className='__thead'>{children}</div>
				),

				th: ({ cell }) => (
					<Info
						as='h6'
						icon='hours'
						title={cell.content}
						className={{
							info: '__th',
						}}
						size=''
					/>
				),

				tr: ({ children }) => (
					<Flex as='dd' className='__tr' justify='between'>
						{children}
					</Flex>
				),

				td: ({ cell }) => (
					<Title
						title={asText(cell.content)}
						as='h6'
						className='__td'
					/>
				),
			}}
		/>
	)
}

export { Info, Hours, Details }
