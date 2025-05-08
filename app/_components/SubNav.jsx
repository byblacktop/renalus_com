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
					className={cn(
						className,
						'pr-0 xl:pr-2',
						'gap-0.5 xl:gap-1.5',
					)}
					arrow={{
						direction: 'down',
						variant: 'chevron',
					}}
				/>
			</PopoverButton>

			{open && (
				<PopoverPanel
					onPointerLeave={() => setOpen(false)}
					static
					transition
					className={cn(
						'absolute top-full left-0',
						'w-screen max-w-max flex-auto',
						'rounded-xl overflow-hidden shadow-2xl',
						'bg-white p-2',
					)}
				>
					<Dropdown {...link.subnav} />
				</PopoverPanel>
			)}
		</Popover>
	)
}

const SubNavItems = ({ links, cols }) => {
	return (
		<Grid gap='4xs' cols={cols}>
			{links.map(({ className, ...link }) => (
				<dd key={kn(link)}>
					<Button
						link={link}
						size='sm'
						variant='flat'
						color='indigo'
						className={cn(
							'w-full px-3.5 py-2 font-medium',
							className,
						)}
						{...link}
					/>
				</dd>
			))}
		</Grid>
	)
}

const SubNavLocations = ({ item }) => {
	const locations = useAtomValue(locationsAtom)

	if (invalidArrObjectData(locations)) return null

	return (
		<Grid gap='2xs' cols={2} className='pb-4'>
			{locations.map(location => (
				<LocationCard
					key={kn(location)}
					{...location}
					variant='subnav'
				/>
			))}
		</Grid>
	)
}

export { SubNav }
