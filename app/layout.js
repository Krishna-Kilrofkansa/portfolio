import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import 'katex/dist/katex.min.css';
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
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body>
                {children}
            </body>
        </html>
    );
}
