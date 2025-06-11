import { useAtomValue } from 'jotai'

import { Button, Divider } from '@/components/UI'
import { invalidArrObjectData } from '@/lib/helpers'
import { locationsAtom } from '@/lib/store'
import { cn, kn } from '@/lib/utils'
import { LocationCard } from '@/location/List'

const SubNavItems = ({ links, className }) => {
	return (
		<dl className={cn(className)}>
			{links.map(({ className, ...link }) => (
				<dd key={kn(link)}>
					<Button
						link={link}
						variant='flat'
						color='slate'
						className={cn('w-full p-2.5 font-medium', className)}
						{...link}
					/>
				</dd>
			))}
		</dl>
	)
}

const SubNavGroups = ({ links, className }) => {
	return (
		<div className={cn('grid grid-cols-2 gap-4 xl:gap-8', className)}>
			{Object.entries(links).map(([key, { label, links }]) => (
				<div key={key} className='space-y-2'>
					<h4 className='__xs'>{label}</h4>
					<Divider />
					<SubNavItems links={links} />
				</div>
			))}
		</div>
	)
}

const SubNavLocations = () => {
	const locations = useAtomValue(locationsAtom)

	if (invalidArrObjectData(locations)) return null

	return (
		<dl className='columns-3 pb-2'>
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

export { SubNavItems, SubNavGroups, SubNavLocations }
