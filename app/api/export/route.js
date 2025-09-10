import { supa } from '@/lib/supabase';
import { Parser } from 'json2csv';

export async function GET(req) {
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_KEY) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });

    const { data, error } = await supa.from('applications').select('*').order('created_at', { ascending: false });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    const parser = new Parser();
    const csv = parser.parse(data);

    return new Response(csv, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="applications.csv"'
        }
    });
}
