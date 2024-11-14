<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { PageData } from "./$types";
    import '../app.css';

    let { children, data }: { children: Snippet<[]>, data: PageData } = $props();

    const { user } = data;

</script>

<nav class="bg-gray-700 p-4 text-white flex items-center justify-between">
    <a href="/" class="text-lg font-semibold hover:text-gray-300">Головна</a>

    <span class="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
        Магазин квітів
    </span>

    {#if user}
        <div class="flex items-center space-x-4">
            <!-- Wrap the username in an <a> tag to make it clickable -->
            <a href="/account" class="text-sm hover:text-gray-300">{ user?.name }</a>
            <form method="post" action="/logout" class="inline"></form>
        </div>
    {:else}
        <a href="/login" class="text-sm font-semibold hover:text-gray-300">Вхід</a>
    {/if}
</nav>

{@render children()}
