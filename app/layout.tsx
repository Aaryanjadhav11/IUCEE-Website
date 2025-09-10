// app/layout.tsx
export const metadata = {
    title: 'IUCEE',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
