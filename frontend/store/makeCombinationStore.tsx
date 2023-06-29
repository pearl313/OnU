import { create } from 'zustand';

type combListState = {
  combList: Array<number>;

  setFirstNewComb: (allCombs: Array<number>) => void;
  addSelected: (id: number) => void;
  removeSelected: (id: number) => void;
  resetCombList: () => void;
};

export const makeCombinationStore = create<combListState>((set) => ({
  combList: [],

  setFirstNewComb: (firstCombs: Array<number>): void =>
    set((state: combListState): { combList: Array<number> } => ({
      combList: firstCombs,
    })),

  addSelected: (id: number): void =>
    set((state: combListState): { combList: Array<number> } => ({
      combList: [...state.combList, id].sort(),
    })),

  removeSelected: (id: number): void =>
    set((state: combListState): { combList: Array<number> } => ({
      combList: state.combList.filter(
        (combitem: number) => combitem !== id,
      ),
    })),
  resetCombList: (): void =>
    set(() => ({
      combList: [],
    })),
}));
