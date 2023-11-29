"use client"
import { useEffect, useState } from "react";
import { Match } from "riot-node-api";
import Participant from "./participant";
import ParticipantsBox from "./participantsBox";

export default function Game({ game }: { game: Match }) {
    if (!game) {
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-blue-600">
                Loading...
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white w-full">
            <div className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full text-center flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-400">Match Details</h1>
                <p className="mb-2">Game ID: <span className="font-bold">{game.info.gameId}</span></p>
                <p className="mb-2">Game Mode: <span className="font-bold">{game.info.gameMode}</span></p>
                <p className="mb-2">Game Type: <span className="font-bold">{game.info.gameType}</span></p>
                {/* Add more match details here */}
                <ParticipantsBox participants={game.info.participants} />
            </div>
        </div>
    );
}