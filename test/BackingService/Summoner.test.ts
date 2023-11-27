import SummonerBackingService from "@/BackingService/Summoner";
import DBSummoner from "@/Data/DBSummoner";
import RiotSummoner from "@/Data/RiotSummoner";
import { expect, jest, test, describe } from '@jest/globals';
import 'jest-fetch-mock';
import { SpiedFunction } from "jest-mock";
import { beforeEach } from "node:test";
import { Summoner } from "riot-node-api";
const summonerBackingService = new SummonerBackingService();
const dbClient = new DBSummoner();
const riotClient = new RiotSummoner();


let dbClientMockGet = jest.spyOn(summonerBackingService.dbClient, 'getSummonerByName');
let dbClientMockPost = jest.spyOn(summonerBackingService.dbClient, 'postSummoner');
let riotClientMockGet = jest.spyOn(summonerBackingService.riotClient, 'getSummonerByName')

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
            throw new Error("Summoner not found");
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
            throw new Error("Summoner not found");
        });
        riotClientMockGet.mockImplementation(async () => {
            // Provide an implementation for riotClient.getSummonerByName
            throw new Error("Summoner not found");
        });

        await expect(summonerBackingService.getSummonerByName(summonerName)).rejects.toThrowError("Summoner not found");

        expect(dbClientMockGet).toHaveBeenCalledWith(summonerName);
        expect(riotClientMockGet).toHaveBeenCalledWith(summonerName);
    });
})
