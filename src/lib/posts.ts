import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Определяем интерфейс для данных поста
export interface PostData {
  id: string
  title: string
  date: string
  description: string
  content: string
}

export function getSortedPostsData() {
  try {
    // Проверка существования директории
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Directory ${postsDirectory} does not exist. Creating it.`)
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)

    if (fileNames.length === 0) {
      console.warn('No posts found')
      return []
    }

    const allPostsData = fileNames.map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as {
          date: string
          title: string
          description: string
        }),
      }
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error getting posts:', error)
    return []
  }
}

export function getAllPostIds() {
  try {
    // Проверка существования директории
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Directory ${postsDirectory} does not exist.`)
      return []
    }

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)

    if (fileNames.length === 0) {
      console.warn('No posts found for generating static params')
      return []
    }

    // Формат возвращаемых данных должен быть { id: string }
    return fileNames.map(fileName => {
      return {
        id: fileName.replace(/\.md$/, ''),
      }
    })
  } catch (error) {
    console.error('Error getting post IDs:', error)
    return []
  }
}

// Функция для получения списка ID для динамических путей в старом формате
export function getAllPostParamsLegacy() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)

    // Проверяем, существует ли файл
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post file not found: ${fullPath}`)
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Return the id and data (title, date, content)
    return {
      id,
      content: matterResult.content,
      ...(matterResult.data as {
        date: string
        title: string
        description: string
      }),
    }
  } catch (error) {
    console.error(`Error getting post data for ${id}:`, error)
    throw error
  }
}
