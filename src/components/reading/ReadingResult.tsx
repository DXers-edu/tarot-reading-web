import { Orientation, SelectedCard, Spread, TarotKeyword } from '@/lib/tarot/types';
import { Button } from '../ui/button';
import { useMemo } from 'react';
import { summarizeCard } from '@/lib/tarot/logic';
import { classExpression } from '@/lib/common';

type SelectedDigest = {
    positionLabel: string;
    slug: string;
    name: string;
    means: string;
    keywords: TarotKeyword[];
    orientation: Orientation;
    summary: string;
}

interface CardSummaryProps {
    selectedDigest: SelectedDigest
}

function CardSummary ({ selectedDigest }: CardSummaryProps) {
    return (
        <div className='flex gap-4 rounded-2xl border border-white/10 bg-white/4 p-3'>
            <div className='min-h-60 min-w-40 max-h-60 max-w-40'>
                <img 
                    src={`/images/cards/${selectedDigest.slug}.png`} 
                    alt={selectedDigest.slug} 
                    className={classExpression(
                        'h-full w-full',
                        selectedDigest.orientation === '역방향' && 'rotate-180'
                    )}
                />
            </div>
            <div className='flex flex-col gap-1'>
                <h4 className='text-xs font-extrabold text-white/70'>{selectedDigest.positionLabel}</h4>
                <h5 className='text-sm font-black text-white/90'>{selectedDigest.name}</h5>
                <p className='text-xs text-white/60'>{selectedDigest.summary}</p>
                <p className='text-xs text-white/60'>{selectedDigest.means}</p>
                <p className='text-xs text-white/60'>
                    {selectedDigest.keywords.find(keyword => {
                        const up = selectedDigest.orientation === '정방향';
                        const result = up ? keyword.type === '정방향' : keyword.type === '역방향';
                        return result;
                    })!.description}
                </p>
            </div>
        </div>
    )
}

interface Props {
    question: string;
    spread: Spread | null;
    selectedCards: SelectedCard[];
}

export default function ReadingResult ({ question, spread, selectedCards }: Props) {

    if (!spread) return null;

    const selectedDigest = useMemo(() => {
        const selectedDigest: SelectedDigest[] = selectedCards.map(selectedCard => ({
            positionLabel: selectedCard.positionLabel,
            slug: selectedCard.card.slug,
            name: selectedCard.card.name,
            means: selectedCard.card.means,
            keywords: selectedCard.card.keywords,
            orientation: selectedCard.orientation,
            summary: summarizeCard(selectedCard.card, selectedCard.orientation)
        }))
        return selectedDigest;
    }, [selectedCards]);

    return (
        <div className='space-y-3'>
            <div className='rounded-2xl border border-white/10 bg-white/4 p-3'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-sm font-black tracking-tight'>결과 해석</h2>
                            </div>
                        <div>
                            <Button variant='primary' onClick={() => {}}>다시 해석하기</Button>
                        </div>
                    </div>
                    <div className='text-xs text-white/80'>사용자 질문: {question}</div>
                    <div className='text-xs text-white/80'>선택된 스프래드: {spread.name}</div>
                </div>
            </div>
            <div className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4'>
                <h3 className='text-xs font-extrabold text-white/70'>선택 카드 설명</h3>
                <div className='space-y-3'>
                    {selectedDigest.map((selected, index) => (
                    <CardSummary key={index} selectedDigest={selected} />
                    ))}
                </div>
            </div>
        </div>
    );
}