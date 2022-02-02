import Head from 'next/head';
import Button from '../components/Button';
import SignUpForm from '../components/SignUpForm';
import useDwitter from '../hooks/useDwitter';

import { useState } from 'react';

export default function Home() {
  const { connect, account, user, createUser, postDweet, dweets } = useDwitter();
  const [dweetContent, setDweetContent] = useState<string>('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Dwitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20">
        <h1 className="mb-8 text-6xl font-bold">
          Welcome to <span className="text-blue-400">Dwitter </span>
        </h1>

        {!account ? (
          <Button label="Connect with Ethereum" onClick={connect} />
        ) : account.toUpperCase() !== user?.wallet.toUpperCase() ? (
          <SignUpForm createUser={createUser} />
        ) : (
          <>
          <div className="flex items-center w-80">
            <img src={user?.avatar} className='rounded-full h-16 w-16 mr-4' />
            <textarea className='rounded-xl ml-4 w-64' placeholder="What's happening?" value={dweetContent} onChange={e=>setDweetContent(e.target.value)} />
          </div>
          <div className="mt-2 flex justify-end w-72">
          <Button  label="Dweet" onClick={()=>postDweet(dweetContent)} />
          </div>
          </>
        )}
      {
        dweets.map(dweet => (
          <span className='w-64 py-2 px-4'>
            {dweet.content}
          </span>
        ))
      }

      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by Ethereum
      </footer>
    </div>
  );
}
