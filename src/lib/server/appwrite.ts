import { Client, Account, Databases } from 'node-appwrite';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

export const SESSION_COOKIE = 'flowers-store-session';

export function createAdminClient() {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT)
        .setKey(APPWRITE_KEY)
        .setSelfSigned(true);

    return {
        get account() {
            return new Account(client);
        }
    };
}

export function createSessionClient(cookies: Cookies) {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT)
        .setSelfSigned(true);

    const session = cookies.get(SESSION_COOKIE);
    if (!session) {
        throw new Error("No user session");
    }

    client.setSession(session);

    return {
        get account() {
            return new Account(client);
        }
    };
}

// export function createAnonDatabaseClient() {
//     const client = new Client()
//         .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
//         .setProject(PUBLIC_APPWRITE_PROJECT)
//         .setSelfSigned(true);

//     return {
//         get account() {
//             return new Databases(client);
//         }
//     };
// }

export const getSession: (cookies: Cookies) => string | undefined = (cookies) => {
    return cookies?.get(SESSION_COOKIE);
}
