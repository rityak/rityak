import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl mb-6'>Страница не найдена</h2>
      <p className='mb-8 text-gray-600'>
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link
        href='/'
        className='px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors'
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
