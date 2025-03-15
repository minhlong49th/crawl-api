export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER || 'crawl_user',
    password: process.env.DATABASE_PASSWORD || 'crawl_password',
    database: process.env.DATABASE_NAME || 'crawl_db',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  crawler: {
    maxRetries: parseInt(process.env.CRAWLER_MAX_RETRIES ?? '3', 10),
    timeout: parseInt(process.env.CRAWLER_TIMEOUT ?? '30000', 10),
    concurrency: parseInt(process.env.CRAWLER_CONCURRENCY ?? '1', 10),
  },
  auth: {
    uppromote: {
      email: process.env.UPPROMOTE_EMAIL || 'minhlong49th@gmail.com',
      password: process.env.UPPROMOTE_PASSWORD || 'd>Tj:d0Y5(2y',
    },
  },
});
