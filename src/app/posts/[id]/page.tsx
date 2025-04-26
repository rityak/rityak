import { getPostData, getAllPostIds } from '@/lib/posts'
import Link from 'next/link'
import PostContent from '@/components/PostContent'

export async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id)

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <Link href='/' className='text-blue-600 mb-6 block hover:underline'>
        ← Назад к главной странице
      </Link>

      <article>
        <header className='mb-8'>
          <p className='text-gray-500 mb-2'>{postData.date}</p>
          <h1 className='text-4xl font-bold mb-4'>{postData.title}</h1>
          <p className='text-xl text-gray-700'>{postData.description}</p>
        </header>

        <PostContent content={postData.content} />
      </article>
    </div>
  )
}
