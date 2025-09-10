// app/api/button-status/route.js

import { createClient } from '@supabase/supabase-js'; // For the secure POST function
import { NextResponse } from 'next/server';
import { supa } from '../../../lib/supabase.js'; // For the public GET function

// This function is public and uses the client-side `supa` instance from your lib file.
export async function GET() {
    try {
        const { data, error } = await supa
            .from('settings')
            .select('value')
            .eq('key', 'enroll_button')
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ enabled: true }); // Default to enabled if no setting is found
            }
            throw error;
        }
        return NextResponse.json(data.value);

    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// This function is an admin action and creates its own secure client.
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