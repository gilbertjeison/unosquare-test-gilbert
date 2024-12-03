import { Character } from "./character";

export interface ApiResponse {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    characters: Character[]
}
