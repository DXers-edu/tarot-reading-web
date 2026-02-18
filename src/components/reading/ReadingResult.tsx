import { AiInterpretation, Orientation, SelectedCard, Spread, TarotKeyword } from '@/lib/tarot/types';
import { Button } from '../ui/button';
import { useEffect, useMemo, useState } from 'react';
import { summarizeCard } from '@/lib/tarot/logic';
import { classExpression } from '@/lib/common';
import { InterpretRequestDto } from '@/lib/dto/reading/request';
import axios, { AxiosResponse } from 'axios';

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

    const [aiLoading, setAiLoading] = useState<boolean>(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiResult, setAiResult] = useState<AiInterpretation | null>(null);

    const done = selectedCards.length === spread.count;
    const canRun = done && question.trim().length > 5;

    const interpretResponse = (response: AxiosResponse) => {
        const { data } = response.data;
        setAiResult(data);
    };

    const interpretErrorResponse = () => {
        setAiError('AI 해석 실패');
    };

    const interpretFinalResponse = () => {
        setAiLoading(false);
    };

    const interpretRequest = () => {
        if (!canRun || aiLoading) return;

        setAiLoading(true);
        setAiError(null);

        const requestBody: InterpretRequestDto = {
            question, spreadKey: spread.key, selectedCards
        };
        axios.post('/api/reading/interpret', requestBody)
            .then(interpretResponse)
            .catch(interpretErrorResponse)
            .finally(interpretFinalResponse);
    };

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

    useEffect(() => {
        if (!aiResult && canRun) interpretRequest();
    }, [canRun]);

    return (
        <div className='space-y-3'>
            <div className='rounded-2xl border border-white/10 bg-white/4 p-3'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-sm font-black tracking-tight'>결과 해석</h2>
                            </div>
                        <div>
                            <Button variant='primary' onClick={interpretRequest}>다시 해석하기</Button>
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
            {aiLoading ?
            <div className='rounded-2xl border border-white/10 bg-white/4 p-4 text-sm text-white/70'>
                AI가 카드를 해석 중입니다...
            </div>:
            aiError ?
            <div className='rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200'>
                {aiError}
            </div>:
            aiResult && 
            <div className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/4 p-4'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-sm font-extrabold text-white/85'>AI 해석 결과</h3>
                    <p className='text-[11px] font-extrabold text-white/60'>신뢰도: {aiResult.overall.confidence ?? '-'}</p>
                </div>
                <div className='flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3'>
                    <h3 className='text-xs font-extrabold text-white/70'>카드별 해석</h3>
                    <div className='space-y-3'>
                        {aiResult.cards.map((card, index) => 
                        <div key={index} className='flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/3 p-3'>
                            <div className='flex flex-wrap items-center justify-between gap-2'>
                                <h4 className='text-sx font-extrabold text-white/80'>{card.positionLabel} - {card.orientation}</h4>
                                <h5 className='text-[11px] font-extrabold text-white/60'>{card.cardSlug}</h5>
                            </div>
                            <p className='text-sm leading-relaxed text-white'>{card.interpretation}</p>
                            {Array.isArray(card.keyPoints) && 
                            <ul className='list-disc space-y-1 pl-5 text-xs text-white/65'>
                                {card.keyPoints.map((keyPoint, keyPointsIndex) => 
                                <li key={keyPointsIndex}>{keyPoint}</li>
                                )}
                            </ul>
                            }
                        </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3'>
                    <h3 className='text-xs font-extrabold text-white/70'>종합 해석</h3>
                    <p className='-mt-1 text-sm leading-relaxed text-white/75'>{aiResult.overall.summary}</p>
                    {Array.isArray(aiResult.overall.insights) &&
                    <>
                    <h4 className='text-xs font-extrabold text-white/70'>핵심 통찰</h4>
                    <ul className='-mt-2 list-disc space-y-1 pl-5 text-xs text-white/65'>
                        {aiResult.overall.insights.map((insight, insightIndex) => 
                        <li key={insightIndex}>{insight}</li>
                        )}
                    </ul>
                    </>
                    }
                    {Array.isArray(aiResult.overall.actionAdvice) &&
                    <>
                    <h4 className='ext-xs font-extrabold text-white/70'>실행 조언</h4>
                    <ul className='-mt-2 list-disc space-y-1 pl-5 text-xs text-white/65'>
                        {aiResult.overall.actionAdvice.map((advice, adviceIndex) => 
                        <li key={adviceIndex}>{advice}</li>
                        )}
                    </ul>
                    </>
                    }
                </div>
            </div>
            }
        </div>
    );
}