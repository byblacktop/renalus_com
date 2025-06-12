import { CtaCards, CtaSplit } from '@/components/CallToAction'
import { Shell } from '@/components/Compose'
import { getSliceData, resolveProps } from '@/lib/utils'

const layouts = {
	default: CtaCards,
	split: CtaSplit,
}

const resolver = {}

const Cta = ({
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

export default Cta
