'use server'
import prisma from "@/lib/prisma";
import { Game } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const gameSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    tags: z.string()
})

export const createUpdateGame = async (formData: FormData) => {
    //console.log(formData);

    const data = Object.fromEntries(formData);
    const gameParsed = gameSchema.safeParse(data);

    if (!gameParsed.success) {
        console.log(gameParsed.error);
        return { ok:false }
    }
    
    const game = gameParsed.data;
    game.slug = game.slug.toLowerCase().replace(/ /g, '-').trim();
    const { id, ...rest } = game;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let game: Game;
            const tagsArray = rest.tags.split(',').map( tag => tag.trim().toLowerCase())
            if (id) {
                // update
                game = await prisma.game.update({
                    where: { id },
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                });
                
            }
            else {
                //create a new game
                game = await prisma.game.create({
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        },
                    }
                })
            }
    
            //console.log({ game });

            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);
                console.log(images)
            }
            
            return { 
                game
            }
        });

        revalidatePath('/admin/games/');
        revalidatePath(`/admin/game/${game.slug}`);
        revalidatePath(`/games/${game.slug}`);
        return {
            ok: true,
            game: prismaTx.game
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No update or create the game'
        }
    }
    
}

const uploadImages = async(images: File[]) => {
    try {
        
            const uploadsPromises = images.map(async (image) => {
                try {
                    const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then( r => r.secure_url)
                } catch (error) {
                    console.error(`Cloudinary - ${error}`);
                    return null;
                }
                
            }) 

        const uploadImages = await Promise.all(uploadsPromises);
        return uploadImages;
        
    } catch (error) {
        console.error(`Cloudinary - ${error}`);
        return null;
    }
}