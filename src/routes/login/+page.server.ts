import { SESSION_COOKIE, createAdminClient, getSession } from "$lib/server/appwrite";
import { fail, redirect } from "@sveltejs/kit";
import { AppwriteException, ID, OAuthProvider } from "node-appwrite";
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, cookies, locals }) => {
        const user = locals?.user;
        const ses = getSession(cookies)
        // already logged in
        if (user) {
            redirect(302, "/");
        }

        const form = await request.formData();
        const email = form.get("email");
        const password = form.get("password");

        if (!email) {
            return fail(400, { email, error: true, message: "Пошта обов'язкова"});
        }
        if (!password) {
            return fail(400, { email, error: true, message: "Пароль обов'язковий"});
        }

        const { account } = createAdminClient();

        try {
            const session = await account.createEmailPasswordSession(email.toString(), password.toString());

            cookies.set(SESSION_COOKIE, session.secret, {
                sameSite: "strict",
                expires: new Date(session.expire),
                secure: true,
                path: "/",
                });

        } catch (e) {
            console.log(e);

            if (e instanceof AppwriteException) {
                return fail(401, { email, error: true, message: "Неправильна пошта чи пароль"});
            }
        }

        redirect(302, "/");
    },
};
