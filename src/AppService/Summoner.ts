import SummonerBackingService from "@/BackingService/Summoner";
import { Summoner } from "riot-node-api";

export default class SummonerService {
    backingService: SummonerBackingService;
    constructor() {
        this.backingService = new SummonerBackingService();
    }
    public async getSummonerByName(name: string): Promise<Summoner> {
        const summoner = await this.backingService.getSummonerByName(name);
        return summoner;
    }

}