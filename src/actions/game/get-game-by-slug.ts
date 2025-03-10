'use server'

import prisma from "@/lib/prisma";

export const getGameBySlug = async ( slug:string) => {
    try {
        const game = await prisma.game.findFirst({
            include: {
                GameImage: true,
            },
            where: {
                slug: slug,
            }
        });
        
        if (!game) return null;

        return {
            ...game,
            images: game.GameImage.map(image => image.url)
        };
        
    } catch (error) {
        console.log(error);
        throw new Error('Game not found')
    }
}