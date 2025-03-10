'use server'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginateOrders = async() => {
    const session = await auth(); 
    
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'No session user active'
        }
    }

    try {
        // order from db
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
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
        
        //console.log('getPaginateOrders', orders);

        // response
        return {
            ok: true,
            orders: orders,
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Error - getOrdersByUser ${error}`
        }
    }
    
}