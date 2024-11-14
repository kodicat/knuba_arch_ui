import { createSessionClient } from '$lib/server/appwrite';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        const { account } = createSessionClient(event);
        event.locals.user = await account.get();
    } catch {}

    return resolve(event);
}
