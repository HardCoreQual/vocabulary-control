export type RepeatedWordType = { word: string, count: number };

export interface RepeatedWords {
    get() : RepeatedWordType[];
}

export interface Words {
  get() : string[];
}
