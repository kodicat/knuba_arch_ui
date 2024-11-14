<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { PageData } from "./$types";
    import '../app.css';

    let { children, data }: { children: Snippet<[]>, data: PageData } = $props();

    const { user } = data;

</script>

<nav class="bg-gray-700 p-4 text-white fixed flex items-center justify-between h-12 w-full left-0 top-0">
    <a href="/" class="text-lg font-semibold hover:text-gray-300">Головна</a>

    <span class="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
        Магазин квітів
    </span>

    {#if user}
        <div class="flex items-center space-x-4">
            <a href="/account" class="text-sm hover:text-gray-300">{ user?.name }</a>
            <form method="post" action="/logout" class="inline"></form>
        </div>
    {:else}
        <a href="/login" class="text-sm font-semibold hover:text-gray-300">Вхід</a>
    {/if}
</nav>

<div class=" mt-1 grid grid-cols-1 gap-10 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> </div>

{@render children()}
