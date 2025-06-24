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
	color: 'None',
}

const Hero = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	return (
		<Shell
			as={layouts[variation] ?? layouts.default}
			className='__hero'
			{...getSliceData(slice_type, variation, primary.color)}
			{...resolveProps(primary, resolver)}
			{...context}
		/>
	)
}

export default Hero
