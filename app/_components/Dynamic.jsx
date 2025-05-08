'use server'

import { getQryParams } from '@/lib/api'
import {
	invalidRequired,
	normalizeResults,
	safeCatchArray,
	singularize,
} from '@/lib/helpers'
import { createClient } from '@/prismicio'

const mergeQry = (params = [], qry = []) => {
	const filters = [...(params.filters || []), ...(qry.filters || [])]
	const orderings = [
		...(params.orderings || []),
		...(qry.orderings || []),
	]

	return { ...qry, filters, orderings }
}

const DynamicItems = async ({ type, filter, qry = {}, children }) => {
	if (invalidRequired([type, children])) return []

	const client = createClient()

	const params = getQryParams(type, filter)

	const results = await client
		.getByType(singularize(type), mergeQry(params, qry))
		.catch(safeCatchArray)
		.then(normalizeResults)

	return children({ results })
}

export { DynamicItems }
