// app/api/export/route.js

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Parser } from 'json2csv';

export async function GET(req) {
    try {
        // --- Security Check 1: Custom Admin Key ---
        const providedAdminKey = req.headers.get('x-admin-key');
        if (providedAdminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // --- Security Check 2: Use the Secure Supabase Client ---
        // Create a server-only Supabase client with the service role key
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            { auth: { persistSession: false } }
        );

        // Fetch data using the admin client
        const { data, error } = await supabaseAdmin
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
        }

        // Convert data to CSV
        const parser = new Parser();
        const csv = parser.parse(data);

        // Return the CSV as a downloadable file
        return new Response(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="applications.csv"'
            }
        });

    } catch (e) {
        console.error('API Route Error:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}