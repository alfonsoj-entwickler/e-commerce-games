"use server";

import prisma from "@/lib/prisma";
import { Hardware } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Hardware;
}

export const getPagintionGameWithImages = async ({
  page = 1,
  take = 12,
  category
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const games = await prisma.game.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        hardware: category
      },
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

    const totalCount = await prisma.game.count({
      where: {
        hardware: category
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      games: games.map((game) => ({
        ...game,
        images: game.GameImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("not loaded the games");
  }
};
