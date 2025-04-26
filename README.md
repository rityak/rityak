# GitHub Pages

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
