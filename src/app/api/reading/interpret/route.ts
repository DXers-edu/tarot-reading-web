import { InterpretRequestDto } from '@/lib/dto/reading/request';
import { INTERPRET_SCHEMA, openaiClient } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST (request: Request) {
    const body = await request.json() as InterpretRequestDto;
    const { question, spreadKey, selectedCards } = body;

    if (!question || question.length < 5 || !spreadKey || !selectedCards || selectedCards.length < 1)
        return NextResponse.json({ ok: false, error: '질문, 스프레드, 카드를 모두 선택 혹은 입력해야합니다.' }, { status: 400 });

    const prompt = [
        '너는 숙력된 타로 리더이자 상담 코치다.',
        '신비주의 과장 없이 현실적인 조언을 하되, 상징(키워드)/심리/행동을 연결해 깊이 있게 설명한다.',
        '질문(question) + 스프레드 포지션(spreadKey) + 각 카드의 정/역방향을 근거로 카드별 해석과 종합 해석을 만든다.',
        '',
        '각 카드 해석에는 반드시: ',
        '(1) 핵심 키워드 3~5개,',
        '(2) 포지션에서의 의미,', 
        '(3) 정/역방향에 따른 뉘앙스 차이,',
        '(4) 질문에 대한 구체적 적용,',
        '(5) 지금 당장 할 수 있는 행동 2가지 + 피해야 할 함정 1가지를 포함한다.',
        '',
        '카드 간 연결(앞/뒤 카드와의 흐름)도 1문장 이상 언급한다.',
        '각 카드별로 100자 이상으로 정리한다.',
        '종합 해석은 전체 흐름(현재 -> 원인 -> 전개 -> 조언)을 400자로 정리하고, 실행 플랜 3단계를 제시한다.',
        '',
        '절대적으로 존댓말 사용.',
        '단정적 예언(확정/절대), 공포 조장 금지.',
        '출력은 반드시 JSON 스키마를 100% 준수하여 JSON 외 텍스트는 절대 출력하지 않는다.',
        '',
        JSON.stringify({ question, spreadKey, selectedCards })
    ].join('\n');

    try {
        const response = await openaiClient.responses.create({
            model: 'gpt-5',
            input: prompt,
            text: {
                format: {
                    type: 'json_schema',
                    name: 'tarot_reading_interpretation',
                    strict: true,
                    schema: INTERPRET_SCHEMA
                }
            }
        })

        const jsonText = response.output
            .flatMap((output: any) => output.content ?? [])
            .find((content) => content.type === 'output_text')
            .text ?? null;

        if (!jsonText) return NextResponse.json({ ok: false, error: 'AI 결과가 없습니다.' }, { status: 500 });

        const data = JSON.parse(jsonText);
        return NextResponse.json({ ok: true, data });
    } catch(exception: any) {
        console.log(exception.message)
        return NextResponse.json({ ok: false, error: 'AI 분석 중 에러가 발생했습니다.' }, { status: 500 });
    }
}