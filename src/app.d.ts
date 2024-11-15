// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Models } from 'node-appwrite';

export type User = Models.User<Models.Preferences> | undefined;

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
