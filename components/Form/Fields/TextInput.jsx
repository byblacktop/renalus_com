'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

import { Shell } from '@/components/Compose'
import { Body } from '@/components/Content'
import { FieldError, Label } from '@/components/Form/Fields'
import { slugify, toTitleCase } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const TextInput = ({
	name,
	label,
	body,
	placeholder,
	required,
	validate,
	className,
	hideLabel = true,
	...props
}) => {
	label = label || toTitleCase(name)
	placeholder = placeholder || label

	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div
			className={cn(
				'field',
				className,
				props.type === 'hidden' && 'hidden',
				errors[name] && 'error',
			)}
		>
			{/* Label */}
			<Label
				name={name}
				label={label}
				required={required}
				className={hideLabel && 'sr-only'}
			/>

			{/* Input */}
			<Shell
				id={name}
				as={props.type === 'textarea' ? 'textarea' : 'input'}
				{...props}
				placeholder={placeholder ?? label}
				{...register(name, { required, ...validate })}
			/>

			<ErrorMessage
				name={name}
				errors={errors}
				render={({ message }) => (
					<FieldError status={message ?? 'Required Field'} />
				)}
			/>

			{/* Helper Text */}
			<Body body={body} className='__xs' />
		</div>
	)
}

export { TextInput }
