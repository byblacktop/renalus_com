import {
	CollectionPanels,
	CollectionSpread,
	CollectionStack,
} from '@/components/Collection'
import { Shell } from '@/components/Compose'
import { getSliceData, resolveProps } from '@/lib/utils'

const layouts = {
	default: CollectionSpread,
	panels: CollectionPanels,
	stack: CollectionStack,
}

const resolver = {
	position: 'Right',
	// color: 'Indigo',
}

const Interactive = ({
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

export default Interactive
