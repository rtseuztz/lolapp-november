import { RiotAPIClient } from "riot-node-api";
import IGameListData from "./Interfaces/IGameList";

export default class RiotGameList implements IGameListData {
    private static client: RiotAPIClient = new RiotAPIClient(process.env.API_KEY!, 5, 1)
    getGameList(puuid: string, startTime?: number | undefined, endTime?: number | undefined, queue?: number | undefined, type?: string | undefined, start?: number | undefined, count?: number | undefined): Promise<string[]> {
        return RiotGameList.client.match.getMatchList(puuid) // TODO: Add parameters to package
    }

}