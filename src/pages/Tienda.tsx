import Nav from "../components/Nav";
import { useAtom } from "jotai/react";
import { userAtom } from "../store/store";
import { useState, useEffect } from 'react'
import { ProductList } from "../types/product";
import { getProducts as fetchProducts } from "../lib/Api";
import { ProductListComponent } from "../components/ProductListComponent";
import Searchbar from "../components/Searchbar";
import FilterComponent from "../components/FilterComponent";

export type ProductFilters = {
    price? : number,
    stock? : string,
    query? : string
}

export default function Tienda(){
    const [user] = useAtom(userAtom)
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductList>([])
    const [filters, setFilters] = useState<ProductFilters>({
        stock: 'all'
    })

    const getProducts = async () => {
        // Get Products
        setProducts(await fetchProducts())
    }

    // First Query
    useEffect(() => {
        getProducts()
    }, [])

    // Filter Products
    const getFilteredProducts = async (query: string) => {
        setLoading(true)
        setProducts(await fetchProducts(filters, query))
        setLoading(false)
    }

    return(
        <>
            <Nav user={user}/>
            <div className="container mx-auto mt-10 mb-10">
                <FilterComponent onPriceFilterChange={(str: any) => {setFilters({...filters, price: str})}} onStockFilterChange={(str:any) => {setFilters({...filters, stock: str})}}/>
                <Searchbar callback={getFilteredProducts}/>
            </div>
            {loading 
            ? <div className="w-100 flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
            : 
            <>
            <ProductListComponent productList={products}/>
            </>}
        </>
    )
}