type ingredient = {
  ingredientName: string;
  ingredientAmount: string;
  recommendedIntakeStart: string;
  recommendedIntakeEnd: string;
};

type nutrientDetail = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIntake: string;
  nutrientCaution: string;
  nutrientExpiration: string;
  nutrientType: string;
  nutrientMaterial: string;
  interested: boolean;
  ingredientList: Array<ingredient>;

  functionList: Array<string>;
};
