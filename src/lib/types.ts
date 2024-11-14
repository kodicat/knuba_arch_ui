export type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
};

export type CartProduct = {
    id: string
    product: Product;
    quantity: number;
}
