import { Match } from "riot-node-api";

export default interface IGameData {
    // getGameByID(id: string): Promise<Match>;
    getGamesByIDs(ids: string[]): Promise<Match[]>;
}