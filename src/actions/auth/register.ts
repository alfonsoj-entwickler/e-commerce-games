'use server';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';


export const registerUser = async (name: string, email: string, password: string) => {

    try {
        const user = await prisma.user.create(
            {
                data: {
                    name: name,
                    email: email.toLowerCase(),
                    password: bcryptjs.hashSync(password)
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        )
        return {
            ok: true,
            user: user,
            message: 'User created'
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'No create a new user'
        }

    }
}