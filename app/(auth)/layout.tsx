/** allow us to specify different roles for the authentication routs
 * for example, i dont want to show the navbar in the login window so we set a role for it
*/
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css'

export const metadata = {
    title: 'Threads',
    description: 'A Next.js 14 Meta Threads Application'
}

const inter = Inter({ subsets: ['latin'] }) //the font we are using

export default function RootLayout({
    children //the props it gets
}: {
    children: React.ReactNode //define the type of the childern -> the props it gets (becuase we are using typescript)
}) {
    return (
        <ClerkProvider >
            {/* we are wrapping up all of our return so we can use the clerk functionallity */}
            <html
                lang="en"
            >
                <body
                    className={`${inter.className} bg-dark-1`  /**the font that we are imported in line 11 */}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}