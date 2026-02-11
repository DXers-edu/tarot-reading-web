export type TarotCard = {
    type: TarotArcanaType;
    name: string;
    slug: string;
    means: string;
    keywords: TarotKeyword[];
    interpretations: TarotInterpretation[];
    appliedInterpretation: TarotAppliedInterpretation[];
};

export type TarotArcanaType = '메이저' | '마이너';

export type TarotKeyword = {
    type: TarotKeywordType;
    keyword: string;
    description: string;
};

export type TarotKeywordType = '기본' | '정방향' | '역방향';

export type TarotInterpretation = {
    type: TarotInterpretationType;
    forwardDirection: string;
    oppositeDirection: string;
};

export type TarotInterpretationType = '현재 상황' | '감정' | '문제의 원인' | '미래 전망' | '조언';

export type TarotAppliedInterpretation = {
    type: TarotAppliedInterpretationType;
    forwardDirection: string;
    oppositeDirection: string;
};

export type TarotAppliedInterpretationType = '연애' | '일' | '대인 관계' | '기타';

export type Spread = {
    key: SpreadKey;
    name: string;
    count: number;
    desc: string;
    themes: string[];
    positions: string[];
};

export type SpreadKey = 'one-oracle' | 'three-card' | 'choice' | 'hexagram' | 'celtic-cross' | 'horseshoe' | 'horoscope' | 'heart-sonata' | 'calendar';