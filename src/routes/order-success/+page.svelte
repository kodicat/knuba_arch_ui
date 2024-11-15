<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import type { CartProduct } from '$lib/types';

    let cartProducts: CartProduct[] = [];

    page.subscribe(($page) => {
        const cartQuery = $page.url.searchParams.get('cart');
        if (cartQuery) {
            cartProducts = JSON.parse(decodeURIComponent(cartQuery));
        }
    });

    // should be browser
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cartProducts = JSON.parse(storedCart);
        }
    }

    const totalAmount = cartProducts.reduce((total, product) => total + (product.product.price * product.quantity), 0).toFixed(2);

    function clearCart() {
        goto('/');
    }
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-semibold text-center text-gray-500 mb-4">Замовлення оформлено!</h1>
        <p class="text-center text-lg text-gray-700 mb-6">Дякуємо за замовлення. Ми вже працюємо над вашими квіточками.</p>

        <div class="mb-6">
            <h2 class="text-2xl font-semibold mb-4">Деталі замовлення</h2>
            {#if cartProducts.length > 0}
                <div class="space-y-4">
                    {#each cartProducts as product}
                        <div class="flex justify-between items-center">
                            <img src={product.product.thumbnail} alt={product.product.title} class="w-16 h-16 object-cover rounded-md" />
                            <div class="flex-1 ml-4">
                                <p class="text-lg font-medium">{product.product.title}</p>
                                <p class="text-sm text-gray-500">{product.quantity} x {product.product.price} грн.</p>
                            </div>
                            <p class="text-lg font-semibold">{(product.product.price * product.quantity).toFixed(2)} грн.</p>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-center text-lg text-gray-500">У вашому замовленні немає товарів.</p>
            {/if}
        </div>

        <div class="flex justify-between items-center">
            <p class="text-xl font-semibold text-gray-800">Загалом до сплати:</p>
            <p class="text-xl font-semibold text-gray-500">{totalAmount} грн.</p>
        </div>

        <div class="mt-6 text-center">
            <button
                onclick={clearCart}
                class="w-full bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
                Повернутися на головну
            </button>
        </div>
    </div>
</div>
