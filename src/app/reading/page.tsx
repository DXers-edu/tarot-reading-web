'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { classExpression } from '@/lib/common';
import { useMemo, useState } from 'react';

// description: 1: 질문 입력 , 2: 스프레드 선택, 3: 카드 선택, 4: 결과 해석 //
type Step = 1 | 2 | 3 | 4;

export default function Reading() {

    const [step, setStep] = useState<Step>(4);

    const stepLabel = useMemo(() => {
        return step === 1 ? '1/4 질문 입력' :
            step === 2 ? '2/4 스프레드 선택' :
            step === 3 ? '3/4 카드 선택' :
            '4/4 결과 해석';
    }, [step]);

    const onStepClickHandler = (step: Step) => {
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
            </CardBody>
        </Card>
    )
}
