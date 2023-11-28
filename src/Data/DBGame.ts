import { Match } from "riot-node-api";
import IGameData from "./Interfaces/IGame";

export default class DBGame implements IGameData {
    getGamesByIDs(ids: string[]): Promise<Match[]> {
        return new Promise((resolve, reject) => {
            resolve([])
        })
    }
}
