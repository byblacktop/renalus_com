import { createServerClient } from '@supabase/ssr'

const useSupabaseServer = cookieStore =>
	createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY,
		{
			cookies: {
				get(name) {
					return cookieStore.get(name)?.value
				},
			},
		},
	)

export { useSupabaseServer }
