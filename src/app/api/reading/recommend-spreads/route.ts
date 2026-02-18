import { RecommendSpreadsRequestDto } from '@/lib/dto/reading/request';
import { openaiClient, RECOMMEND_SPREADS_SCHEMA } from '@/lib/openai';
import { SPREADS } from '@/lib/tarot/spreads';
import { SpreadKey } from '@/lib/tarot/types';
import { NextResponse } from 'next/server';

const VALID_KEYS = new Set<SpreadKey>(SPREADS.map(spread => spread.key));

export async function POST (request: Request) {
    const requestBody = await request.json() as RecommendSpreadsRequestDto;
    const { question } = requestBody;

    if (question.length < 5) {
        return NextResponse.json({ ok: false, error: '질문은 5자 이상이어야 합니다.' }, { status: 400 });
    }

    const prompt = [
        '너는 타로 리딩 UX 설계 보조자다.',
        '사용자의 질문을 보고, 아래 후보 스프레드 중 가장 적합한 스프레드 2개를 추천하라.',
        '',
        '규칙: ',
        '- 반드시 후보 목록의 key만 사용한다.',
        '- 정확히 2개를 추천한다.',
        '- 각 추천마다 1~2문장의 이유를 작성한다.',
        '- 출력은 반드시 JSON만 출력한다. (추가 텍스트 금지)',
        '',
        '사용자 질문: ',
        question,
        '',
        '후보 스프레드 목록: ',
        JSON.stringify(SPREADS),
    ].join('\n');

    try {
        const response = await openaiClient.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.3,
            text: {
                format: {
                    type: 'json_schema',
                    name: 'spread_recommendation',
                    strict: true,
                    schema: RECOMMEND_SPREADS_SCHEMA,
                }
            }
        });

        const jsonText = response.output
            .flatMap((output: any) => output.content ?? [])
            .find((content) => content.type === 'output_text')
            .text ?? null;

        if (!jsonText) {
            return NextResponse.json({ ok: false, error: 'AI 결과가 없습니다.' }, { status: 500 }); 
        }

        const data = JSON.parse(jsonText);

        const keys = Array.isArray(data.recommendations) ? 
            data.recommendations.map((recommendation: any) => recommendation.key).filter(Boolean) : [];
        const normalized = keys.filter((key: any) => typeof key === 'string' && VALID_KEYS.has(key as SpreadKey)).slice(0, 2) as SpreadKey[];
        const finalKeys = normalized.length === 2 ? normalized : ['one-oracle', 'three-card'];

        const finalRecommendations =
            normalized.length === 2 && Array.isArray(data.recommendations) ?
                data.recommendations.filter((recommendation: any) => VALID_KEYS.has(recommendation.key as SpreadKey)).slice(0, 2)
                .map((recommendation: any) => ({
                    key: recommendation.key as SpreadKey,
                    reason: String(recommendation.reason ?? ''),
                })):
                finalKeys.map(key => ({
                    key,
                    reason: key === 'one-oracle' ?
                        '질문이 단순하거나 핵심만 뽑아 보고 싶을 때 적합해요.':
                        '질문을 현재/원인/흐름을 빠르게 정리하기 좋아요',
                }))
        
        return NextResponse.json({ ok: true, recommendations: finalRecommendations });
    } catch (exception) {
        return NextResponse.json({ ok: true, recommendations: ['one-oracle', 'three-card'].map(key => ({
            key,
            reason: key === 'one-oracle' ?
                '질문이 단순하거나 핵심만 뽑아 보고 싶을 때 적합해요.':
                '질문을 현재/원인/흐름을 빠르게 정리하기 좋아요',
        }))});
    }
}