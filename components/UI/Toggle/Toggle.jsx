'use client'

import { Disclosure } from '@headlessui/react'

import { Overlay } from '@/components/UI/Overlay'
import {
	ToggleContent,
	ToggleHeader,
	ToggleIcon,
	ToggleTitle,
} from '@/components/UI'
import { cn } from '@/lib/utils'

// TODO: Review const vs function on Next.js update after 13.5.3
// Ref: https://github.com/vercel/next.js/issues/46734#issuecomment-1691214107
function Toggle(props) {
	return <ToggleDom {...props} />
}

const ToggleDom = ({
	title,
	subtitle,
	color,
	children,
	...props
}) => {
	return (
		<Disclosure {...props} className='relative group'>
			{({ open }) => (
				<div className='relative'>
					<ToggleHeader color={color}>
						<ToggleTitle title={title} subtitle={subtitle} />
						{/* TODO: Add optional show/hide */}
						<ToggleIcon color={color} open={open} />
					</ToggleHeader>

					{/* TODO: Add optional show/hide */}
					<ToggleContent show={open}>{children}</ToggleContent>

					<div
						className={cn(
							'absolute inset-y-0 -inset-x-6 z-0',
							'rounded-xl pointer-events-none',
							'transition-all duration-300 ease-in-out origin-top',
							'scale-90 bg-zinc-50/0',
							'group-hover:scale-100 group-hover:bg-zinc-50',
							// TODO: Add optional show/hide
							// open ? 'scale-100 opacity-5' : 'scale-90 opacity-0',
						)}
					/>
				</div>
			)}
		</Disclosure>
	)
}

export { Toggle }
