'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'

const formDefaults = {
	mode: 'onBlur',
	reValidateMode: 'onChange',
}

const Form = ({ children, handleSubmit, settings, className }) => {
	const methods = useForm({
		...formDefaults,
		...settings,
	})

	const onSubmit = async data => {
		if (handleSubmit) {
			await handleSubmit(data)
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={cn('space-y-3 lg:space-y-6', className)}
			>
				{children}
			</form>
		</FormProvider>
	)
}
export default Form
