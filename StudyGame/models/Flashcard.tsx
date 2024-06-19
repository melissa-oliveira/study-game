import { Folder } from "./Folder";

export interface Flahscard {
    id?: number,
    front: string,
    back: string,
    folder: Folder
}