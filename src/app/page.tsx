"use client"
import Image from 'next/image'

import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 ">
      <div className="z-10 w-full flex-col items-center justify-between font-mono text-sm lg:flex ">
        <p className="flex w-full justify-center py-4 ">
          Search for a summoner
        </p>
        <form onSubmit={submit}>
          <input type='text' name='name' className='bg-inherit outline-none ring-2 ring-indigo-950	ring-offset-1 ring-offset-slate-950 rounded-full shadow-lg shadow-indigo-950 p-2' />
        </form>
      </div>
    </main>
  )

  function submit(e: any) {
    e.preventDefault();
    console.log(e);
    const name = e.target.name.value
    router.push(`summoner/${name}`)
  }

}
