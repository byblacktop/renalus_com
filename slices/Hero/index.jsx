import { Shell } from '@/components/Compose'
import {
	HeroContained,
	HeroHighlight,
	HeroLayered,
	HeroLead,
	HeroPoster,
	HeroSplit,
} from '@/components/Hero'
import { getSliceData, resolveProps } from '@/lib/utils'

const layouts = {
	default: HeroPoster,
	lead: HeroLead,
	split: HeroSplit,
	highlight: HeroHighlight,
	contained: HeroContained,
	layered: HeroLayered,
}

const resolver = {
	color: 'Zinc 50',
}

const Hero = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	const props = resolveProps(primary, resolver, true)
	const dataset = getSliceData(slice_type, variation, props.color)

	return (
		<Shell
			as={layouts[variation] ?? layouts.default}
			className='__hero'
			{...props}
			{...dataset}
			{...context}
		/>
	)
}

export default Hero
