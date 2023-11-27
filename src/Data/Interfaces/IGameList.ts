
export default interface IGameListData {
    getGameList(puuid: string, startTime?: number, endTime?: number, queue?: number, type?: string, start?: number, count?: number): Promise<string[]>;
}