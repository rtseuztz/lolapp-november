import DBSummoner from "@/Data/DBSummoner";
import ISummonerData from "@/Data/Interfaces/ISummoner";
import RiotSummoner from "@/Data/RiotSummoner"
import { Summoner } from "riot-node-api";
export default class SummonerBackingService {
    private dbClient: DBSummoner;
    private riotClient: ISummonerData;
    constructor() {
        this.dbClient = new DBSummoner();
        this.riotClient = new RiotSummoner();
    }
    public async getSummonerByName(name: string): Promise<Summoner | null> {
        // Check DB
        // If not in DB, call Riot API
        // Save to DB
        // Return Summoner
        let summoner: Summoner | null;
        summoner = await this.dbClient.getSummonerByName(name);
        if (summoner === null) {
            summoner = await this.riotClient.getSummonerByName(name);
            if (summoner) await this.saveSummoner(summoner);
        }
        return summoner;
    }

    private async saveSummoner(summoner: Summoner): Promise<void> {
        // Save to DB
        console.log("Implement saveSummoner")
        // await this.dbClient.postSummoner(summoner);
    }
}