import { User } from "./User";

export interface Folder {
    id?: number,
    description: string,
    user: User
}