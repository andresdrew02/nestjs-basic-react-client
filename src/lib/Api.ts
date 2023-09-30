import { ProductFilters } from "../pages/Tienda";
import { Error } from "../types/error";
import { Product, ProductList } from "../types/product";

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