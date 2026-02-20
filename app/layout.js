import './globals.css';

export const metadata = {
    title: 'Aakarshak Swaraj | Portfolio',
    description: 'Personal portfolio of Aakarshak Swaraj - Software Engineer, Full-Stack Developer, AI/ML Enthusiast, and Computer Science student at VIT Chennai.',
    keywords: ['portfolio', 'software engineer', 'developer', 'AI', 'ML', 'full-stack', 'VIT Chennai'],
    authors: [{ name: 'Aakarshak Swaraj' }],
    openGraph: {
        title: 'Aakarshak Swaraj | Portfolio',
        description: 'Personal portfolio of Aakarshak Swaraj - Software Engineer & AI/ML Enthusiast',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
