import {
	ClockIcon,
	EnvelopeIcon,
	MapPinIcon,
	PhoneIcon,
	PrinterIcon,
} from '@heroicons/react/24/outline'

import { LinkShell } from '@/components/Compose'
import { Title } from '@/components/Content'
import { Flex } from '@/components/UI'
import { invalidContent, validComponent } from '@/lib/helpers'
import { cn, cp } from '@/lib/utils'

const icons = {
	address: MapPinIcon,
	phone: PhoneIcon,
	fax: PrinterIcon,
	hours: ClockIcon,
	email: EnvelopeIcon,
}

const Info = ({
	icon,
	title,
	link,
	as = 'p',
	size = '__xs',
	className,
}) => {
	if (invalidContent(title)) return

	const Icon = validComponent(icon)
		? icon
		: (icons[icon] ?? icons.address)

	return (
		<LinkShell
			as={false}
			link={link}
			className={cp(className, 'link', true)}
		>
			<Flex
				align='center'
				gap='2xs'
				className={cn('group', cp(className, 'info'))}
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

export { Info }
