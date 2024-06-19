import { User } from "./User"

export interface UserPoints {
    id?: number,
    wrongQnt: number,
    easyQnt: number
    hardQnt: number,
    guessQnt: number,
    user: User
}