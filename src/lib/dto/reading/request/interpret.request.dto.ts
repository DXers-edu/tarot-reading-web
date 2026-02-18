import { SelectedCard, SpreadKey } from "@/lib/tarot/types";

export default interface InterpretRequestDto {
    question: string;
    spreadKey: SpreadKey;
    selectedCards: SelectedCard[];
}