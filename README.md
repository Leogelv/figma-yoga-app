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

## Структура проекта

### Изображения для практик

Изображения для практик хранятся в директории `public/images/practices/`. Имена файлов соответствуют типам практик и используются через функцию `getPracticeImageUrl` в файле `utils/imageUtils.ts`.

Для загрузки изображений практик можно использовать скрипт:

```bash
./scripts/download-practice-images.sh
```

Полная документация по работе с изображениями доступна в [документации по изображениям](./docs/images.md).

### Figma-практики

В проекте реализована интеграция с Figma. Практики из Figma хранятся в директории `public/images/practices/figma/`. Для загрузки изображений можно использовать скрипт:

```bash
./scripts/download-figma-images.sh
```

Для получения детальной информации о Figma-практиках см. [документацию по Figma-практикам](./docs/figma-practices.md).

### Типы практик

В приложении представлены следующие типы практик:
- Телесные практики (йога, осанка)
- Медитативные практики (разные типы медитаций)
- Дыхательные практики (разной интенсивности)

### Документация

Полная документация проекта доступна в директории `/docs`. Основные разделы:
- [Обзор проекта](./docs/README.md)
- [Квиз для подбора практик](./docs/quiz-flow.md)
- [API и интеграции](./docs/api.md)
- [Figma-практики](./docs/figma-practices.md)
- [Изображения практик](./docs/images.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
