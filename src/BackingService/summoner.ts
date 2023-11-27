import RiotSummoner from "@/Data/Summoner/RiotSummoner"
class SummonerBackingService {
    public async getSummonerByName(name: string): Promise<Summoner> {
        // Check DB
        // If not in DB, call Riot API
        // Save to DB
        // Return Summoner


    }

    private async getSummonerFromRiot(name: string): Promise<Summoner> {
        // Call Riot API
        return new Summoner();
    }

    private async saveSummoner(summoner: Summoner): Promise<void> {
        // Save to DB
    }
}