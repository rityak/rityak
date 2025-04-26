import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <article
      className='prose prose-lg dark:prose-invert max-w-none 
      prose-headings:font-bold prose-headings:text-blue-900 dark:prose-headings:text-blue-100
      prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-5 prose-h3:mb-3
      prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:my-4 prose-p:leading-relaxed
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:underline-offset-2 prose-a:decoration-1
      prose-strong:text-gray-900 dark:prose-strong:text-gray-50 prose-strong:font-semibold
      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-blue-700 dark:prose-code:text-blue-300 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:whitespace-normal
      prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:my-6
      prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc
      prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
      prose-li:text-gray-800 dark:prose-li:text-gray-200 prose-li:my-2
      prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-700
      prose-table:border-collapse prose-table:w-full prose-table:my-6 prose-table:overflow-hidden prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-700 prose-table:rounded
      prose-thead:bg-gray-100 dark:prose-thead:bg-gray-800
      prose-th:text-left prose-th:p-3 prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-gray-100 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700
      prose-td:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:align-top prose-td:text-gray-800 dark:prose-td:text-gray-200'
    >
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  )
}
