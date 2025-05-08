import { useFormContext, useWatch } from 'react-hook-form'

import { FieldError } from '@/components/Form/Fields'
import { getOption } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const Radio = ({
	id,
	name,
	options,
	required = false,
	wrapperProps,
}) => {
	name = name ?? id
	id = id ?? name

	const {
		register,
		formState: { errors },
	} = useFormContext()
	const selected = useWatch({ name })

	return (
		<div className={cn('grid gap-2 md:gap-3', wrapperProps)}>
			{options.map(o => {
				const { label, value } = getOption(o)

				return (
					<div
						key={value}
						className={cn(
							'w-full flex items-center gap-3 rounded-lg border-2 duration-300',
							selected === value
								? 'border-blue bg-blue-100/50'
								: 'border-gray-200 bg-transparent',
						)}
					>
						<input
							id={value}
							type='radio'
							className='form-radio ml-2 md:ml-4'
							value={value}
							{...register(name, { required })}
						/>
						<label
							htmlFor={value}
							className='h6 grow py-3 md:py-4 pr-2 md:pr-4'
						>
							{label}
						</label>
					</div>
				)
			})}

			<FieldError status={errors[name]} position='bottom' />
		</div>
	)
}

export { Radio }
