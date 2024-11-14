import { SESSION_COOKIE, createAdminClient } from "$lib/server/appwrite";
import { fail, redirect } from "@sveltejs/kit";
import { ID, OAuthProvider } from "node-appwrite";
import type { Actions } from './$types';

export const actions: Actions = {
  signup: async ({ request, cookies }) => {
    const form = await request.formData();
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    if (!email) {
        return fail(400, { email, name, missing: true, errorMessage: "Пошта обов'язкова"});
    }
    if (!password) {
        return fail(400, { email, name, missing: true, errorMessage: "Пароль обов'язковий"});
    }

    const { account } = createAdminClient();

    await account.create(ID.unique(), email.toString(), password.toString(), name?.toString());
    const session = await account.createEmailPasswordSession(email.toString(), password.toString());

    cookies.set(SESSION_COOKIE, session.secret, {
      sameSite: "strict",
      expires: new Date(session.expire),
      secure: true,
      path: "/",
    });

    redirect(302, "/account");
  },
};
