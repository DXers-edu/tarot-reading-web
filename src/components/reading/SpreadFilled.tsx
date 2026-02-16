import { SelectedCard, Spread } from '@/lib/tarot/types'
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface SlotBoxProps {
    filledName?: string;
    onRemove?: () => void;
}

function SlotBox ({ filledName, onRemove }: SlotBoxProps) {
    const filled = !!filledName;

    return (
        <div className='relative flex flex-col h-30 w-45 bg-white/5'>
            {filled ?
            <>
            <img src='/images/cards/card-back-rotate.png' alt='card back' className='h-full w-full opacity-80' />
            {onRemove &&
            <button className='absolute right-2 top-2 bg-white/60 text-black/70 hover:bg-white/80' onClick={onRemove}>
                <X size={20} />
            </button>
            }
            </>:
            <img src='/images/cards/card-back-rotate.png' alt='card back' className='h-full w-full opacity-15' />
            }
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
            <div className='flex justify-between items-center gap-2'>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-sm font-black tracking-tight'>{name}</h3>
                    {desc && <p className='text-xs text-white/60'>{desc}</p>}
                </div>
                <div className='rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs font-extrabold text-white/70'>선택 상태</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
                {children}
            </div>
        </div>
    )
}

interface Props {
    spread: Spread | null;
    selectedCards: SelectedCard[];
    onRemoveByPositionIndex: (positionIndex: number) => void;
}

export default function SpreadFilled ({ spread, selectedCards, onRemoveByPositionIndex }: Props) {

    if (!spread) return null;

    const filled = Array.from({ length: spread.count }).map((_, index) => selectedCards[index] ?? null);

    if (spread.key === 'one-oracle') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex justify-center'>
                <SlotBox 
                    filledName={filled[0] ? filled[0].card.name : undefined} 
                    onRemove={filled[0] ? () => onRemoveByPositionIndex(0) : undefined}
                />
            </div>
        </Frame>
    )

    if (spread.key === 'three-card' || spread.key === 'choice') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex justify-center gap-3'>
                {Array.from({ length: spread.count }).map((_, index) => 
                <SlotBox
                    key={index}
                    filledName={filled[index] ? filled[index].card.name : undefined} 
                    onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                />
                )}
            </div>
        </Frame>
    )

    if (spread.key === 'hexagram') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='grid grid-cols-3 place-items-center gap-3'>
                {Array.from({ length: spread.count }).map((_, index) => 
                <SlotBox 
                    key={index}
                    filledName={filled[index] ? filled[index].card.name : undefined} 
                    onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                />
                )}
            </div>
        </Frame>
    )

    if (spread.key === 'horseshoe') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex flex-col items-center gap-3'>
                <div className='flex justify-center gap-3'>
                    {[0, 1, 2].map(index => 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
                <SlotBox 
                    filledName={filled[3] ? filled[3].card.name : undefined} 
                    onRemove={filled[3] ? () => onRemoveByPositionIndex(3) : undefined}
                />
                <div className='flex justify-center gap-3'>
                    {[4, 5, 6].map(index=> 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
            </div>
        </Frame>
    )

    if (spread.key === 'calendar' || spread.key === 'horoscope') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='grid grid-cols-4 place-items-center gap-3'>
                {Array.from({ length: spread.count }).map((_, index) => 
                <SlotBox 
                    key={index}
                    filledName={filled[index] ? filled[index].card.name : undefined} 
                    onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                />
                )}
            </div>
        </Frame>
    )

    if (spread.key === 'heart-sonata') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex flex-col items-center gap-3'>
                <div className='flex justify-center gap-3'>
                    {[0, 1].map(index => 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
                <div className='flex justify-center gap-3'>
                    {[2, 3, 4].map(index => 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
                <div className='flex justify-center gap-3'>
                    {[5, 6].map(index => 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
            </div>
        </Frame>
    )

    if (spread.key === 'celtic-cross') return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <div className='flex items-center justify-center gap-6'>
                <div className='relative h-55 w-70'>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <SlotBox 
                            filledName={filled[0] ? filled[0].card.name : undefined} 
                            onRemove={filled[0] ? () => onRemoveByPositionIndex(0) : undefined}
                        />
                    </div>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-95'>
                        <SlotBox 
                            filledName={filled[1] ? filled[1].card.name : undefined} 
                            onRemove={filled[1] ? () => onRemoveByPositionIndex(1) : undefined}
                        />
                    </div>
                    <div className='absolute left-1/2 -bottom-26 -translate-x-1/2'>
                        <SlotBox 
                            filledName={filled[2] ? filled[2].card.name : undefined} 
                            onRemove={filled[2] ? () => onRemoveByPositionIndex(2) : undefined}
                        />
                    </div>
                    <div className='absolute -left-35 top-1/2 -translate-y-1/2'>
                        <SlotBox 
                            filledName={filled[3] ? filled[3].card.name : undefined} 
                            onRemove={filled[3] ? () => onRemoveByPositionIndex(3) : undefined}
                        />
                    </div>
                    <div className='absolute left-1/2 -top-26 -translate-x-1/2'>
                        <SlotBox 
                            filledName={filled[4] ? filled[4].card.name : undefined} 
                            onRemove={filled[4] ? () => onRemoveByPositionIndex(4) : undefined}
                        />
                    </div>
                    <div className='absolute -right-35 top-1/2 -translate-y-1/2'>
                        <SlotBox 
                            filledName={filled[5] ? filled[5].card.name : undefined} 
                            onRemove={filled[5] ? () => onRemoveByPositionIndex(5) : undefined}
                        />
                    </div>
                </div>
                <div className='ml-35 flex flex-col items-center gap-3'>
                    {[6, 7, 8, 9].map(index => 
                    <SlotBox 
                        key={index}
                        filledName={filled[index] ? filled[index].card.name : undefined} 
                        onRemove={filled[index] ? () => onRemoveByPositionIndex(index) : undefined}
                    />
                    )}
                </div>
            </div>
        </Frame>
    )

    return (
        <Frame name={spread.name} desc={`${spread.desc} - ${spread.count} 장`}>
            <p className='text-sm text-white/60'>이 스프레드는 아직 미리보기가 준비되지 않았습니다.</p>
        </Frame>
    )
}