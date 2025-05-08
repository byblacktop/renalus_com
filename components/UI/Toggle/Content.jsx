'use client'

import { DisclosurePanel } from '@headlessui/react'

import { Transitions } from '@/components/UI'

const ToggleContent = ({ children, show }) => {
	return (
		<Transitions variant='fadeGrow' show={show}>
			<DisclosurePanel static className='relative z-2'>
				{children}
			</DisclosurePanel>
		</Transitions>
	)
}

export { ToggleContent }
