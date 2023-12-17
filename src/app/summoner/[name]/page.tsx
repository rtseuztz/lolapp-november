"use client"
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Match, Summoner } from 'riot-node-api';
import Game from './game';
import Image from 'next/image';

export default function Page() {
    const { name }: { name: string } = useParams();
    const [summoner, setSummoner] = useState<Summoner>()
    const [games, setGames] = useState<Match[]>([])

    // Fetch summoner details from League of Legends API
    // Replace 'YOUR_API_KEY' with your actual API key
    const fetchSummonerDetails = async () => {
        try {
            const response = await fetch(`/api/summoner/${name}`);
            const data = await response.json() as Summoner;
            setSummoner(data);

            // get games
            const gamesResponse = await fetch(`/api/summoner/${data.puuid}/games`);
            const gamesJson = await gamesResponse.json() as Match[];

            setGames(gamesJson);
        } catch (error) {
            console.error('Error fetching summoner details:', error);
        }
    };
    useEffect(() => {
        fetchSummonerDetails();
    }, []);
    const loadComplete = () => {
        console.log("loading complete")
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome, <span className="font-bold text-blue-600">{name}</span>!</h1>
            </div>
            <div className=" shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md">
                <Image src={"/profileIcons/" + summoner?.profileIconId + ".png"} width="128" height="128" alt="profile icon" className=" rounded-full mx-1" onLoadingComplete={loadComplete} />
            </div>
            <div className="w-8/12">
                {games && games.map(g => {
                    return <Game game={g}></Game>
                })}
            </div>
        </div>
    );
}
