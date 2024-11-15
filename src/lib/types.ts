export type Product = {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
};

export type CartProduct = {
    id: string
    product: Product;
    quantity: number;
}
