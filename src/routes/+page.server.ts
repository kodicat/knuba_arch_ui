import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        redirect(301, '/signup');
    }

    redirect(301, '/account');
}
