import { create } from 'zustand';

type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientAmount: string;
};

type have = {
  havingNutrientList: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIngredientList: Array<Ingredient>;
};

type haveState = {
  haveList: Array<have>;
  setAllHaves: (allHaves: Array<have>) => void;
  setHaves: (newhave: have) => void;
  removeHave: (nutrientId: number) => void;
  resetHaves: () => void;
};

export const haveStore = create<haveState>((set) => ({
  haveList: [],

  setAllHaves: (allHaves: Array<have>): void =>
    set((state: haveState): { haveList: Array<have> } => ({
      haveList: allHaves,
    })),

  setHaves: (newhave: have): void =>
    set((state: haveState): { haveList: Array<have> } => ({
      haveList: [...state.haveList, newhave],
    })),

  removeHave: (haveId: number): void =>
    set((state: haveState): { haveList: Array<have> } => ({
      haveList: state.haveList.filter(
        (have: have) => have.nutrientId !== haveId,
      ),
    })),

  resetHaves: (): void =>
    set(() => ({
      haveList: [],
    })),
}));
