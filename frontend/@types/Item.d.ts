interface Item {
  nutrientId: number; //제품ID
  nutrientName: string; //제품명
  nutrientBrand: string; //제조사
  nutrientImageUrl: string; //썸네일 이미지
  isInterested?: boolean; //관심목록 추가여부
  interested?: boolean; //관심목록 추가여부
  rating?: number; //별점(리뷰용)
}
