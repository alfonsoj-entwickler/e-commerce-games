"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPagintionGameWithImages = async ({
    page = 1,
    take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const games = await prisma.game.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        GameImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    // console.log(games);
    return {
      games: games.map((game) => ({
        ...game,
        images: game.GameImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("not loaded the games");
  }
};
