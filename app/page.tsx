// app/page.tsx
import { redirect } from 'next/navigation';

export default function Page() {
    // Serve the static site from /site/index.html
    redirect('/site/index.html');
}
