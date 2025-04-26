import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl font-bold mb-8'>Статейки</h1>
        <div className='grid gap-6'>
          <h2 className='text-2xl font-semibold mb-4'>Последние статьи</h2>
          <ul className='grid gap-6'>
            {allPostsData.map(({ id, date, title, description }) => (
              <li
                key={id}
                className='p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow'
              >
                <Link href={`/posts/${id}`} className='block'>
                  <span className='text-sm text-gray-500'>{date}</span>
                  <h3 className='text-xl font-bold mt-1 mb-2'>{title}</h3>
                  <p className='text-gray-700'>{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
