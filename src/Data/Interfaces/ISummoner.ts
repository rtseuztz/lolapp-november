import { Summoner } from "riot-node-api";

export default interface ISummonerData {
    getSummonerByName(name: string): Promise<Summoner | undefined>;
    getSummonerByPuuid(puuid: string): Promise<Summoner | undefined>;
}