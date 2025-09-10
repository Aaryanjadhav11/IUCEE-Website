// lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables exist
if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    console.error('SUPABASE_URL:', !!supabaseUrl);
    console.error('SUPABASE_ANON_KEY:', !!supabaseKey);
}

export const supa = createClient(supabaseUrl, supabaseKey);

// Alternative: export as default if you prefer
// export default supa;