import { Match, RiotAPIClient } from "riot-node-api"
import IGameData from "./Interfaces/IGame"

export default class RiotGame implements IGameData {
    private static client: RiotAPIClient = new RiotAPIClient(process.env.API_KEY!, 3, 1)
    getGameByID(id: string): Promise<Match> {
        return RiotGame.client.match.getMatch(id)
    }
    getGamesByIDs(ids: string[]): Promise<Match[]> {
        let matches = ids.map(async (id) => {
            return RiotGame.client.match.getMatch(id)
        });
        return Promise.all(matches);
    }
}