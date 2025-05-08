'use server'

import { Resend } from 'resend'

import { EmailHTML } from '@/components/Mail'
import { invalidArrData } from '@/lib/helpers'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async data => {
	try {
		const { from, to, ...fields } = data

		if (invalidArrData([from, to]))
			throw new Error('Invalid sender or receiver address')

		await resend.emails.send({
			to,
			from,
			subject: 'Message Received',
			react: EmailHTML({ fields }),
		})

		return {
			error: null,
			success: true,
		}
	} catch (error) {
		console.error(error)

		return {
			error: error.message,
			success: false,
		}
	}
}
