import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // const email = "rachel@remix.run";

  // cleanup the existing database
  // await prisma.user.delete({ where: { email } }).catch(() => {
  //   // no worries if it doesn't exist yet
  // });

  // const hashedPassword = await bcrypt.hash("racheliscool", 10);

  // const user = await prisma.user.create({
  //   data: {
  //     email,
  //     password: {
  //       create: {
  //         hash: hashedPassword,
  //       },
  //     },
  //   },
  // });

  // await prisma.note.create({
  //   data: {
  //     title: "My first note",
  //     body: "Hello, world!",
  //     // userId: user.id,
  //   },
  // });

  await prisma.post.create({
    data: {
      description: "My second topic",
      active: true,
      authorName: "Igor",
      authorCity: "Teresina",
      authorCountry: "Brasil",
      upVotes: 5,
      downVotes: 2,
      tags: "Hello,world",
    },
  });

  await prisma.post.create({
    data: {
      description: "My first topic",
      active: true,
      authorName: "Igor",
      authorCity: "Teresina",
      authorCountry: "Brasil",
      upVotes: 2,
      downVotes: 12,
      tags: "Hello,world",
    },
  });

  // console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
