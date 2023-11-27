import { RiotAPIClient, Summoner } from "riot-node-api"
export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    console.log("slug", params)
    const name = params.name
    let client = new RiotAPIClient(process.env.API_KEY ?? "", 1, 1);
    let summoner = await client.summoner.getByName(name);
    console.log("summoner is ", summoner);
    return Response.json(summoner)
}