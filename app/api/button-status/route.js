import { supa } from '../../../lib/supabase.js';

export async function GET() {
    const { data, error } = await supa.from('settings').select('value').eq('key', 'enroll_button').single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data.value));
}

export async function POST(req) {
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_KEY) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });

    const value = await req.json(); // expect { enabled: true/false }
    const { error } = await supa.from('settings').upsert({ key: 'enroll_button', value });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }));
}
