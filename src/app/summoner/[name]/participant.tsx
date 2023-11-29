
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
            <Image src={"/profileIcons/" + participant.profileIcon + ".png"} width="64" height="64" alt="profile icon" className="w-10 h-10 rounded-full mr-4" />
            <p className={`${textAlignment} mb-2 max-w-full text-ellipsis overflow-hidden w-full font-bold whitespace-nowrap`}>{participant.summonerName}</p>
        </li>
    );
}
