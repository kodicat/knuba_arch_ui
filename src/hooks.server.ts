import { createSessionClient } from '$lib/server/appwrite';
import type { Handle } from '@sveltejs/kit';
import type { Account, Models } from 'node-appwrite';

export const handle: Handle = async ({ event, resolve }) => {
    let user: Models.User<Models.Preferences> | undefined;
    try {
        const { account } = createSessionClient(event.cookies);
        user = await account.get();
    } catch {}

    event.locals.user = user;
    return resolve(event);
}
