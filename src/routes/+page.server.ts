import { createAnonDatabaseClient } from '$lib/appwrite';
import type { PageServerLoad } from './$types'
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PRODUCTS_COLLECTION } from '$env/static/public';
// import { createAnonDatabaseClient } from '$lib/server/appwrite';

export const load: PageServerLoad = async () => {
    // const dbClient = createAnonDatabaseClient();

    const { databases } = createAnonDatabaseClient();

    const response = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE,
        PUBLIC_APPWRITE_PRODUCTS_COLLECTION
    );

    console.log(response);

    const products = response.documents.map(x => ({
        id: x.$id,
        title: x.title,
        price: x.price,
        thumbnail: x.thumbnail
    }));

    return {
        total: response.total,
        products: products
    }
}
