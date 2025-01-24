'use server';
import type { Address } from "@/interfaces"
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string ) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Error: No save the address'
        }
    }
}


const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        });

        const addressToSave = {
            userId: userId,
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            city: address.city,
            countryId: address.country,
            phone: address.phone,
            postalCode: address.postalCode,
        }
        // create a new address
        if (!storeAddress) {
            const newAddress = prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }

        // update the address
        const updateAddress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave
        })
        return updateAddress;

    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Error: No create or replace the address'
        }
    }
}