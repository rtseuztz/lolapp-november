import { Summoner } from "riot-node-api";

export default interface ISummonerData {
    getSummonerByName(name: string): Promise<Summoner | null>;
    getSummonerByPuuid(puuid: string): Promise<Summoner | null>;
}