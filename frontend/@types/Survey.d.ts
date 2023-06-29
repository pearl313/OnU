interface Survey {
  age: number; // 나이에 대한 답변
  gender: string; // 성별에 대한 답변
  pregnant: boolean; // 임신 여부에 대한 답변
  takingNutrientList: string[]; // 복용 중인 영양제에 대한 답변 (여러개 선택 가능)
  functionList: number[]; // 복용 목적에 대한 답변 (여러 개 선택 가능)
  typeList: number[]; // 선호 제형에 대한 답변 (여러 개 선택 가능)
}
