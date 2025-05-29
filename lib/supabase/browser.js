import { useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'

let client

const getSupabaseBrowserClient = () => {
	if (client) {
		return client
	}

	client = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY,
	)

	return client
}

const useSupabaseBrowser = () => {
	return useMemo(getSupabaseBrowserClient, [])
}

export { useSupabaseBrowser }
