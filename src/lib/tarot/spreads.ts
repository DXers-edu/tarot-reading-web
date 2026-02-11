import { Spread } from "./types";

export const SPREADS: Spread[] = [
    {
        key: 'one-oracle',
        name: '원 오라클',
        count: 1,
        desc: '즉답/키워드',
        themes: ['빠른 결정', '오늘의 방향', '한 가지 조언'],
        positions: ['핵심 메시지'],
    },
    {
        key: 'three-card',
        name: '쓰리 카드',
        count: 3,
        desc: '가장 무난한 구조',
        themes: ['과거-현재-미래', '상황-행동-결과', '문제-원인-해결'],
        positions: ['카드 1', '카드 2', '카드 3'],
    },
    {
        key: 'choice',
        name: '양자 택일',
        count: 2,
        desc: 'A vs B 비교',
        themes: ['둘 중 무엇을 선택?', '두 방향 비교', '더 안정적인 쪽'],
        positions: ['선택지 A', '선택지 B'],
    },
    {
        key: 'hexagram',
        name: '헥사그램',
        count: 6,
        desc: '6단계 흐름',
        themes: ['과정/전개', '6단계 로드맵', '상승/하강'],
        positions: ['1단계', '2단계', '3단계', '4단계', '5단계', '6단계'],
    },
    {
        key: 'celtic-cross',
        name: '켈틱 크로스',
        count: 10,
        desc: '표준 확장',
        themes: ['복잡한 고민', '원인/장애/전망', '핵심 정리'],
        positions: ['현재', '장애/도전', '기반', '과거', '목표', '가까운 미래', '자기', '주변', '희망/두려움', '결론'],
    },
    {
        key: 'horseshoe',
        name: '호스슈',
        count: 7,
        desc: '과거~결론',
        themes: ['프로젝트 흐름', '관계 진행', '결론 로드맵'],
        positions: ['과거', '현재', '숨은 영향', '장애', '주변', '조언', '결론'],
    },
    {
        key: 'horoscope',
        name: '호로스코프',
        count: 12,
        desc: '영역별 점검',
        themes: ['연간/분기 점검', '인생 영역 점검', '전반 컨디션'],
        positions: ['1하우스','2하우스','3하우스','4하우스','5하우스','6하우스','7하우스','8하우스','9하우스','10하우스','11하우스','12하우스'],
    },
    {
        key: 'heart-sonata',
        name: '하트 소나',
        count: 7,
        desc: '감정/관계',
        themes: ['연애 고민', '관계 회복', '감정 정리'],
        positions: ['나의 마음', '상대의 마음', '현재의 연결', '갈등 요인', '필요한 대화', '현실적 행동', '가까운 결말'],
    },
    {
        key: 'calendar',
        name: '캘린더',
        count: 12,
        desc: '기간 전망',
        themes: ['월별 운세', '월간 흐름', '연간 계획'],
        positions: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    },
];

export const SPREAD_BY_KEY = new Map(SPREADS.map((s) => [s.key, s]));
