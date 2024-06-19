import { QuizOption } from "./QuizOptions";

export interface Quiz {
    id?: number,
    question: string,
    options: QuizOption[]
}
