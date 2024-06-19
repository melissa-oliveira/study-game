import { Quiz } from "./Quiz";

export interface QuizOption {
    id?: number,
    description: string,
    correctAnswer: boolean,
    quiz: Quiz
}