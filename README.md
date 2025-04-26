# Мой блог на GitHub Pages

Это мой личный блог, созданный с использованием Next.js и размещенный на GitHub Pages.

## Технологии

- Next.js - фреймворк для React
- Tailwind CSS - утилитарный CSS-фреймворк
- Markdown - формат для написания контента
- GitHub Actions - для автоматического деплоя

## Как это работает

1. Статьи пишутся в формате Markdown в директории `content/posts/`
2. Next.js генерирует статический сайт из этих файлов
3. GitHub Actions автоматически собирает и публикует сайт при каждом пуше в ветку main

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Как добавить новую статью

1. Создайте новый файл в директории `content/posts/` с расширением `.md`
2. Добавьте метаданные в формате YAML в начале файла:

```markdown
---
title: 'Заголовок статьи'
date: '2024-06-01'
description: 'Краткое описание статьи'
---

# Содержимое статьи

Текст статьи в формате Markdown...
```

3. Закоммитьте и запушьте изменения в репозиторий
4. GitHub Actions автоматически обновит сайт

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
