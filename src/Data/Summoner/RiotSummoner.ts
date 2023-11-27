import { Summoner } from "riot-node-api";
import ISummonerData from "@/Data/Interfaces/ISummoner";
import { RiotAPIClient } from "riot-node-api";
export default class RiotSummoner implements ISummonerData {
    private static client: RiotAPIClient = new RiotAPIClient("", 1600, 120)
    async getSummonerByName(name: string): Promise<Summoner> {
        return await RiotSummoner.client.summoner.getByName(name);
        throw new Error("Method not implemented.");
    }
    async getSummonerByPuuid(puuid: string): Promise<Summoner> {
        return await RiotSummoner.client.summoner.getByPuuid(puuid);
    }
}