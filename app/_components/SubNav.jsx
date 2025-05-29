'use client'

import { useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { cva } from 'cva'
import { useAtomValue } from 'jotai'

import { Button, Grid } from '@/components/UI'
import { invalidArrObjectData } from '@/lib/helpers'
import { locationsAtom } from '@/lib/store'
import { cn, kn } from '@/lib/utils'
import { LocationCard } from '@/locations/List'

// import { DynamicFeed } from './Feed'

const variants = cva('', {
	variants: {
		cols: {
			1: 'grid-cols-1',
			2: 'grid-cols-2',
		},
	},
})

const SubNav = ({ link, className }) => {
	const [open, setOpen] = useState(false)
	const layout = link.subnav.layout
	const Dropdown =
		layout === 'locations' ? SubNavLocations : SubNavItems

	return (
		<Popover
			className='relative'
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
						'rounded-xl overflow-hidden shadow-2xl',
						'bg-white p-2 md:p-4',
					)}
				>
					<Dropdown {...link.subnav} />
				</PopoverPanel>
			)}
		</Popover>
	)
}

const SubNavItems = ({ links, className, parent }) => {
	return (
		<dl className={cn(className)}>
			{links.map(({ className, ...link }) => (
				<dd key={kn(link)}>
					<Button
						link={link}
						variant='flat'
						color='indigo'
						className={cn('w-full p-2.5 font-medium', className)}
						{...link}
					/>
				</dd>
			))}
		</dl>
	)
}

const SubNavLocations = () => {
	const locations = useAtomValue(locationsAtom)

	if (invalidArrObjectData(locations)) return null

	return (
		<dl className='columns-2 pb-2'>
			{locations.map(location => (
				<LocationCard
					key={kn(location)}
					{...location}
					variant='subnav'
				/>
			))}
		</dl>
	)
}

export { SubNav }
