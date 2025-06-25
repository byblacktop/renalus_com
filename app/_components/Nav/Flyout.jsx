import { useAtomValue } from 'jotai'

import { Button, Flex } from '@/components/UI'
import { invalidArrObjectData } from '@/lib/helpers'
import { locationsAtom } from '@/lib/store'
import { cn, cp, kn } from '@/lib/utils'
import { LocationCard } from '@/location/Card'

const SubNavItems = ({ links, className }) => {
	return (
		<ul className={cn(className)}>
			{links.map(({ className, ...link }) => (
				<li key={kn(link)} className={cp(className, 'li')}>
					<Button
						link={link}
						variant='flat'
						color='zinc'
						className={cn(
							'px-2.5 py-2 font-medium w-full min-w-auto whitespace-normal text-balance',
							'bg-indigo-50/0 hover:bg-indigo-50/70 rounded-lg',
							cp(className, 'btn', true),
						)}
						{...link}
					/>
				</li>
			))}
		</ul>
	)
}

const SubNavGroups = ({ links, className }) => {
	return (
		<div
			className={cn(
				'grid grid-cols-2',
				'divide-x divide-zinc-100',
				className,
			)}
		>
			{/* Link Columns */}
			{Object.entries(links).map(([key, { label, links }]) => (
				<Flex
					key={key}
					layout='stack'
					gap='md'
					// justify='between'
					className={cn('px-10 max-w-2xs', 'first:pl-0 last:pr-0')}
				>
					<h5 className='__sm pl-2.5 text-slate'>{label}</h5>
					<SubNavItems
						links={links}
						className='h-full flex flex-col'
					/>
				</Flex>
			))}
		</div>
	)
}

const SubNavLocations = () => {
	const locations = useAtomValue(locationsAtom)

	if (invalidArrObjectData(locations)) return null

	return (
		<>
			<h5 className='__sm pl-2.5 text-slate'>Primary Locations</h5>
			<dl className='columns-2 gap-0 pb-2'>
				{locations.map(location => (
					<LocationCard
						key={kn(location)}
						{...location}
						variant='subnav'
					/>
				))}
			</dl>
		</>
	)
}

export { SubNavItems, SubNavGroups, SubNavLocations }
