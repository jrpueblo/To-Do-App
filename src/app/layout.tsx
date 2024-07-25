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
        <nav className="navbar">
          <div className="container">
              <div className="nav-links">
                <Link href="/" className="nav-link">
                  To-Do List
                </Link>
                {/* <Link href="/notes" className="nav-link">
                  Daillies
                </Link> */}
              </div>
            </div>
        </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
