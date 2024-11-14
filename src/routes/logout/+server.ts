import { createSessionClient, SESSION_COOKIE } from "$lib/server/appwrite";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
    try {
        const { account } = createSessionClient(cookies);
        await account.deleteSession("current");
    } catch {}

    cookies.delete(SESSION_COOKIE, { path: "/" });
    locals.user = undefined;

    return new Response(null, { status: 303,
        headers: {
            location: request.headers.get('referer') || '/'
        }
    });
};
