export type FillInGapQuestionType = {
  question_type?: "options_question" | "fill_in_gap_question" | string;
  quetion: string;
  image: any;
  answer: string;
  quetion_mark: number;
};

export type OptionsQuestionType = {
  question_type?: "options_question" | "fill_in_gap_question" | string;
  quetion: string;
  image: any;
  option_to_choose_from: string[];
  answer: string;
  quetion_mark: number;
};

export type QuestionType = FillInGapQuestionType &
  OptionsQuestionType & { identifier?: number };

export type TestManagementFormTestQuestionsType = {
  fill_in_gap_quetion: FillInGapQuestionType[];
  option_quetion: OptionsQuestionType[];
  multi_choice_quetion: [];
};
