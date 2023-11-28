import GameBackingService from "@/BackingService/Game";
import DBGame from "@/Data/DBGame";
import { Match } from "riot-node-api";

export default class GameService {
    backingService: GameBackingService;
    constructor() {
        this.backingService = new GameBackingService();
    }
    public async getGames(puuid: string): Promise<Match[]> {
        const games = await this.backingService.getGames(puuid);
        return games;
    }

}