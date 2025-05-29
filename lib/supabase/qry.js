import { INQUIRY_TABLE } from './config'

export const getInquiries = (client, end) =>
	client
		.from(INQUIRY_TABLE)
		.select('*')
		.gte('created_at', end)
		.order('created_at', { ascending: false })
		.limit(500)

export const createInquiry = (client, entry) =>
	client.from(INQUIRY_TABLE).insert([entry]).select()
