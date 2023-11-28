// import DBGameList from "@/Data/DBGameList";
// import DBSummoner from "@/Data/DBSummoner";
// import IGameListData from "@/Data/Interfaces/IGameList";
// import ISummonerData from "@/Data/Interfaces/ISummoner";
// import RiotGameList from "@/Data/RiotGameList";

// export default class GameListBackingService {
//     dbGameListClient: IGameListData;
//     dbSummonerClient: ISummonerData;
//     riotGameListClient: IGameListData;
//     constructor() {
//         this.dbGameListClient = new DBGameList();
//         this.dbSummonerClient = new DBSummoner();
//         this.riotGameListClient = new RiotGameList();
//     }
//     public async getGameListByPuuid(puuid: string, startTime?: number | undefined, endTime?: number | undefined, queue?: number | undefined, type?: string | undefined, start?: number | undefined, count?: number | undefined): Promise<string[]> {
//         // Check DB
//         // If not in DB, call Riot API
//         // Save to DB
//         // Return Summoner
//         let gameList: string[];
//         try {
//             const summoner = await this.dbSummonerClient.getSummonerByPuuid(puuid);
//             if (summoner.lmod > Date.now() - 3619052) { //1 hour
//                 gameList = await this.dbGameListClient.getGameList(puuid, startTime, endTime, queue, type, start, count);
//             } else {
//                 throw new Error("Summoner not in DB")
//             }
//         } catch (error) {
//             console.log(error)
//             gameList = await this.riotGameListClient.getGameList(puuid, startTime, endTime, queue, type, start, count);
//         }
//         return gameList;
//     }
// }