import SummonerService from "@/AppService/Summoner";
import SummonerBackingService from "@/BackingService/Summoner";
import DBSummoner from "@/Data/DBSummoner";
import RiotSummoner from "@/Data/RiotSummoner";
import { expect, jest, test, describe } from '@jest/globals';
import 'jest-fetch-mock';
import { SpiedFunction } from "jest-mock";
import { beforeEach } from "node:test";
import { Summoner } from "riot-node-api";
const appService = new SummonerService();
const backing = new SummonerBackingService();
let mockBacking = jest.spyOn(appService.backingService, 'getSummonerByName');
let mockSummoner = new Summoner(
    'testId',
    1234,
    1234,
    'testName',
    "1234",
    "1",
    1
);
describe("Testing by name", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('getSummonerByName', async () => {
        let summonerName = 'testSummonerName';
        mockBacking.mockImplementation(async () => {
            // Provide an implementation for dbClient.getSummonerByName
            return mockSummoner
        });

        const summoner = await appService.getSummonerByName(summonerName);

        expect(mockBacking).toHaveBeenCalledWith(summonerName);
        expect(summoner).toBe(mockSummoner);
    });

});