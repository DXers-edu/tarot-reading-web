import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/ui/container';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '타로 리딩',
    description: 'OpenAI를 활용한 타로 서비스'
};

const MENUS = [
    { href: '/reading', name: '리딩' },
    { href: '/cards', name: '카드사전' },
    { href: '/spreads', name: '스프레드' },
    { href: '/guides', name: '가이드' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='ko'>
            <body className='min-h-screen bg-slate-950 text-white'>
                <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur'>
                    <Container>
                        <div className='flex items-center justify-between gap-16 py-3'>
                            <Link href='/' className='flex items-center gap-2 font-black tracking-tight'>
                                <img className='h-9 w-9 rounded-xl' src='/images/logo.png' />
                                <span>타로 리딩</span>
                            </Link>
                            <nav className='flex flex-wrap items-center justify-end gap-1 text-sm'>
                                {MENUS.map((menu, index) =>
                                <Link key={index} href={menu.href} className='rounded-xl px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white'>{menu.name}</Link>
                                )}
                                <Link href='/reading' className='ml-1 inline-flex items-center justify-center rounded-xl bg-[#F5F0C4] px-3 py-2 font-extrabold text-slate-950 shadow-lg shadow-violet-500/10 hover:brightness-105'>
                                    지금 뽑기
                                </Link>
                            </nav>
                        </div>
                    </Container>
                </header>
                <main className='py-6'>
                    <Container>{children}</Container>
                </main>
            </body>
        </html>
    );
}
