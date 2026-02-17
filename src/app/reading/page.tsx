'use client'

import DeckPicker from '@/components/reading/DeckPicker';
import QuestionBox from '@/components/reading/QuestionBox';
import ReadingResult from '@/components/reading/ReadingResult';
import SpreadSelector from '@/components/reading/SpreadSelector';
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { classExpression } from '@/lib/common';
import { SPREAD_BY_KEY } from '@/lib/tarot/spreads';
import { SelectedCard, SpreadKey } from '@/lib/tarot/types';
import { ChangeEvent, useMemo, useState } from 'react';

// description: 1: 질문 입력 , 2: 스프레드 선택, 3: 카드 선택, 4: 결과 해석 //
type Step = 1 | 2 | 3 | 4;

export default function Reading() {

    const [step, setStep] = useState<Step>(1);

    const [question, setQuestion] = useState<string>('');
    const [selectedSpreadKey, setSelectedKey] = useState<SpreadKey | null>(null);
    const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

    const onQuestionChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        if (value.length > 200) return;
        setQuestion(value);
    };

    const onSpreadSelectedHandler = (key: SpreadKey) => {
        setSelectedKey(key);
    };

    const onSelectedCardChangeHandler = (selectedCards: SelectedCard[]) => {
        setSelectedCards(selectedCards);
    };

    const stepLabel = useMemo(() => {
        return step === 1 ? '1/4 질문 입력' :
            step === 2 ? '2/4 스프레드 선택' :
            step === 3 ? '3/4 카드 선택' :
            '4/4 결과 해석';
    }, [step]);

    const spread = useMemo(() => {
        return selectedSpreadKey ? SPREAD_BY_KEY.get(selectedSpreadKey) ?? null : null;
    }, [selectedSpreadKey]);

    const onStepClickHandler = (step: Step) => {
        switch (step) {
            case 1:
            setSelectedKey(null);
            case 2:
            setSelectedCards([]);
        }
        setStep(step);
    };

    return (
        <Card>
            <CardHeader title='리딩' description='질문 입력 > 스프레드 선택 > 카드 선택 > 결과 해석 으로 진행됩니다.' right={stepLabel} />
            <CardBody>
                <div className='mb-4 flex flex-wrap gap-2'>
                    <button 
                        className={classExpression(
                            'rounded-xl border px-3 py-2 text-xs font-extrabold',
                            step === 1 ? 'border-cyan-300/40 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 hover:bg-white/10'
                        )}
                        onClick={() => onStepClickHandler(1)}
                    >
                        질문 입력
                    </button>
                    <button 
                        className={classExpression(
                            'rounded-xl border px-3 py-2 text-xs font-extrabold',
                            step === 2 ? 'border-cyan-300/40 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 hover:bg-white/10',
                            step < 2 && 'opacity-40 cursor-not-allowed hover:bg-white/5'
                        )}
                        disabled={step < 2}
                        onClick={() => onStepClickHandler(2)}
                    >
                        스프레드 선택
                    </button>
                    <button 
                        className={classExpression(
                            'rounded-xl border px-3 py-2 text-xs font-extrabold',
                            step === 3 ? 'border-cyan-300/40 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 hover:bg-white/10',
                            step < 3 && 'opacity-40 cursor-not-allowed hover:bg-white/5'
                        )}
                        disabled={step < 3}
                        onClick={() => onStepClickHandler(3)}
                    >
                        카드 선택
                    </button>
                    <button
                        className={classExpression(
                            'rounded-xl border px-3 py-2 text-xs font-extrabold',
                            step === 4 ? 'border-cyan-300/40 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 hover:bg-white/10',
                            step < 4 && 'opacity-40 cursor-not-allowed hover:bg-white/5'
                        )}
                        disabled={step < 4}
                        onClick={() => onStepClickHandler(4)}
                    >
                        결과 해석
                    </button>
                </div>
                {step === 1 && <QuestionBox question={question} onChange={onQuestionChangeHandler} onNext={onStepClickHandler} />}
                {step === 2 && <SpreadSelector selectedKey={selectedSpreadKey} onSelect={onSpreadSelectedHandler} onNext={onStepClickHandler} />}
                {step === 3 && <DeckPicker spread={spread} question={question} selectedCards={selectedCards} setSelectedCards={onSelectedCardChangeHandler} onNext={onStepClickHandler} />}
                {step === 4 && <ReadingResult question={question} spread={spread} selectedCards={selectedCards} />}
            </CardBody>
        </Card>
    )
}
