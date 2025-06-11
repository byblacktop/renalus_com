import { Shell } from '@/components/Compose'
import {
	ContentSplit,
	ContentSplitProse,
	Thread,
} from '@/components/Content'
import {
	FeatureBanner,
	FeatureHighlight,
	FeatureSplit,
	FeatureStatement,
} from '@/components/Feature'
import { getSliceData, resolveProps } from '@/lib/utils'

const layouts = {
	default: Thread,
	split: ContentSplit,
	splitProse: ContentSplitProse,
	feature: FeatureSplit,
	highlight: FeatureHighlight,
	banner: FeatureBanner,
	statement: FeatureStatement,
}

const resolver = {
	position: 'Left',
	color: 'Indigo',
}

const Content = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	return (
		<Shell
			as={layouts[variation] ?? Thread}
			isSection={!layouts[variation] || variation === 'default'}
			{...getSliceData(slice_type, variation)}
			{...resolveProps(primary, resolver)}
			{...context}
		/>
	)
}

export default Content
