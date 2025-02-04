'use server'
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const setTransactionId = async (orderId: string, transactionId: string) => {
    const session = await auth();
        const userId = session?.user.id;
        
        if (!userId) {
            return {
                ok: false,
                message: 'No session user active'
            }
        }
    
    try {
        const orderUpdate = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId: transactionId
            }
        })
        
        if (!orderUpdate) {
            return {
                ok: false,
                message: `Order no found -- ${orderId}`
            }    
        }

        return {
            ok: true,
            order: orderUpdate
        }
    } catch (error) {
        return {
            ok: false,
            message: `Error - setTransactionId -- ${error}`
        }
    }
}