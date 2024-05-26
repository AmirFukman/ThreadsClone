//determine the structure of the app (backround,styles amd more...)
import type { Metadata } from 'next'
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from 'next/font/google'
import '../globals.css'

import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description: 'A Next.js 14 Meta Threads Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar /> {/**like an navbar */}
          <main className='flex flex-row'>
            <LeftSidebar />  {/**left side bar */}
            <section className='main-container'>   {/**will contain the majority of the app  */}
              <div
                className='w-full max-w-4xl'
              >
                {children}
              </div>
            </section>
            <RightSidebar />  {/**right side bar */}
          </main>
          <Bottombar />  {/**like an bottom bar */}
        </body>
      </html>
    </ClerkProvider>
  )
}
