import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	// TODO: Generate safe key
	process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY,
	// process.env.SUPABASE_ADMIN_KEY
)

export { supabase }
