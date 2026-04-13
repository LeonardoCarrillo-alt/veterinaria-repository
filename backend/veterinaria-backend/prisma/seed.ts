/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
  },
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.user.deleteMany();

  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log('==> Base de datos ya contiene datos, saltando seed');
    return;
  }

  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: '$2b$10$TuHashSeguro',
      name: 'Administrador',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user@example.com',
      username: 'usuario',
      password: '$2b$10$TuHashSeguro',
      name: 'Usuario Normal',
    },
  });
  console.log({ user1, user2 });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
