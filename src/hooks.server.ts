import { createSessionClient } from '$lib/server/appwrite';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        const { account } = createSessionClient(event.cookies);
        const user = await account.get();
        event.locals.user = user;
    } catch (e) {
        console.log(e);
    }

    return resolve(event);
}
