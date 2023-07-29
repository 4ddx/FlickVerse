import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Head from 'next/head'
import MovieSearch from '@/components/MovieSearch'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
 <>
 <Head>
  <title>FlickVerse</title>
 </Head>
 <Navbar/>
 <MovieSearch/>
 <Hero/>
 </>

  )
}
