import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  // delete old db
  await prisma.userAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.gameImage.deleteMany();
  await prisma.game.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();

  const { categories, products, users } = initialData;

  // users
  await prisma.user.createMany({ 
    data: users
  });

  // categories
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  await prisma.country.createMany({
    data: countries,
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
