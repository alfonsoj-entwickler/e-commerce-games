'use server'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async( id: string ) => {
    const session = await auth();
    const userId = session?.user.id;
    
    if (!userId) {
        return {
            ok: false,
            message: 'No session user active'
        }
    }

    try {
        // order from db
        const order = await prisma.order.findUnique({
            where: {
                id: id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,

                                GameImage: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })
        // console.log(`Order - ${id} --> `, { order });
        if (!order) throw new Error(`Order no exited`);
        if (session.user.id === 'user') {
            if (session.user.id !== order.userId) {
                throw new Error(`Order of other user`);
            }
        }

        // orders products from db
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId: order?.id
            }
        })
        // console.log(`OrderItems - ${order?.id} --> `, { orderItems });

        // orders address
        const orderAddress = await prisma.orderAddress.findUnique({
            where: {
                orderId: order?.id
            }
        })
        // console.log(`orderAddress - ${order?.id} --> `, { orderAddress });

        // products images from db
        const productsImages = orderItems.map(order => {
            return prisma.gameImage.findFirst({
                where: {
                    gameId: order.productId
                }
            })
        })  
        const images = await Promise.all(productsImages)
        // console.log(`productsImages - ${order?.id} --> `, { images });
        
        // response
        return {
            ok: true,
            products: order,
            address: orderAddress,
            images: images,
        }
        
    } catch (error) {
        return {
            ok: false,
            message: `Error - getOrderById ${id} --> ${error}`
        }
    }
    
}