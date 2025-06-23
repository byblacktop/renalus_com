'use client'

import { useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
} from '@headlessui/react'

import { Button } from '@/components/UI'
import { invalidArrObjectData } from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'
import { SubNavGroups, SubNavItems, SubNavLocations } from './Flyout'

const layouts = {
	default: SubNavItems,
	groups: SubNavGroups,
	locations: SubNavLocations,
}

const SubNav = ({ link, className }) => {
	const [open, setOpen] = useState(false)
	const layout = link.subnav.layout
	const Dropdown = layouts[layout] || layouts.default

	return (
		<Popover
			className='relative'
			data-theme='light'
			onPointerEnter={() => setOpen(true)}
			onPointerLeave={() => setOpen(false)}
		>
			<PopoverButton as='div'>
				<Button
					link={link}
					variant='nav'
					arrow={{
						direction: 'down',
						variant: 'chevron',
					}}
					className={cn(
						className,
						'pr-0 xl:pr-2',
						'gap-0.5 xl:gap-1.5',
					)}
				/>
			</PopoverButton>

			{open && (
				<PopoverPanel
					onPointerLeave={() => setOpen(false)}
					static
					transition
					className={cn(
						'absolute top-full left-1/2 -translate-x-1/2',
						'w-screen max-w-max flex-auto',
						'p-4',
					)}
				>
					<div
						className={cn(
							'bg-white p-8',
							'rounded-xl overflow-hidden',
							'border border-zinc-200 shadow-2xl',
						)}
					>
						<Dropdown {...link.subnav} />

						<SubNavCTA cta={link.subnav.cta} />
					</div>
				</PopoverPanel>
			)}
		</Popover>
	)
}

const SubNavCTA = ({ cta }) => {
	if (invalidArrObjectData(cta)) return null

	return (
		<div className='flex gap-2 bg-zinc-100 -m-8 mt-8 py-1.5 px-10'>
			{cta.map(({ link, ...props }) => (
				<Button key={kn(link)} link={link} {...props} />
			))}
		</div>
	)
}

export { SubNav }
