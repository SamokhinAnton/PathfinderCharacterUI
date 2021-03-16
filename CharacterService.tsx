import { Character } from "./Models/Character";
import { Constants } from "./Constants"

type CharacterResponse = { data: Character[], loading: boolean, error?: Error }

export class CharacterService{
  static async getAll() : Promise<CharacterResponse> {
    let result: CharacterResponse = 
    {
        data: Array<Character>(),
        loading: false,
        error: undefined
    };
    try{
        let response = await fetch(
            `${Constants.host}/api/character`);
        let characters: Character[] = await response.json();
        result.data = characters;
        result.loading = true;
    } catch(error){
        result.error = error;
    }      
    return result;
    };
}