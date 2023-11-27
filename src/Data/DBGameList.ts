import { RiotAPIClient } from "riot-node-api";
import IGameListData from "./Interfaces/IGameList";

export default class DBGameList implements IGameListData {
    private static client: RiotAPIClient = new RiotAPIClient(process.env.API_KEY!, 1000, 10)
    getGameList(puuid: string, startTime?: number | undefined, endTime?: number | undefined, queue?: number | undefined, type?: string | undefined, start?: number | undefined, count?: number | undefined): Promise<string[]> {
        return new Promise((resolve, reject) => {
            resolve(["1", "2", "3", "4", "5"])
        })
    }
}