'use server'; 
import prisma from "@/lib/prisma";

export const deleteUserAddress = async ( userId: string ) => {
    try {
        const deleteAddress = await prisma.userAddress.delete({
            where: {
                userId
            }
        });
        return {
            ok: true,
            address: deleteAddress
        }
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Error: No delete the address'
        }
    }
}
 