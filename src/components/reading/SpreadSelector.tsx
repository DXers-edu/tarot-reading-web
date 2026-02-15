import { classExpression } from "@/lib/common";
import { SPREAD_BY_KEY, SPREADS } from "@/lib/tarot/spreads";
import { SpreadKey } from "@/lib/tarot/types";
import { Button } from "../ui/button";
import SpreadPreview from "./SpreadPreview";

interface Props {
    selectedKey: SpreadKey | null;
    onSelect: (key: SpreadKey) => void;
    onNext: (step: 1 | 2 | 3 | 4) => void;
}

export default function SpreadSelector ({ selectedKey, onSelect, onNext }: Props) {

    const canNext = !!selectedKey;
    const selectedSpread = selectedKey ? SPREAD_BY_KEY.get(selectedKey) ?? null : null;

    return (
        <div className='space-y-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-sm font-extrabold text-white/85'>스프레드 선택</h2>
                <p className='text-xs text-white/55'>질문 유형에 따라 추천 스프레드가 출력됩니다. 혹은 직접 선택할 수 도 있습니다.</p>
            </div>
            {/* TODO: 추천 스프레드 영역 */}
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