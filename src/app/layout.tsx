import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/notes">
              To-DO
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
