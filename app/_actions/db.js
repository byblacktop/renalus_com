'use server'

import {
	getDbFields,
	invalidRequired,
	validObjectData,
} from '@/lib/helpers'
import { supabase } from '@/lib/supabase/client'
import { createInquiry, getInquiries } from '@/lib/supabase/qry'

const _SECRET = process.env.SUPABASE_ADMIN_KEY

//// Validate access
//
const validAcess = auth => auth && auth === _SECRET.split('.')[0]

const invalidAccess = auth => !validAcess(auth)

//// Supabase database entry
//
const addRow = async fields => {
	try {
		// Clean fields for db
		const entry = getDbFields(fields)

		// add to db
		const { data, error } = await createInquiry(supabase, entry)

		if (validObjectData(error)) throw new Error(error.message)

		return {
			data,
			error: null,
			success: true,
		}
	} catch (err) {
		console.error(err)

		return {
			error: err.message,
			success: false,
		}
	}
}

const getRows = async auth => {
	if (invalidAccess(auth)) return bail('Unauthorized')

	try {
		const { data, error } = await getInquiries(supabase)

		if (validObjectData(error)) throw new Error(error.message)

		return {
			success: true,
			error: false,
			data,
		}
	} catch (err) {
		console.error(err)

		return {
			success: false,
			error: err.message,
			data: [],
		}
	}
}

const ssrInquiries = (client, auth) => {
	if (invalidRequired(invalidAccess(auth), client))
		return bail('Unauthorized')

	return getInquiries(client)
}

const bail = error => ({
	error,
	success: false,
	data: [],
})

export { addRow, getRows, ssrInquiries, validAcess, invalidAccess }
