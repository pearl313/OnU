interface QuestionProps {
  question: Question;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onAnswer: (answer: string) => void;
  onSubmit?: () => void;
  answers: string[];
}
