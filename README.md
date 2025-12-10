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

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

- `ADMIN_PASSWORD`: Password for admin access
- `JWT_SECRET`: Secret key for JWT token generation
- `POSTS_DIR`: (Optional) Directory path for blog posts storage. Defaults to `src/content/posts` if not set.

## Blog Persistence

Blog posts are stored as markdown files. By default, posts are stored in `src/content/posts` within the application directory.

For production deployments (especially with Docker), you can configure an external directory for persistent blog storage using the `POSTS_DIR` environment variable. This ensures blog posts are not lost when containers are rebuilt or restarted.

### Docker Deployment

When running with Docker, mount an external volume to persist blog posts:

```bash
# Build the Docker image
docker build -t portfolio .

# Run with volume mount for blog persistence
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/posts:/data/posts \
  -e ADMIN_PASSWORD=your_password \
  -e JWT_SECRET=your_secret \
  -e POSTS_DIR=/data/posts \
  portfolio
```

Alternatively, use Docker Compose:

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./posts:/data/posts
    environment:
      - ADMIN_PASSWORD=your_password
      - JWT_SECRET=your_secret
      - POSTS_DIR=/data/posts
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
