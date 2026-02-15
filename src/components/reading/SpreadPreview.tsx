import { Spread } from '@/lib/tarot/types'
import { ReactNode } from 'react';

interface SlotProps {
    label: string;
}

function Slot ({ label }: SlotProps) {
    return (
        <div className='flex h-14 w-24 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[11px] font-extrabold text-white/70'>
            {label}
        </div>
    )
}

interface FrameProps {
    name: string;
    desc?: string;
    children: ReactNode;
}

function Frame ({ name, desc, children }: FrameProps) {
    return (
        <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/4 p-4'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-black tracking-tight'>{name}</h3>
                    {desc && <p className='text-xs text-white/60'>{desc}</p>}
                </div>
                <div className='rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-extrabold text-white/70'>미리보기</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
                {children}
            </div>
        </div>
    )
}

interface Props {
    spread: Spread | null;
}

export default function SpreadPreview ({ spread }: Props) {

    if (!spread)  return (
        <div className='rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-white/60'>
            스프레드를 선택하면 프리뷰가 나타납니다.
        </div>
    )

    const layout = (index: number) => spread.positions[index] ?? `카드 ${index + 1}`;

    if (spread.key === 'one-oracle') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex justify-center items-center'>
                <Slot label={layout(0)} />
            </div>
        </Frame>
    )

    if (spread.key === 'three-card') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex justify-center gap-3'>
                <Slot label={layout(0)} />
                <Slot label={layout(1)} />
                <Slot label={layout(2)} />
            </div>
        </Frame>
    )

    if (spread.key === 'choice') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex justify-center gap-3'>
                <Slot label={layout(0)} />
                <Slot label={layout(1)} />
            </div>
        </Frame>
    )

    if (spread.key === 'hexagram') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='grid grid-cols-3 place-items-center gap-3'>
                <Slot label={layout(0)} />
                <Slot label={layout(1)} />
                <Slot label={layout(2)} />
                <Slot label={layout(3)} />
                <Slot label={layout(4)} />
                <Slot label={layout(5)} />
            </div>
        </Frame>
    )

    if (spread.key === 'celtic-cross') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex items-center justify-center gap-6'>
                <div className='relative h-52.5 w-65'>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Slot label={layout(0)} />
                    </div>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-90'>
                        <Slot label={layout(1)} />
                    </div>
                    <div className='absolute left-1/2 bottom-0 -translate-x-1/2'>
                        <Slot label={layout(2)} />
                    </div>
                    <div className='absolute left-0 top-1/2 -translate-y-1/2'>
                        <Slot label={layout(3)} />
                    </div>
                    <div className='absolute left-1/2 top-0 -translate-x-1/2'>
                        <Slot label={layout(4)} />
                    </div>
                    <div className='absolute right-0 top-1/2 -translate-y-1/2'>
                        <Slot label={layout(5)} />
                    </div>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <Slot label={layout(6)} />
                    <Slot label={layout(7)} />
                    <Slot label={layout(8)} />
                    <Slot label={layout(9)} />
                </div>
            </div>
        </Frame>
    )

    if (spread.key === 'horseshoe') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex justify-center gap-3'>
                    <Slot label={layout(0)} />
                    <Slot label={layout(1)} />
                    <Slot label={layout(2)} />
                </div>
                <Slot label={layout(3)} />
                <div className='flex justify-center gap-3'>
                    <Slot label={layout(4)} />
                    <Slot label={layout(5)} />
                    <Slot label={layout(6)} />
                </div>
            </div>
        </Frame>
    )

    if (spread.key === 'horoscope') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='grid grid-cols-4 place-items-center gap-3'>
                <Slot label={layout(0)} />
                <Slot label={layout(1)} />
                <Slot label={layout(2)} />
                <Slot label={layout(3)} />
                <Slot label={layout(4)} />
                <Slot label={layout(5)} />
                <Slot label={layout(6)} />
                <Slot label={layout(7)} />
                <Slot label={layout(8)} />
                <Slot label={layout(9)} />
                <Slot label={layout(10)} />
                <Slot label={layout(11)} />
            </div>
        </Frame>
    )

    if (spread.key === 'heart-sonata') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex justify-center gap-3'>
                    <Slot label={layout(0)} />
                    <Slot label={layout(1)} />
                </div>
                <div className='flex justify-center gap-3'>
                    <Slot label={layout(2)} />
                    <Slot label={layout(3)} />
                    <Slot label={layout(4)} />
                </div>
                <div className='flex justify-center gap-3'>
                    <Slot label={layout(5)} />
                    <Slot label={layout(6)} />
                </div>
            </div>
        </Frame>
    )

    if (spread.key === 'calendar') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='grid grid-cols-4 place-items-center gap-3'>
                <Slot label={layout(0)} />
                <Slot label={layout(1)} />
                <Slot label={layout(2)} />
                <Slot label={layout(3)} />
                <Slot label={layout(4)} />
                <Slot label={layout(5)} />
                <Slot label={layout(6)} />
                <Slot label={layout(7)} />
                <Slot label={layout(8)} />
                <Slot label={layout(9)} />
                <Slot label={layout(10)} />
                <Slot label={layout(11)} />
            </div>
        </Frame>
    )

    return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='text-sm text-white/60'>이 스프레드는 아직 프리뷰가 존재하지 않습니다.</div>
        </Frame>
    )
}