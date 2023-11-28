import SummonerBackingService from "@/BackingService/Summoner";
import { expect, jest, test, describe, beforeEach } from '@jest/globals';
import 'jest-fetch-mock';
import { Summoner } from "riot-node-api";
const summonerBackingService = new SummonerBackingService();

let dbClientMockGet = jest.spyOn(summonerBackingService['dbClient'], 'getSummonerByName');
let dbClientMockPost = jest.spyOn(summonerBackingService['dbClient'], 'postSummoner');
let riotClientMockGet = jest.spyOn(summonerBackingService['riotClient'], 'getSummonerByName')

let mockSummoner = new Summoner(
    'testId',
    1234,
    1234,
    'testName',
    "1234",
    "1",
    1
);
const summonerName = 'testSummonerName';
describe("Testing by name", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('getSummonerByName in database', async () => {
        dbClientMockGet.mockImplementation(async () => {
            // Provide an implementation for dbClient.getSummonerByName
            return mockSummoner
        });

        const summoner = await summonerBackingService.getSummonerByName(summonerName);

        expect(dbClientMockGet).toHaveBeenCalledWith(summonerName);
        expect(riotClientMockGet).not.toHaveBeenCalled();
        expect(summoner).toBe(mockSummoner);
    });
    test('getSummonerByName not in database, get from riot', async () => {
        dbClientMockGet.mockImplementation(async () => {
            // Provide an implementation for dbClient.getSummonerByName
            return null;
        });
        riotClientMockGet.mockImplementation(async () => {
            // Provide an implementation for riotClient.getSummonerByName
            return mockSummoner
        });
        dbClientMockPost.mockImplementation(async () => {
            // Provide an implementation for dbClient.postSummoner
            return mockSummoner
        });

        const summoner = await summonerBackingService.getSummonerByName(summonerName);

        expect(dbClientMockGet).toHaveBeenCalledWith(summonerName);
        expect(riotClientMockGet).toHaveBeenCalledWith(summonerName);
        expect(summoner).toBe(mockSummoner);
    });
    test('summoner doesnt exist', async () => {
        dbClientMockGet.mockImplementation(async () => {
            // Provide an implementation for dbClient.getSummonerByName
            return null;
        });
        riotClientMockGet.mockImplementation(async () => {
            // Provide an implementation for riotClient.getSummonerByName
            return null;
        });

        const summoner = await summonerBackingService.getSummonerByName(summonerName);
        expect(summoner).toBe(null);

        expect(dbClientMockGet).toHaveBeenCalledWith(summonerName);
        expect(riotClientMockGet).toHaveBeenCalledWith(summonerName);
    });
})
