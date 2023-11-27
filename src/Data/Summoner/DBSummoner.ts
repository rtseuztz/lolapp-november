import ISummonerData from "@/Data/Interfaces/ISummoner";
import { Summoner } from "riot-node-api";

export default class DBSummoner implements ISummonerData {
    async getSummonerByName(name: string): Promise<Summoner> {
        let summoner = await SummonerModel.findOne({ name: name }).exec();
        if (summoner === null) {
            throw new Error("Summoner not found");
        }
        return summoner;
    }
    async getSummonerByPuuid(puuid: string): Promise<Summoner> {
        let summoner = await SummonerModel.findOne({ puuid: puuid }).exec();
        if (summoner === null) {
            throw new Error("Summoner not found");
        }
        return summoner;
    }
}