// import GameListBackingService from "@/BackingService/GameList";
// import { expect, jest, test, xdescribe, beforeEach } from '@jest/globals';
// import { Summoner } from "riot-node-api";
// import 'jest-fetch-mock';

// const backingService: GameListBackingService = new GameListBackingService();
// const dbClientMock = jest.spyOn(backingService.dbGameListClient, 'getGameList');
// const riotClientMock = jest.spyOn(backingService.riotGameListClient, 'getGameList');
// const dbSummonerClientMock = jest.spyOn(backingService.dbSummonerClient, 'getSummonerByPuuid');

// const mockGameList = ['testGameId1', 'testGameId2', 'testGameId3'];
// const mockPuuid = 'testPuuid';

// riotClientMock.mockImplementation(async () => {
//     // Provide an implementation for riotClient.getGameList
//     return mockGameList;
// });
// dbClientMock.mockImplementation(async () => {
//     // Provide an implementation for dbClient.getGameList
//     return mockGameList;
// });


// const freshSummoner = new Summoner(
//     'testId',
//     1234,
//     1234,
//     'testName',
//     mockPuuid,
//     "1",
//     1,
//     Date.now() - 500 //less than 1 hour
// );
// const staleSummoner = new Summoner(
//     'testId',
//     1234,
//     1234,
//     'testName',
//     mockPuuid,
//     "1",
//     1,
//     Date.now() - 7000000 //more than 1 hour
// );
// xdescribe("Testing by puuid", () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//     test('Summoner in db, refreshed recently => return data from db', async () => {
//         dbSummonerClientMock.mockImplementation(async () => {
//             // Provide an implementation for dbClient.getSummonerByPuuid
//             return freshSummoner;
//         });

//         const gameList = await backingService.getGameListByPuuid(mockPuuid);

//         expect(dbClientMock).toHaveBeenCalledWith(mockPuuid, undefined, undefined, undefined, undefined, undefined, undefined);
//         expect(riotClientMock).not.toHaveBeenCalled();
//         expect(gameList).toStrictEqual(mockGameList);
//     })
//     test('Summoner in db, not refreshed recently => return data from riot', async () => {
//         dbSummonerClientMock.mockImplementation(async () => {
//             // Provide an implementation for dbClient.getSummonerByPuuid
//             return staleSummoner;
//         });

//         const gameList = await backingService.getGameListByPuuid(mockPuuid);

//         expect(dbClientMock).toHaveBeenCalledWith(mockPuuid, undefined, undefined, undefined, undefined, undefined, undefined);
//         expect(riotClientMock).toHaveBeenCalledWith(mockPuuid, undefined, undefined, undefined, undefined, undefined, undefined);
//         expect(gameList).toStrictEqual(mockGameList);
//     })
// });