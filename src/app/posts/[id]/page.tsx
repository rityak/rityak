import { getPostData, getAllPostIds } from '@/lib/posts'
import Link from 'next/link'
import PostContent from '@/components/PostContent'

// Экспортируем функцию для статической генерации параметров
export async function generateStaticParams() {
  // Получаем все возможные ID постов в формате { id: string }
  const posts = getAllPostIds()
  console.log('Generated static params:', posts)
  return posts
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const postData = await getPostData(params.id)

    return (
      <div className='max-w-[1024px] mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <Link
          href='/'
          className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 block hover:underline flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M19 12H5M12 19l-7-7 7-7' />
          </svg>
          <span>Назад к главной странице</span>
        </Link>

        <article className='bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 sm:p-8 mb-6 overflow-x-auto'>
          <header className='mb-8 border-b border-gray-200 dark:border-gray-700 pb-6'>
            <time
              dateTime={postData.date}
              className='text-blue-600 dark:text-blue-400 font-medium mb-2 block'
            >
              {new Date(postData.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <h1 className='text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
              {postData.title}
            </h1>
            <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300'>
              {postData.description}
            </p>
          </header>

          <div className='overflow-x-auto'>
            <PostContent content={postData.content} />
          </div>
        </article>
      </div>
    )
  } catch (error) {
    console.error(`Error rendering post ${params.id}:`, error)
    return (
      <div className='max-w-[1024px] mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        <Link
          href='/'
          className='text-blue-600 hover:text-blue-800 dark:text-blue-400 mb-6 block hover:underline flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M19 12H5M12 19l-7-7 7-7' />
          </svg>
          <span>Назад к главной странице</span>
        </Link>
        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm'>
          <h1 className='text-2xl font-bold text-red-600 dark:text-red-400'>
            Ошибка загрузки поста
          </h1>
          <p className='text-gray-700 dark:text-gray-300 mt-4'>
            Не удалось загрузить запрашиваемый пост.
          </p>
        </div>
      </div>
    )
  }
}
