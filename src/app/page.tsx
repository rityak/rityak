import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

// Используем типы для постов
type PostListItem = {
  id: string
  title: string
  date: string
  description: string
}

export default function Home() {
  const allPostsData = getSortedPostsData() as PostListItem[]

  return (
    <main className='flex min-h-screen flex-col items-center py-12 px-4 md:py-16 bg-gray-50 dark:bg-gray-950'>
      <div className='max-w-5xl w-full'>
        <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
          Статейки
        </h1>

        <div className='grid gap-6'>
          <h2 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100'>
            Последние статьи
          </h2>
          <ul className='grid gap-6'>
            {allPostsData.length === 0 ? (
              <li className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
                <p className='text-gray-600 dark:text-gray-300'>
                  Пока нет статей. Скоро появятся!
                </p>
              </li>
            ) : (
              allPostsData.map(({ id, date, title, description }) => (
                <li
                  key={id}
                  className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700'
                >
                  <Link href={`/posts/${id}`} className='block'>
                    <time
                      dateTime={date}
                      className='text-sm font-medium text-blue-600 dark:text-blue-400'
                    >
                      {new Date(date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className='text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition-colors'>
                      {title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300'>
                      {description}
                    </p>
                    <div className='mt-4 text-blue-600 dark:text-blue-400 flex items-center text-sm font-medium'>
                      <span>Читать далее</span>
                      <svg
                        className='ml-1 w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M9 6L15 12L9 18'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
