import { Orientation, TarotCard } from './types';

export function shuffle<T>(originals: T[]): T[] {
    const shuffled = [...originals];
    for (let index = shuffled.length - 1; index > 0; index--) {
        const tmpIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[tmpIndex]] = [shuffled[tmpIndex], shuffled[index]];
    }
    return shuffled;
}

export function randomOrientation(): Orientation {
    return Math.random() < 0.5 ? '정방향' : '역방향';
}

export function summarizeCard (card: TarotCard, orientation: Orientation) {
    const keyword = card.keywords.find(keyword => keyword.type === orientation);
    if (!keyword) return '';
    return `${orientation} - ${keyword.keyword}`
}