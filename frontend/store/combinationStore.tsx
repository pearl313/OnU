import { create } from 'zustand';

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

type combination = {
  combinationId: number;
  nutrientInfoList: Array<InfoList>;
};

type combinationState = {
  combinations: Array<combination>;

  setCombinations: (newCombination: combination) => void;
  removeCombination: (combinationId: number) => void;
  resetCombinations: () => void;
};

export const combinationStore = create<combinationState>((set) => ({
  combinations: [],

  setCombinations: (newCombination: combination): void =>
    set(
      (
        state: combinationState,
      ): { combinations: Array<combination> } => ({
        combinations: [...state.combinations, newCombination],
      }),
    ),
  removeCombination: (combinationId: number): void =>
    set(
      (
        state: combinationState,
      ): { combinations: Array<combination> } => ({
        combinations: state.combinations.filter(
          (combination: combination) =>
            combination.combinationId !== combinationId,
        ),
      }),
    ),

  resetCombinations: (): void =>
    set(() => ({
      combinations: [],
    })),
}));
