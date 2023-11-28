import { Match } from "riot-node-api";
import IGameData from "./Interfaces/IGame";

export default class DBGame implements IGameData {
    getGameByID(id: string): Promise<Match> {
        throw new Error("Method not implemented.");
        // return new Promise((resolve, reject) => {
        //     resolve(new Match(
        //         ,
        //         1,
        //     ))
        // })
    }
    getGamesByIDs(ids: string[]): Promise<Match[]> {
        throw new Error("Method not implemented.");
        return new Promise((resolve, reject) => {
            resolve([])
        })
    }
}
