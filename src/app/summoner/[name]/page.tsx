"use client"
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Summoner } from 'riot-node-api';

export default function Page() {
    const { name }: { name: string } = useParams();
    console.log(name);
    const [summoner, setSummoner] = useState<Summoner>()
    // Fetch summoner details from League of Legends API
    // Replace 'YOUR_API_KEY' with your actual API key
    const fetchSummonerDetails = async () => {
        try {
            const response = await fetch(`/api/summoner/${name}`);
            const data = await response.json() as Summoner;
            setSummoner(data);

            // get games
            const gamesResponse = await fetch(`/api/summoner/${data.puuid}/games`);
        } catch (error) {
            console.error('Error fetching summoner details:', error);
        }
    };
    useEffect(() => {
        console.log("i only go once")
        fetchSummonerDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">Summoner Page</h1>
                <p className="text-xl mb-2">Welcome, <span className="font-bold text-blue-600">{name}</span>!</p>
            </div>
            <div className=" shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md">
                <Suspense fallback={<ContentSkeleton />}>
                    <p className="mb-2">Level: <span className="font-bold">{summoner?.summonerLevel}</span></p>
                    <p className="mb-2">Summoner ID: <span className="font-bold">{summoner?.id}</span></p>
                    <p className="mb-2">Account ID: <span className="font-bold">{summoner?.accountId}</span></p>
                    <p className="mb-2">PUUID: <span className="font-bold">{summoner?.puuid}</span></p>
                </Suspense>
            </div>
        </div>
    );
}

function ContentSkeleton() {

    return (
        <div className="animate-pulse flex flex-col items-center justify-center min-h-screen ">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-600">Summoner Page</h1>
                <p className="text-xl mb-2">Welcome, <span className="font-bold text-blue-600">Summoner Name</span>!</p>
            </div>
            <div className=" shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md">
                <p className="mb-2">Level: <span className="font-bold">Summoner Level</span></p>
                <p className="mb-2">Summoner ID: <span className="font-bold">Summoner ID</span></p>
                <p className="mb-2">Account ID: <span className="font-bold">Account ID</span></p>
                <p className="mb-2">PUUID: <span className="font-bold">PUUID</span></p>
            </div>
        </div>
    );
}