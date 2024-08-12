import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // delete old db
  await prisma.gameImage.deleteMany();
  await prisma.game.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;

  // categories
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = prisma.category.findMany();

  const categoriesMap = (await categoriesDB).reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbGame = await prisma.game.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imageData = images.map((image) => ({
      url: image,
      gameId: dbGame.id,
    }));

    await prisma.gameImage.createMany({
      data: imageData,
    });
  });

  console.log("Seed run right");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
