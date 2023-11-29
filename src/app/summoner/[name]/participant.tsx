
import Image from "next/image";
import { Participant } from "riot-node-api"

// winners on the left
export default function Participant({ participant }: { participant: Participant }) {
    if (!participant) {
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-blue-600">
                Loading...
            </div>
        );
    }
    const win = participant.win;
    const textAlignment = win ? "text-right" : "text-left";
    return (
        <li key={participant.puuid} className={`flex ${win ? "flex-row-reverse" : ""}`}>
            <Image src={"/champions/" + participant.championName + ".png"} width="24" height="24" alt="profile icon" className="w-6 h-6 rounded-full mx-1" />
            <p className={`${textAlignment} mb-2 max-w-full text-ellipsis overflow-hidden w-full font-bold whitespace-nowrap`}>{participant.summonerName}</p>
        </li>
    );
}
