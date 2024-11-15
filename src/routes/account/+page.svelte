<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const { user, orders } = data;
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

<div class="mt-6">
    <h2 class="text-xl font-semibold mb-4">Ваші замовлення</h2>
    {#if orders.length > 0}
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {#each orders as order}
                <div class="overflow-hidden rounded-xl bg-white shadow-lg p-4">
                    <h3 class="text-lg font-medium mb-2">Замовлення {order.id}</h3>
                    <p class="text-sm text-gray-500">Дата: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <ul class="mt-2 text-sm text-gray-700">
                        {#each order.cartProducts as product}
                            <li class="flex justify-between">
                                <span>{product.product.title}</span>
                                <span>{product.quantity} x {product.product.price} грн.</span>
                            </li>
                        {/each}
                    </ul>
                    <p class="mt-4 font-semibold">Загальна сума: {order.totalAmount} грн.</p>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-gray-600">Немає замовлень.</p>
    {/if}
</div>
