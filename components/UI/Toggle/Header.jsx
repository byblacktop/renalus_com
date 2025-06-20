import { DisclosureButton } from '@headlessui/react'

import { Flex } from '@/components/UI/Flex'
import { cn, cp } from '@/lib/utils'

const ToggleHeader = ({ children, className }) => (
	// <header
	// 	className={cn(
	// 		'group relative z-2 w-full',
	// 		'cursor-pointer',
	// 		'py-2 md:py-3',
	// 		cp(className, 'header', true),
	// 	)}
	// >
	<DisclosureButton
		as='header'
		className={cn(
			'group relative z-2 w-full',
			'cursor-pointer',
			'py-2 md:py-3',
			cp(className, 'header', true),
		)}
	>
		<Flex
			layout='flex'
			items='center'
			justify='between'
			className={cp(className, 'container')}
		>
			{children}
		</Flex>
	</DisclosureButton>
	// </header>
)

export { ToggleHeader }
