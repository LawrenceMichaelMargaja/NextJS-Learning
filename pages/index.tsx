import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { NextPage } from 'next'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    <h1 className='text-3xl font-bold underline text-gray-500'>
      Hello world!
    </h1>
  );
}

export default Home;