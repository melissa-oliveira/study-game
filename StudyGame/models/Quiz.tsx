import { Folder } from "./Folder";

export interface Quiz {
    id?: number,
    question: string,
    folder: Folder
}
