// app/api/button-status/route.js
import { NextResponse } from 'next/server';
import { supabase as supa } from '../../../lib/supabase.js'; // adjust if you exported supa

export async function GET() {
    try {
        const client = supa;
        if (!client) throw new Error('Supabase client not initialized');

        const { data, error } = await client
            .from('settings')
            .select('value')
            .eq('key', 'enroll_button')
            .maybeSingle();

        if (error) throw error;

        // default enabled = true unless stored value explicitly false
        let enabled = true;
        if (data && data.value !== undefined && data.value !== null) {
            if (typeof data.value === 'boolean') enabled = data.value;
            else {
                try { enabled = JSON.parse(String(data.value)); }
                catch { enabled = String(data.value).toLowerCase() === 'true'; }
            }
        }

        return NextResponse.json({ enabled });
    } catch (err) {
        console.error('GET Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
