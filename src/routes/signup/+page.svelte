<script lang="ts">
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
    <h1 class="text-2xl font-bold text-gray-600 mb-4 text-center">Реєстрація</h1>
    <form action="?/signup" method="post" class="p-4 bg-white shadow rounded-md w-full max-w-sm mx-auto space-y-4">
        <input
            type="text"
            placeholder="Ім'я"
            name="name"
            value={form?.name || ''}
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        />
        <input
            type="email"
            placeholder="Пошта"
            name="email"
            value={form?.email || ''}
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        />
        <input
            type="password"
            placeholder="Пароль"
            name="password"
            required
            minlength="8"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        />
        <button
            type="submit"
            class="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
            Реєстрація
        </button>
    </form>

    {#if form?.error}<p class="error">{form?.message}</p>{/if}

    <p class="text-sm text-gray-600">
        Вже є акаунту? <a href="/login" class="text-gray-400 hover:text-gray-700">Увійти</a>
    </p>
</div>