import ISummonerData from "@/Data/Interfaces/ISummoner";
import { Summoner } from "riot-node-api";
import getDb, { insert } from "@/Data/db/client";
import find from "@/Data/db/client";

export default class DBSummoner implements ISummonerData {
    async getSummonerByName(name: string): Promise<Summoner | undefined> {
        let summoner = null;
        console.log("getting summoner by name from DB")
        summoner = await find<Summoner>("summoners", { name: name });
        return summoner?.[0]

    }
    async getSummonerByPuuid(puuid: string): Promise<Summoner | undefined> {
        return undefined
        let summoner = await SummonerModel.findOne({ puuid: puuid }).exec();
        if (summoner === null) {
            throw new Error("Summoner not found");
        }
        return summoner;
    }
    async postSummoner(summoner: Summoner): Promise<boolean> {
        const res = await insert<Summoner>("summoners", summoner);
        console.log("res", res)
        return res;
    }
}  