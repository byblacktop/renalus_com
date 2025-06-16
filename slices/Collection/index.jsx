import {
	CollectionAlpha,
	CollectionCards,
	CollectionColumns,
	CollectionFeatured,
	CollectionGallery,
	CollectionList,
	CollectionPanels,
	CollectionPopovers,
	CollectionPreviews,
	CollectionProse,
	CollectionSpread,
	CollectionStack,
	CollectionToggles,
} from '@/components/Collection'
import { Shell } from '@/components/Compose'
import { getSliceData, resolveProps } from '@/lib/utils'

const layouts = {
	default: CollectionProse,
	cards: CollectionCards,
	featured: CollectionFeatured,
	prose: CollectionProse,
	list: CollectionList,
	columns: CollectionColumns,
	toggles: CollectionToggles,
	gallery: CollectionGallery,
	previews: CollectionPreviews,
	popovers: CollectionPopovers,
	alpha: CollectionAlpha,
	spread: CollectionSpread,
	panels: CollectionPanels,
	stack: CollectionStack,
}

const resolver = {
	position: 'Right',
	// color: 'Indigo',
}

const Collection = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	return (
		<Shell
			as={layouts[variation] ?? layouts.default}
			{...getSliceData(slice_type, variation)}
			{...resolveProps(primary, resolver)}
			{...context}
		/>
	)
}

export default Collection
