'use server'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async() => {
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
        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        // console.log(`Order - ${id} --> `, { order });
        if (!orders) throw new Error(`Order no exited`); 
        console.log('getOrdersByUser', orders);
        // response
        return {
            ok: true,
            orders: orders,
        }
        
    } catch (error) {
        return {
            ok: false,
            message: `Error - getOrdersByUser ${error}`
        }
    }
    
}