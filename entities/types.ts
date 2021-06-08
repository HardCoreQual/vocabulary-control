export type RepeatedWordType = { word: string, count: number };

export interface RepeatedWords {
    get() : RepeatedWordType[];
}
