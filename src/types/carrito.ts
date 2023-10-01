import { Product } from "./product"

export type Carrito = Product[]

type ProductoWithStock = Product & { quantity: number }

export type NormalizedCarrito = ProductoWithStock[]

export function normalizeCarrito(carrito: Carrito){
    // Check if carrito have repeated products
    const normalizedCarrito: ProductoWithStock[] = []
    carrito.forEach(product => {
        if (normalizedCarrito.find(normalizedProduct => normalizedProduct.id === product.id)){
            //@ts-ignore
            normalizedCarrito.find(normalizedProduct => normalizedProduct.id === product.id).quantity += 1
        } else {
            normalizedCarrito.push({...product, quantity: 1})
        }
    })
    return normalizedCarrito
}

export function getTotal(normalizedCarrito: NormalizedCarrito){
    return normalizedCarrito.reduce((total, product) => total + product.price * product.quantity, 0)
}