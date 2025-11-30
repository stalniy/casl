import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// dotenv keeps DATABASE_URL available for the Prisma schema in Prisma 7
export default defineConfig({
  schema: './schema.prisma',
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
});
