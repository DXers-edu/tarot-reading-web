import { SelectedCard, Spread, TarotCard } from '@/lib/tarot/types';
import { Button } from '../ui/button';
import { classExpression } from '@/lib/common';
import { useEffect, useMemo, useState } from 'react';
import { TAROT_CARDS } from '@/lib/tarot/cards';
import { randomOrientation, shuffle } from '@/lib/tarot/logic';
import SpreadFilled from './SpreadFilled';

interface CardTileProps {
    card: TarotCard;
    disabled: boolean;
    pickedLabel?: string;
    onClick: () => void;
}

function CardTile ({ card, disabled, pickedLabel, onClick }: CardTileProps) {

    const isPicked = !!pickedLabel;

    return (
        <button
            className={classExpression(
                'relative h-45 w-30 shrink-0 border transition',
                isPicked ? 'bottom-3' : 'bottom-0',
                disabled && !isPicked && 'opacity-35 cursor-not-allowed hover:bg-white/5'
            )}
            onClick={onClick}
            disabled={disabled && !isPicked}
            title={card.slug}
        >
            <img src='/images/cards/card-back.png' alt='card back' className='h-full w-full' />
        </button>
    );
}

interface Props {
    spread: Spread | null;
    question: string;
    selectedCards: SelectedCard[];
    setSelectedCards: (selectedCards: SelectedCard[]) => void;
    onNext: (step: 1 | 2 | 3 | 4) => void;
}

export default function DeckPicker ({ spread, question, selectedCards, setSelectedCards, onNext }: Props) {

    if (!spread) return null;

    const [deck, setDeck] = useState<TarotCard[]>([]);

    const finished = selectedCards.length >= spread.count;

    const pickedIndexToLabel = useMemo(() => {
        const map = new Map<number, string>();
        selectedCards.forEach(card => map.set(card.deckIndex, card.positionLabel));
        return map;
    }, [selectedCards]);

    const onResetButtonClickHandler = () => {
        setSelectedCards([]);
    };

    const onCardClickHandler = (deckIndex: number) => {
        if (!deck.length) return;

        const existIndex = selectedCards.findIndex(card => card.deckIndex === deckIndex);
        if (existIndex >= 0) {
            const next = [...selectedCards];
            next.splice(existIndex, 1);
            const relabeled = next.map((selected, index) => ({
                ...selected,
                positionLabel: spread.positions[index] ?? `카드 ${index + 1}`,
            }));
            setSelectedCards(relabeled);
            return;
        }

        if (selectedCards.length >= spread.count) return;

        const nextIndex = selectedCards.length;
        const positionLabel = spread.positions[nextIndex] ?? `카드 ${nextIndex + 1}`;

        const card = deck[deckIndex];
        const orientation = randomOrientation();

        const next: SelectedCard[] = [
            ...selectedCards,
            { deckIndex, card, orientation, positionLabel },
        ]

        setSelectedCards(next);
    };

    const onRemoveByPositionIndexHandler = (positionIndex: number) => {
        const next = [...selectedCards];
        next.splice(positionIndex, 1);
        const relabeled = next.map((selected, index) => ({
            ...selected,
            positionLabel: spread.positions[index] ?? `카드 ${index + 1}`,
        }));
        setSelectedCards(relabeled);
    };

    useEffect(() => {
        setDeck(shuffle(TAROT_CARDS));
    }, [spread, question]);

    return (
        <div className='space-y-3'>
            <div className='rounded-2xl border border-white/10 bg-white/4 p-3'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-sm font-black tracking-tight'>{spread.name}</h2>
                            <p className='text-xs text-white/60'>선택된 카드:{' '}<span className='font-extrabold text-white/80'>{selectedCards.length}</span>{' / '}{spread.count}</p>
                        </div>
                        <div>
                            <Button variant='ghost' onClick={onResetButtonClickHandler}>초기화</Button>
                        </div>
                    </div>
                    <div className='text-xs text-white/80'>사용자 질문: {question}</div>
                </div>
            </div>
            <div>
                <Button variant='primary' onClick={() => onNext(4)} disabled={!finished}>다음: 결과 해석</Button>
            </div>
            <div className='rounded-2xl py-5 px-3 border border-white/10 bg-white/5 overflow-x-auto'>
                <div className='flex w-max items-center gap-2'>
                    {deck.map((card, index) => {
                        const label = pickedIndexToLabel.get(index);
                        return (
                        <CardTile key={index} pickedLabel={label} card={card} disabled={selectedCards.length >= spread.count} onClick={() => onCardClickHandler(index)} />
                        )
                    })}
                </div>
            </div>

            <SpreadFilled spread={spread} selectedCards={selectedCards} onRemoveByPositionIndex={onRemoveByPositionIndexHandler} />
        </div>
    );
}