import SummonerService from "@/AppService/Summoner"
import { RiotAPIClient, Summoner } from "riot-node-api"
export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    console.log("slug", params)
    const name = params.name
    const service = new SummonerService();
    const summoner = await service.getSummonerByName(name);
    return Response.json(summoner)
}