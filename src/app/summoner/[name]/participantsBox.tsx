import { Participant as parts } from "riot-node-api";
import Participant from "./participant";

export default function participantsBox({ participants }: { participants: parts[] }) {
    const winners = participants.filter(p => p.win);
    const losers = participants.filter(p => !!!p.win);
    const sides = [winners, losers];
    // const textColor = participant.win ? "text-green-400" : "text-red-400";

    return (
        <div className="grid grid-cols-[49.5%_1%_49.5%] max-w-full justify-center">
            <ul className="pt-1 flex flex-col min-w-full w-5/12 bg-gradient-to-l from-green-400/20 to-transparent rounded-lg">
                {winners.map((p) => {
                    return (
                        <Participant participant={p} />
                    )
                })
                }
            </ul>
            <div>

            </div>
            <ul className="pt-1 flex flex-col min-w-full bg-gradient-to-r from-red-400/20 to-transparent rounded-lg">
                {losers.map((p) => {
                    return (
                        <Participant participant={p} />
                    )
                })
                }
            </ul>
        </div>
    )
}