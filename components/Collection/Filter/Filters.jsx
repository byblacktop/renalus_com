'use client'

import { useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { CollectionResults } from '@/components/Collection/Filter'
import { Shell } from '@/components/Compose'
import { Button, Flex } from '@/components/UI'
import {
	getImgTags,
	invalidArrData,
	invalidObjectData,
} from '@/lib/helpers'
import { cn, kn } from '@/lib/utils'

const getFilteredItems = (items, filters, active) => {
	if (invalidObjectData(filters) || invalidArrData(active))
		return items

	const activeFilters = Object.entries(filters).reduce(
		(acc, [group, items]) => {
			const groupFilters = items.filter(item => active.includes(item))
			if (groupFilters.length) acc[group] = groupFilters
			return acc
		},
		{},
	)

	if (Object.keys(activeFilters).length === 0) return items

	return items.filter(item => {
		const tags = getImgTags(item.img)

		if (invalidArrData(tags)) return false

		// Check if item has matching tags from each active filter group
		return Object.values(activeFilters).every(groupFilters => {
			return groupFilters.some(filter => tags.includes(filter))
		})
	})
}

const CollectionFilter = ({ items, cols, filters }) => {
	const [active, setActive] = useState([])

	return (
		<>
			<aside className='w-full max-w-48'>
				<FilterGroups
					filters={filters}
					active={active}
					setActive={setActive}
				/>
			</aside>

			<article className='w-full'>
				<CollectionResults
					items={getFilteredItems(items, filters, active)}
					cols={cols}
				/>
			</article>
		</>
	)
}

const FilterGroups = ({ filters, active, setActive }) => (
	<ul
		className={cn(
			'sticky top-24 space-y-1 *:fs-2xs',
			'divide-y divide-steel-200',
		)}
	>
		{Object.entries(filters).map(([label, items], idx) => (
			<FilterGroup
				key={label}
				label={label}
				items={items}
				active={active}
				setActive={setActive}
			/>
		))}

		<li className='py-3 md:py-6'>
			<h6 className='__label __sm mb-4'>Our Brands</h6>
			<h4 className='__2xs'>
				Explore our extensive brands available at each location.
			</h4>
			<Button
				link={{ href: '/brands', text: 'View Our Brands' }}
				variant='stroke'
				arrow={{ default: true }}
			/>
		</li>
	</ul>
)

const FilterGroup = ({ label, items, active, setActive }) => {
	const handleFilter = item => {
		if (active.includes(item)) {
			setActive(prev => prev.filter(i => i !== item))
		} else {
			setActive(prev => [...prev, item])
		}
	}

	return (
		<li className='py-3 md:py-6 first:pt-0'>
			<h6 className='__label __sm mb-4'>Filter {label}</h6>
			<ul>
				{items.map(item => (
					<Flex
						as='li'
						gap='3xs'
						align='center'
						justify='start'
						key={kn(item)}
						className={cn(
							'group relative cursor-pointer',
							'text-steel-400 hover:text-indigo duration-750',
							active.includes(item) && 'text-green-700 font-medium',
						)}
						props={{
							onClick: () => handleFilter(item),
						}}
					>
						<span className='relative'>
							<Shell
								as={active.includes(item) && CheckIcon}
								className={cn(
									'size-5 p-0.5 rounded-full duration-400 ease-in-out',
									'bg-green-100 text-text-green-800',
									'scale-100 group-hover:scale-0',
								)}
							/>
							<Shell
								as={active.includes(item) && XMarkIcon}
								className={cn(
									'absolute left-0 top-0',
									'size-5 p-0.5 rounded-full duration-400 ease-in-out',
									'bg-red-100 text-text-red-800',
									'scale-0 group-hover:scale-100',
								)}
							/>
						</span>

						<p className='__sm'>{item}</p>
					</Flex>
				))}
			</ul>
		</li>
	)
}

export { CollectionFilter }
