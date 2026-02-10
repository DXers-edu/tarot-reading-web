import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode
}

export function Container ({ children }: ContainerProps) {
    return (
        <section className='mx-auto w-full max-w-6xl px-5'>
            {children}
        </section>
    );
}