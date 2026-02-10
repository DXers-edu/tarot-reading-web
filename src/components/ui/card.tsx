import { classExpression } from '@/lib/common';
import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card ({ children, className }: CardProps) {
    return (
        <section className={classExpression(
            'rounded-2xl border border-white/10 bg-white/5 shadow-[0_16px_36px_rgba(0, 0, 0, 0.35)]',
            className
        )}>
            {children}
        </section>
    );
}

interface CardHeaderProps {
    title: string;
    description?: string;
    right?: ReactNode;
    className?: string;
}

export function CardHeader ({ title, description, right, className }: CardHeaderProps) {
    return (
        <div className={classExpression(
            'flex items-center justify-between gap-3 border-b border-white/10 bg-white/4 px-4 py-3',
            className
        )}>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[15px] font-black tracking-tight'>{title}</h2>
                {description &&
                <p className='text-[13px] leading-relaxed text-white/65'>
                    {description}
                </p>
                }
            </div>
            {right &&
            <div className='shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-extrabold text-white/70'>
                {right}
            </div>
            }
        </div>  
    );
}

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

export function CardBody ({ children, className }: CardBodyProps) {
    return (
        <div className={classExpression('p-4', className)}>
            {children}
        </div>
    )
}