// export default Checkbox

import { ErrorMessage } from '@hookform/error-message'
import { useFormContext, useWatch } from 'react-hook-form'

import { FieldError } from '@/components/Form/Fields'
import { cn } from '@/lib/utils'

// import { useFormContext } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'
// import { FieldError } from '@/components/Form/Fields'
// import { cn } from '@/lib/utils'

const Checkbx = ({
	id,
	name,
	label,
	value,
	validation,
	index = 0,
	required = false,
	wrapperProps,
	className,
	...atts
}) => {
	name = name ?? id
	id = id ?? name

	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={cn('relative w-full z-10', wrapperProps)}>
			<fieldset className='relative'>
				<legend className='sr-only'>{label}</legend>

				<div className='relative flex items-start gap-3'>
					<input
						id={id}
						type='checkbox'
						aria-describedby={`${id}__description`}
						className={cn(
							'h-4 w-4 text-slate rounded relative top-0.5',
							className,
							errors[name] && 'error',
						)}
						{...register(name, {
							required,
							...(validation ?? {}),
						})}
						{...atts}
					/>

					<label htmlFor={id} className='p__sm'>
						{label}
					</label>
				</div>
			</fieldset>

			<div className=''>
				<ErrorMessage
					name={name}
					errors={errors}
					render={({ message }) => (
						<FieldError
							position='bottom'
							status={message ?? 'Required Field'}
						/>
					)}
				/>
			</div>
		</div>
	)
}

const Checkbox = ({
	id,
	name,
	label,
	required = false,
	wrapperProps,
	className,
}) => {
	name = name ?? id
	id = id ?? name

	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={cn('relative w-full z-10', wrapperProps)}>
			<fieldset className='relative'>
				<legend className='sr-only'>{label}</legend>

				<div className='relative flex items-start gap-3'>
					<input
						id={id}
						type='checkbox'
						className={cn(
							'h-4 w-4 text-slate rounded relative top-0.5',
							className,
							errors[name] && 'error',
						)}
						{...register(name)}
					/>
					<label htmlFor={id} className='p__sm'>
						{label}
					</label>
				</div>
			</fieldset>

			{/* <FieldError status={errors[name]} position='bottom' /> */}
			<ErrorMessage
				name={name}
				errors={errors}
				render={({ message }) => (
					<FieldError
						position='bottom'
						status={message ?? 'Required Field'}
					/>
				)}
			/>
		</div>
	)
}

export { Checkbox }
