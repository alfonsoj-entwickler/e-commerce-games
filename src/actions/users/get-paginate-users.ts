'use server'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginateUsers = async() => {
    const session = await auth(); 
    
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'No session user active'
        }
    }

    try {
        // order from db
        
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'desc'
            }
        })
        // console.log(`Order - ${id} --> `, { order });
        if (!users) throw new Error(`Order no exited`); 
        
        //console.log('getPaginateOrders', orders);

        // response
        return {
            ok: true,
            users: users,
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Error - getPaginateUsers ${error}`
        }
    }
    
}