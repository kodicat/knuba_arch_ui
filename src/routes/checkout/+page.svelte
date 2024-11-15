<script lang="ts">
    import { goto } from '$app/navigation';
    import type { CartProduct } from '$lib/types';

    let cartProducts = $state<CartProduct[]>([]);

    // should be browser
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cartProducts = JSON.parse(storedCart);
        }
    }

    // Checkout logic
    function confirmOrder() {
        goto('/order-success');
    }
</script>

<h1 class="text-3xl font-semibold mb-6">Оформлення замовлення</h1>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each cartProducts as product}
        <div class="overflow-hidden rounded-xl bg-white shadow-lg">
            <img src={product.product.thumbnail} alt={product.product.title} class="h-48 w-full object-cover" />
            <div class="p-4">
                <p class="mb-2 font-medium text-lg text-gray-800">{product.product.title}</p>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-500">{product.quantity} x {product.product.price} грн.</span>
                    <span class="text-xl font-semibold text-gray-800">{(product.product.price * product.quantity).toFixed(2)} грн.</span>
                </div>
            </div>
        </div>
    {/each}
</div>

<div class="mt-6 text-lg font-semibold">
    <div class="flex justify-between mb-4">
        <span>Total:</span>
        <span class="text-xl">{cartProducts.reduce((total, product) => total + (product.product.price * product.quantity), 0).toFixed(2)} грн.</span>
    </div>

    <button onclick={confirmOrder} class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
        Підтвердини замовлення
    </button>
</div>
