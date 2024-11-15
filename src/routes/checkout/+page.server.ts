import { fail, json, type Actions } from '@sveltejs/kit';
import { createAnonDatabaseClient } from '$lib/appwrite';
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ORDERS_COLLECTION } from '$env/static/public';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const userId = locals.user?.$id;

        const formData = await request.formData();
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const cartProducts = formData.get('cartProducts') as string;
        const totalAmount = parseFloat(formData.get('totalAmount') as string);

        try {
            const orderData = {
                userId,
                phone,
                address,
                totalAmount,
                cartProducts
            };

            const { databases } = createAnonDatabaseClient();
            const order = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ORDERS_COLLECTION, 'unique()', orderData);

            return { success: true, orderId: order.$id };
        } catch (error) {
            console.error('Failed to save order:', error);
            return fail(400, { success: false, error: 'Failed to save order', cause: error });
        }
    }
}
