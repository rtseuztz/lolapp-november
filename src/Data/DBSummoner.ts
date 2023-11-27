import ISummonerData from "@/Data/Interfaces/ISummoner";
import { Summoner } from "riot-node-api";

export default class DBSummoner implements ISummonerData {
    async getSummonerByName(name: string): Promise<Summoner> {
        throw new Error("Method not implemented.");
        let summoner = await SummonerModel.findOne({ name: name }).exec();
        if (summoner === null) {
            throw new Error("Summoner not found");
        }
        return summoner;
    }
    async getSummonerByPuuid(puuid: string): Promise<Summoner> {
        throw new Error("Method not implemented.");

        let summoner = await SummonerModel.findOne({ puuid: puuid }).exec();
        if (summoner === null) {
            throw new Error("Summoner not found");
        }
        return summoner;
    }
    async postSummoner(summoner: Summoner): Promise<Summoner> {
        throw new Error("Method not implemented.");

        let summonerModel = new SummonerModel(summoner);
        await summonerModel.save();
        return summoner;
    }
}