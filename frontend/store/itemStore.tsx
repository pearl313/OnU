import { create } from 'zustand';

type ItemState = {
  items: Array<Item>;

  setItems: (newItem: Item) => void;
  removeItem: (nutrientId: number) => void;
  resetItems: () => void;
};

export const itemStore = create<ItemState>((set) => ({
  items: [],

  setItems: (newItem: Item): void =>
    set((state: ItemState): { items: Array<Item> } => ({
      items: [...state.items, newItem],
    })),

  removeItem: (itemId: number): void =>
    set((state: ItemState): { items: Array<Item> } => ({
      items: state.items.filter(
        (item: Item) => item.nutrientId !== itemId,
      ),
    })),

  resetItems: (): void =>
    set(() => ({
      items: [],
    })),
}));
