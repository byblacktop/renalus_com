'use client'

import { DisclosurePanel } from '@headlessui/react'

import { Transitions } from '@/components/UI'
import { cn } from '@/lib/utils'

const ToggleContent = ({ children, show }) => {
	return (
		<Transitions variant='fadeGrow' show={show}>
			<DisclosurePanel
				static
				className={cn(
					'relative z-2 px-0',
					'md:pl-4 xl:pl-8',
					'md:pr-8 xl:pr-16',
					'max-w-prose',
				)}
			>
				{children}
			</DisclosurePanel>
		</Transitions>
	)
}

export { ToggleContent }
