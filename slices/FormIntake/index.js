import { Contact } from '@/components/CallToAction'
import { getSliceData, resolveProps } from '@/lib/utils'

const resolver = {
	color: 'None',
}

const FormIntake = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	return (
		<Contact
			{...getSliceData(slice_type, variation, primary.color)}
			{...resolveProps(primary, resolver)}
			{...context}
		/>
	)
}

export default FormIntake
