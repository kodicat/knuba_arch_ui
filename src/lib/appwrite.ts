import { Client, Databases } from "node-appwrite";
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';

export function createAnonDatabaseClient() {
    const client = new Client()
        .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT)
        .setSelfSigned(true);

    return {
        get databases() {
            return new Databases(client);
        }
    };
}
