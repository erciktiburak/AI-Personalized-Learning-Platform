import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const topics = [
    {
      name: 'React.js',
      slug: 'react-js',
      description: 'Modern web development with React',
      category: 'Frontend',
    },
    {
      name: 'Node.js',
      slug: 'node-js',
      description: 'Server-side JavaScript with Node.js',
      category: 'Backend',
    },
    {
      name: 'Python for AI',
      slug: 'python-ai',
      description: 'Fundamentals of Python for Artificial Intelligence',
      category: 'Data Science',
    },
  ];

  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: topic,
    });
  }

  console.log('Seeded topics successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
