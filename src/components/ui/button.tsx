import { classExpression } from '@/lib/common';
import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition hover:-translate-y-[1px] active:translate-y-0'

const variants: Record<Variant, string> = {
    primary: 'bg-[#F5F0C4] text-slate-950 shadow-lg shadow-violet-500/10 hover:brightness-105',
    secondary: 'border border-white/15 bg-white/15 text-white hover:bg-white/10',
    ghost: 'border border-violet-300/25 bg-violet-400/10 text-white hover:bg-violet-400/15'
};

interface ButtonProps {
    children: ReactNode;
    variant?: Variant;
    type?: 'button' | 'submit';
    onClick: () => void;
    disabled?: boolean;
}

export function Button ({ children, variant = 'secondary', type = 'button', onClick, disabled }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classExpression(
            base,
            variants[variant],
            disabled ? 'cursor-not-allowed opacity-40 hover:translate-y-0' : ''
        )}>
            {children}
        </button>
    );
}

interface ButtonLinkProps {
    href: string;
    children: ReactNode;
    variant?: Variant;
}

export function ButtonLink ({ href, children, variant = 'secondary' }: ButtonLinkProps) {
    return (
        <Link className={classExpression(base, variants[variant])} href={href}>
            {children}
        </Link>
    )
}