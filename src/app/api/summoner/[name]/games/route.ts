import GameService from "@/AppService/Game";
import { RiotAPIClient, Summoner } from "riot-node-api"
export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    console.log("slug", params)
    const name = params.name
    const service = new GameService();
    const summoner = await service.getGames(name);
    return Response.json(summoner)
}