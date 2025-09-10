// app/api/button-status/route.js

export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create Supabase client function
function getSupabaseClient() {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY, // Use anon key for public reads
        { auth: { persistSession: false } }
    );
}

// Public GET function
export async function GET() {
    try {
        const supabase = getSupabaseClient();

        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'enroll_button')
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ enabled: true }); // Default to enabled
            }
            throw error;
        }

        return NextResponse.json(data.value);

    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ enabled: true }, { status: 200 }); // Fallback to enabled
    }
}

// Admin POST function
export async function POST(req) {
    try {
        const adminKey = req.headers.get('x-admin-key');
        if (adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
        );

        const value = await req.json();

        const { error } = await supabaseAdmin
            .from('settings')
            .upsert({ key: 'enroll_button', value });

        if (error) {
            throw error;
        }

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}