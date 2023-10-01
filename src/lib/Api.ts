import { ProductFilters } from "../pages/Tienda";
import { NormalizedCarrito } from "../types/carrito";
import { Error } from "../types/error";
import { Order, OrderItem } from "../types/order";
import { Product, ProductList } from "../types/product";
import { getToken } from "./Auth";

export async function getProducts(filters: ProductFilters = {}, query?: string): Promise<ProductList>{
    let queryString = ''
    let filterCounter = 0
    if (query){
        queryString = filterCounter === 0 ? `?name=${query}` : `&name=${query}`
        filterCounter++
    }
    if (filters.stock){
        queryString += filterCounter === 0 ? `?stock=${filters.stock}` : `&stock=${filters.stock}`
        filterCounter++
    }
    if (filters.price){
        queryString += filterCounter === 0 ? `?price=${filters.price}` : `&price=${filters.price}`
        filterCounter++
    }
    if (filters.page){
        queryString += filterCounter === 0 ? `?page=${filters.page}` : `&page=${filters.page}`
        filterCounter++
    }
    return (await fetch('http://localhost:3000/api/products' + `${queryString}`)).json()
}

export async function getProductById(id: number): Promise<Product | Error>{
    return (await fetch(`http://localhost:3000/api/products/${id}`)).json()
}

export async function saveOrder(normalizedCarrito: NormalizedCarrito){
    const orderItems: OrderItem[] = []
    normalizedCarrito.forEach(product => {
        orderItems.push({
            productId: product.id,
            quantity: product.quantity
        })
    })

    const order: Order = {
        orderItems: orderItems
    }

    const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(order)
    })
    
    return response.status
}