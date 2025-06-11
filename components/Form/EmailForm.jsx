'use client'

import { useState } from 'react'
import { Transition } from '@headlessui/react'

import { Shell } from '@/components/Compose'
import { slugify } from '@/lib/helpers'
import { gap } from '@/lib/tw'
import { cn, kn } from '@/lib/utils'
import { sendEmail } from '@/actions/mail'
import { Checkbox, SelectInput, Submit, TextInput } from './Fields'
import Form from './Form'
import FormMessage from './Message'

const fieldVariants = {
	text: TextInput,
	textarea: TextInput,
	select: SelectInput,
	checkbox: Checkbox,
}

const EmailForm = ({
	from,
	to,
	fields,
	cols = 2,
	submitText = 'Send Message',
	loadingText = 'Sending',
	className,
}) => {
	const [submitting, setSubmitting] = useState(false)
	const [showMessage, setShowMessage] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async values => {
		setSubmitting(true)

		try {
			// Send email
			const results = await sendEmail({ from, to, ...values })

			if (!results.success) throw new Error(results.error)

			setSuccess(true)
		} catch (e) {
			console.error(e.message)
			setSuccess(false)
		} finally {
			setShowMessage(true)
			setSubmitting(false)
		}
	}

	return (
		<Form handleSubmit={handleSubmit} className={className}>
			<Transition show={showMessage}>
				<div className=''>
					<FormMessage type={success ? 'success' : 'error'} />
				</div>
			</Transition>

			<Transition show={!showMessage}>
				<div className='space-y-4 lg:space-y-6'>
					<div
						className={cn(
							'grid grid-cols-1',
							cols === 2 && 'md:grid-cols-2',
							gap['md'],
						)}
					>
						{fields?.filter(Boolean).map(({ stretch, ...field }) => {
							return (
								<Shell
									key={kn(field)}
									as={fieldVariants[field.type] || TextInput}
									name={slugify(field.label)}
									hideLabel={false}
									className={cn({
										'sm:col-span-2':
											cols === 2 &&
											(stretch ||
												['checkbox', 'textarea', 'upload'].includes(
													field.type,
												)),
									})}
									{...field}
								/>
							)
						})}
					</div>

					<div className='text-right'>
						<Submit
							color='highlight'
							text={submitText}
							loading={submitting}
							loadingText={loadingText}
							// linkArrow
						/>
					</div>
				</div>
			</Transition>
		</Form>
	)
}

export default EmailForm
