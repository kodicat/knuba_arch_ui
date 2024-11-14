import { SESSION_COOKIE, createSessionClient } from "$lib/server/appwrite";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        redirect(302, "/signup");
    }

    return {
        user: locals.user,
    };
}

export const actions: Actions = {
    default: async (event) => {
        const { account } = createSessionClient(event);

        // Delete the session on Appwrite, and delete the session cookie.
        await account.deleteSession("current");
        event.cookies.delete(SESSION_COOKIE, { path: "/" });

        redirect(302, "/signup");
    },
};
