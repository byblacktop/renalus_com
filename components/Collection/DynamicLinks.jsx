'use client'

import { useAtomValue } from 'jotai'

import { ButtonGroup } from '@/components/UI/ButtonGroup'
import { invalidArrData } from '@/lib/helpers'
import { locationsAtom } from '@/lib/store'

const DynamicLinks = ({ items, className }) => {
	const locations = useAtomValue(locationsAtom)

	if (invalidArrData(items)) return

	return (
		<ButtonGroup
			links={locations
				.filter(({ title }) => items.includes(title))
				.map(({ title, link }) => ({
					text: title,
					href: link,
				}))}
			variant='stroke'
			size='sm'
			arrow={{ default: true }}
			className={className}
		/>
	)
}

export default DynamicLinks
