import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // Seed Badges
  const badges = [
    { name: 'İlk Adım', description: 'İlk modülünü tamamla', icon: '🏁', criteria: { type: 'modules', value: 1 } },
    { name: 'Bilgi Avcısı', description: '10 quizi başarıyla geç', icon: '🔍', criteria: { type: 'score', value: 80 } },
    { name: 'Hızlı Öğrenen', description: '5 günlük seri yakala', icon: '⚡', criteria: { type: 'streak', value: 5 } },
    { name: 'Master', description: '1000 XP puanına ulaş', icon: '🏆', criteria: { type: 'points', value: 1000 } },
  ];

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { id: b.name.toLowerCase().replace(' ', '-') },
      update: {},
      create: { ...b, id: b.name.toLowerCase().replace(' ', '-') },
    });
  }

  const topics = [
    {
      name: 'React.js',
      slug: 'react-js',
      description: 'Modern web development with React and Hooks',
      category: 'Frontend',
    },
    {
      name: 'Node.js',
      slug: 'node-js',
      description: 'Server-side JavaScript with Express and Prisma',
      category: 'Backend',
    },
    {
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Statically typed JavaScript for large scale apps',
      category: 'Languages',
    },
    {
      name: 'AI Engineering',
      slug: 'ai-engineering',
      description: 'Integrating LLMs like Claude and GPT into apps',
      category: 'AI',
    },
  ];

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: topic,
    });
  }

  console.log('Seeded database successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
