import { useFormContext } from 'react-hook-form'

import { FieldError } from '@/components/Form/Fields'
import { cn } from '@/lib/utils'

const SelectNative = ({
	id,
	name,
	label,
	heading,
	required,
	className,
	hideLabel = true,
	options,
}) => {
	name = name ?? id
	id = id ?? name

	const {
		register,
		formState: { errors },
	} = useFormContext()

	const labelClass = hideLabel ? 'sr-only' : ''

	return (
		<div>
			{heading && <h5>{heading}</h5>}
			<label htmlFor={name} className={labelClass}>
				{label}
			</label>

			<select
				name={name}
				className={cn(className, errors[name] && 'error')}
				{...register(name, { required })}
			>
				<option value='' key='select-0' defaultValue>
					{label}
				</option>
				{options.map((o, index) => (
					<option value={o.value} key={'select-' + index + 1}>
						{o.label}
					</option>
				))}
			</select>

			<FieldError status={errors[name]} />
		</div>
	)
}

export { SelectNative }
