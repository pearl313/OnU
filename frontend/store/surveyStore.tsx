import { create } from 'zustand';

export const surveyStore = create<SurveyStore>((set) => ({
  result: {
    nutrientFiltering: [],
  },
  setResult: (result: filtering) =>
    set((state: SurveyStore) => ({ ...state, result })),
}));

export default surveyStore;
