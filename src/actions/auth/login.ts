'use server';

import { signIn } from "@/auth.config";

export async function authenticate( prevState: string | undefined, formData: FormData, ) {
    try {
        // console.log("formData --> ", Object.fromEntries(formData));
        // await sleep(2);

        await signIn('credentials', { ...Object.fromEntries(formData), redirect: false,});
        return 'Success';
    } catch (error) {
        console.log(error)
        return 'UnknowError'
    }
}

export const login = async (email: string, password: string) => {
    try {
        await signIn('credentials', { email, password });
        return {
            ok: true
        }
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'no session'
        }
    }
    
}