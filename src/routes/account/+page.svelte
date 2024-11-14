<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const { user } = data;
</script>

<div class="bg-gray-100 p-6 rounded-md shadow-md text-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Інформація користувача</h2>

        <!-- Logout Button aligned to the right -->
        <form method="post" action="/logout">
            <button
                type="submit"
                class="bg-gray-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                Вийти
            </button>
        </form>
    </div>

    <ul class="space-y-2">
        <!--
        <li class="flex items-center">
            <strong class="w-24 text-gray-600">ID:</strong>
            <span>{user?.$id}</span>
        </li>
        -->
        <li class="flex items-center">
            <strong class="w-24 text-gray-600">Пошта:</strong>
            <span>{user?.email}</span>
        </li>
        <li class="flex items-center">
            <strong class="w-24 text-gray-600">Ім'я:</strong>
            <span>{user?.name}</span>
        </li>
    </ul>
</div>
