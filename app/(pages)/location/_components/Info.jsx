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
						'leading-4.5',
						cp(className, 'title', true),
					)}
				/>
			</Flex>
		</LinkShell>
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
							title: 'font-medium',
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

export { Info, Hours }
