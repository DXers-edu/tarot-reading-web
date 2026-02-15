import { ChangeEvent } from "react";
import { Button } from "../ui/button";

interface Props {
    question: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onNext: (step: 1 | 2 | 3 | 4) => void;
}

export default function QuestionBox ({ question, onChange, onNext }: Props) {

    const canNext = question.trim().length >= 5;

    return (
        <div className='space-y-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-extrabold text-white/85'>질문 입력</h2>
                <p className="text-xs text-white/55">예) "이직해도 될까요?", "상대방의 마음은?", "이번달 흐름은?"</p>
            </div>
            <textarea 
                value={question}
                onChange={onChange}
                placeholder='질문을 입력하세요.'
                className='h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/20' 
            />
            <div>
                <Button variant='primary' onClick={() => onNext(2)} disabled={!canNext}>
                    다음: 스프레드 선택
                </Button>
            </div>
        </div>
    )
}