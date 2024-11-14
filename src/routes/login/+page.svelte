<script lang="ts">
    import type { ActionData } from './$types';

    let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
    <h1 class="text-2xl font-bold text-gray-600 mb-4 text-center">Вхід</h1>
    <form action="/login" method="post" class="p-6 bg-white shadow rounded-md w-full max-w-sm space-y-4">
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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
        />
        <button
            type="submit"
            class="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
            Увійти
        </button>
    </form>

    {#if form?.error}<p class="text-red-500 text-sm mt-2">{form?.message}</p>{/if}

    <p class="text-sm text-gray-600">
        Немає акаунту? <a href="/signup" class="text-gray-400 hover:text-gray-700">Зареєструватися</a>
    </p>
</div>