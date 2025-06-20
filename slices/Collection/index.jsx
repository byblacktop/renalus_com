import {
	CollectionAlpha,
	CollectionCards,
	CollectionColumns,
	CollectionFaqs,
	CollectionFeatured,
	CollectionGallery,
	CollectionHighlight,
	CollectionList,
	CollectionPopovers,
	CollectionPreviews,
	CollectionProse,
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
	faq: CollectionFaqs,
	highlight: CollectionHighlight,
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
			{...getSliceData(slice_type, variation, primary.color)}
			{...resolveProps(primary, resolver)}
			{...context}
		/>
	)
}

export default Collection
