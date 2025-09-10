// app/api/button-status/route.js

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { supa } from '@supabase/supabase-js';

export async function GET() {
    try {
        const { data, error } = await supa
            .from('settings')
            .select('value')
            .eq('key', 'enroll_button')
            .single();

        if (error) {
            // If no row is found, it's not an error, just return a default value
            if (error.code === 'PGRST116') {
                return NextResponse.json({ enabled: true }); // Default to enabled
            }
            throw error;
        }
        return NextResponse.json(data.value);

    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // 1. Check for your custom admin key
        const adminKey = req.headers.get('x-admin-key');
        if (adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Create a secure, server-only Supabase client for this admin action
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
        );

        const value = await req.json(); // expect { enabled: true/false }

        // 3. Use the secure admin client to write to the database
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