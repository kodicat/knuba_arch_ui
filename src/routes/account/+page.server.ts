import { json, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { createAnonDatabaseClient } from '$lib/appwrite';
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ORDERS_COLLECTION } from '$env/static/public';
import { Query } from "node-appwrite";

export const load: PageServerLoad = async ({ locals }) => {
    const userId = locals.user?.$id;
    if (!userId) {
        redirect(302, "/");
    }

    try {
        const { databases } = createAnonDatabaseClient();
        const response = await databases.listDocuments(
            PUBLIC_APPWRITE_DATABASE,
            PUBLIC_APPWRITE_ORDERS_COLLECTION,
            [
                Query.equal('userId', userId),
                Query.orderDesc('$createdAt')
            ]
        );

        const orders = response.documents.map(x => ({
            id: x.$id,
            userId: x.userId,
            phone: x.phone,
            address: x.address,
            totalAmount: x.totalAmount,
            cartProducts: JSON.parse(x.cartProducts),
            createdAt: x.$createdAt
        }))

        return { orders: orders };
    } catch (error) {
        console.error('Failed to load orders:', error);
        return { orders: [] };
    }
}