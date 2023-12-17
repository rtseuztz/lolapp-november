import { Summoner } from "riot-node-api";
import ISummonerData from "@/Data/Interfaces/ISummoner";
import { RiotAPIClient } from "riot-node-api";
export default class RiotSummoner implements ISummonerData {
    private static client: RiotAPIClient = new RiotAPIClient(process.env.API_KEY!, 1, 1)
    async getSummonerByName(name: string): Promise<Summoner | undefined> {
        return await RiotSummoner.client.summoner.getByName(name) ?? undefined;
    }
    async getSummonerByPuuid(puuid: string): Promise<Summoner | undefined> {
        return await RiotSummoner.client.summoner.getByPuuid(puuid) ?? undefined;
    }
}