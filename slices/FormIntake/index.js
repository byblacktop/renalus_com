import { Contact } from '@/components/CallToAction'
import { getSliceData } from '@/lib/utils'

const FormIntake = ({
	slice: { primary, variation, slice_type },
	context,
}) => {
	return (
		<Contact
			{...getSliceData(slice_type, variation)}
			{...primary}
			{...context}
		/>
	)
}

export default FormIntake
