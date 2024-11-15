<script lang="ts">
    import type { CartProduct } from '$lib/types';
    import CartItem from './cart-item.svelte';
    import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
    import X from 'phosphor-svelte/lib/X';
    import { goto } from '$app/navigation';

    let { data } = $props();

    let cartOpen = $state(false);
    let cartProducts = $state<CartProduct[]>([]);

    const cartStats = $derived.by(() => {
        let quantity = 0;
        let total = 0;
        for (const product of cartProducts) {
            quantity += product.quantity;
            total += product.product.price * product.quantity;
        }
        return {
            quantity,
            total
        };
    });

    function removeFromCart(id: string) {
        cartProducts = cartProducts.filter((product) => product.id !== id);
    }

    function addToCart(product: any) {
        if (cartProducts.length) {
            let itemAlreadyExist: boolean = false;
            cartProducts.forEach((cartProduct) => {
                if (cartProduct.product.title === product.title) {
                    cartProduct.quantity++;
                    return (itemAlreadyExist = true);
                }
            });
            if (!itemAlreadyExist) {
                cartProducts.push({
                    id: crypto.randomUUID(),
                    quantity: 1,
                    product: product
                });
            }
        } else {
            cartProducts.push({
                id: crypto.randomUUID(),
                quantity: 1,
                product: product
            });
        }
    }

    const isEmptyCart = $derived(cartStats.quantity <= 0);
    let cartLabel = $state('Кошик');

    $effect(() => {
        if (isEmptyCart) {
            cartLabel = 'Кошик';
        } else {
            cartLabel = 'Кошик (' + cartStats.quantity + ')';
        }
    });

    function checkout() {
        if (cartProducts.length === 0) {
            return;
        }

        goto("/checkout");
    }
</script>

<div class="fixed left-0 top-10 flex h-12 w-full items-center bg-gray-700 p-4">
    <div class="relative ml-auto flex items-center">
        <button
            onclick={() => (cartOpen = !cartOpen)}
            class="flex items-center rounded-full bg-gray-500 px-4 py-2 text-white hover:bg-gray-800"
        >
            <ShoppingCart class="mr-2 size-5" />
            <span>{cartLabel}</span>
        </button>
        {#if cartOpen}
            <div class="absolute right-0 top-8 z-10 mt-2 w-80 rounded-lg bg-white shadow-xl">
                <div class="relative p-4">
                    <h2 class="mb-4 text-lg font-semibold">Твій Кошик</h2>
                    <button
                        class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
                        aria-label="close cart"
                        onclick={() => (cartOpen = false)}
                    >
                        <X class="size-5" />
                    </button>
                    {#each cartProducts as _, i}
                        <CartItem bind:cartProduct={cartProducts[i]} removeItem={removeFromCart} />
                    {/each}
                    <div class="mt-4 border-gray-200 pt-4">
                        <p class="text-lg font-semibold">Загалом: {cartStats.total.toFixed(2)} грн.</p>
                    </div>
                    {#if !isEmptyCart}
                    <div class="mt-4">
                        <button
                            onclick={checkout}
                            class="w-full rounded-lg bg-gray-500 text-white py-2 hover:bg-gray-600"
                        >
                            Оформити замавлення
                        </button>
                    </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</div>

<div class="mt-12 grid grid-cols-1 gap-6 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {#each data.products as product}
        <div class="overflow-hidden rounded-xl bg-white shadow-lg">
            <img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
            <div class="p-4">
                <p class="mb-2 overflow-hidden truncate text-lg font-medium text-gray-800">
                    {product.title}
                </p>
                <div class="flex items-center justify-between">
                    <p class="text-xl font-bold">{product.price} грн.</p>
                    <button
                        class="rounded-full bg-gray-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-700"
                        onclick={() => addToCart(product)}
                    >
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>
