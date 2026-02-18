import { classExpression } from '@/lib/common';
import { SPREAD_BY_KEY, SPREADS } from '@/lib/tarot/spreads';
import { SpreadKey } from '@/lib/tarot/types';
import { Button } from '../ui/button';
import SpreadPreview from './SpreadPreview';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RecommendSpreadsRequestDto } from '@/lib/dto/reading/request';

interface Props {
    selectedKey: SpreadKey | null;
    question: string;
    onSelect: (key: SpreadKey) => void;
    onNext: (step: 1 | 2 | 3 | 4) => void;
}

export default function SpreadSelector ({ selectedKey, question, onSelect, onNext }: Props) {

    const [aiLoading, setAiLoading] = useState<boolean>(true);
    const [recommendSpreads, setRecommendSpreads] = useState<{ key: SpreadKey, reason: string }[]>([]);

    const canNext = !!selectedKey;
    const selectedSpread = selectedKey ? SPREAD_BY_KEY.get(selectedKey) ?? null : null;

    const recommendSpreadsResponse = (response: AxiosResponse) => {
        const { recommendations } = response.data;
        setRecommendSpreads(recommendations);
        setAiLoading(false);
    };

    const recommendSpreadsErrorResponse = () => {
        setRecommendSpreads([]);
        setAiLoading(false);
    };

    useEffect(() => {
        setAiLoading(true);
        const requestBody: RecommendSpreadsRequestDto = {
            question
        }
        axios.post('/api/reading/recommend-spreads', requestBody)
        .then(recommendSpreadsResponse)
        .catch(recommendSpreadsErrorResponse);
    }, [question]);

    return (
        <div className='space-y-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-extrabold text-white/85'>스프레드 선택</h2>
                <p className='text-xs text-white/55'>질문 유형에 따라 추천 스프레드가 출력됩니다. 혹은 직접 선택할 수 도 있습니다.</p>
            </div>
            {aiLoading ? 
            <div className='rounded-2xl border border-white/10 bg-white/4 p-3 text-sm text-white/70'>
                질문을 분석중 입니다. (AI 추천 스프레드가 이곳에 표시됩니다. 잠시만 기다려주세요.)
            </div>:
            <div className='flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/4 p-3'>
                <h3 className='text-xs font-extrabold text-white/70'>추천 스프레드</h3>
                <div className='flex flex-wrap gap-2'>
                    {recommendSpreads.map((recommendSpread, index) => {
                    const active = recommendSpread.key === selectedKey;
                    const spread = SPREADS.find(spread => recommendSpread.key === spread.key);
                    if (!spread) return null;
                    return (
                    <button 
                        key={index} 
                        onClick={() => onSelect(spread.key)}
                        className={classExpression(
                            'flex flex-col gap-1 rounded-xl border px-3 py-2 text-xs font-extrabold transition',
                            active ? 'border-cyan-300/40 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        <h4 className='text-[12px]'>{spread.name}</h4>
                        <p className='text-[11px] text-white/55'>{spread.desc} - {spread.count} 장</p>
                    </button>
                    )
                    })}
                </div>
            </div>
            }
            <div className='flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/4 p-3'>
                <h3 className='text-xs font-extrabold text-white/70'>전체 스프레드</h3>
                <div className='grid gird-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                    {SPREADS.map(spread => {
                    const active = spread.key === selectedKey;
                    return (
                        <button
                            key={spread.key}
                            className={classExpression(
                                'flex flex-col gap-2 rounded-2xl border p-3 transition',
                                active ? 'border-violet-300/35 bg-violet-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                            )}
                            onClick={() => onSelect(spread.key)}
                        >
                            <div className='flex items-start justify-between gap-2'>
                                <div className='text-sm font-black tracking-tight'>{spread.name}</div>
                                <div className='rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-extrabold text-white/70'>{spread.count} 장</div>
                            </div>
                            <div className='text-xs text-white/60'>{spread.desc}</div>
                            <div className='mt-1 flex flex-wrap gap-1'>
                                {spread.themes.map((theme, index) =>
                                <span key={index} className='rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-extrabold text-white/65'>{theme}</span>
                                )}
                            </div>
                        </button>
                    )
                    })}
                </div>
            </div>
            <div>
                <SpreadPreview spread={selectedSpread} />
            </div>
            <div>
                <Button variant='primary' onClick={() => onNext(3)} disabled={!canNext}>다음: 카드 선택</Button>
            </div>
        </div>
    );
}