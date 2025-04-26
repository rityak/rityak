import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <article className='prose prose-lg max-w-none'>
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
