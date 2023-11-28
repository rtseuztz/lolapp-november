import DBGame from "@/Data/DBGame";
import IGameData from "@/Data/Interfaces/IGame";
import IGameListData from "@/Data/Interfaces/IGameList";
import RiotGame from "@/Data/RiotGame";
import RiotGameList from "@/Data/RiotGameList";
import { Match } from "riot-node-api";

export default class GameBackingService {
    private dbGameClient: IGameData;
    private riotGameClient: IGameData;
    private riotGameListClient: IGameListData;
    constructor() {
        this.dbGameClient = new DBGame();
        this.riotGameClient = new RiotGame();
        this.riotGameListClient = new RiotGameList();
    }
    public async getGames(puuid: string, startTime?: number, endTime?: number, queue?: number, type?: string, start: number = 0, count: number = 20): Promise<Match[]> {

        const ids = await this.riotGameListClient.getGameList(puuid, startTime, endTime, queue, type, start, count);
        const dbMatches = await this.dbGameClient.getGamesByIDs(ids);
        const matches = dbMatches.toSorted((a, b) => b.info.gameCreation - a.info.gameCreation);
        // last match is the oldest match
        if (matches.length < ids.length) {
            console.log("Getting new matches from RIOT API")
            const newIds = ids.filter(id => !matches.some(dbMatch => dbMatch.metadata.matchId === id));
            const newMatches = await this.riotGameClient.getGamesByIDs(newIds);
            matches.push(...newMatches);
        }
        return matches;
    }
}