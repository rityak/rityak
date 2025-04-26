import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export const metadata: Metadata = {
  title: 'rityak.github.io',
  description: 'rityak.github.io',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' className={inter.variable}>
      <body className='antialiased min-h-screen flex flex-col'>
        <header className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'>
          <div className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
            <Link
              href='/'
              className='text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
            >
              Ritya
            </Link>
            <nav>
              <ul className='flex gap-6'>
                <li>
                  <Link
                    href='/'
                    className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <a
                    href='https://github.com/rityak/rityak'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1'
                  >
                    <span>GitHub</span>
                    <svg
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3 1H1V3M1 6V9M1 9V11H3M1 9L9 1M9 1H11V3M9 1L11 3M6 11H9M9 11H11V9M9 11L11 9'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className='flex-1'>{children}</main>

        <footer className='mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6'>
          <div className='max-w-5xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400'>
            <p>© {new Date().getFullYear()} made in Next.js и GitHub Pages.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
