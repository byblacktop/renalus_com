import { CollectionFilter } from '@/components/Collection/Filter'
import { Flex } from '@/components/UI'
import { getImgTags } from '@/lib/helpers'

const locations = [
	'Milton',
	'Foley',
	'Fairhope',
	'Palafox',
	'Nine Mile Crossing',
	'Fairfield',
	'Baptist Hospital',
	'Navarre',
]

const getFilters = items =>
	items.reduce(
		(acc, item) => {
			getImgTags(item.img).map(tag => {
				if (locations.includes(tag)) {
					!acc.locations.includes(tag) && acc.locations.push(tag)
				} else if (!acc['Product Lines'].includes(tag)) {
					!acc['Product Lines'].includes(tag) &&
						acc['Product Lines'].push(tag)
				}
			})

			return acc
		},
		{ 'Product Lines': [] },
	)

const CollectionGallery = ({ items, cols }) => {
	const filters = getFilters(items)

	return (
		<Flex as='section' gap='xl' className='p-fluid-x'>
			<CollectionFilter items={items} cols={cols} filters={filters} />
		</Flex>
	)
}

export { CollectionGallery }
