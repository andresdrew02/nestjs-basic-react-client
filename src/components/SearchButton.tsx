import SearchButtonProductList from "./SearchButtonProductList";
import Searchbar from "./Searchbar";
import { useState } from 'react'
import { ProductList } from "../types/product";
import { getProducts } from "../lib/Api";
import { ProductFilters } from "../pages/Tienda";

export default function SearchButton(){
    const [products, setProducts] = useState<ProductList>([])
    const searchBarHandler = (query: string) => {
        fetchProducts(query)
    }

    // Fetch Products By Query
    const fetchProducts = async (query: string) => {
        const filters: ProductFilters = {}
        const products = await getProducts(filters, query)
        // Limit Products Lenght
        if (products.length > 5){
            products.length = 5
        }
        setProducts(products)
    }
    

    return(
        <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </label>
        <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72">
            <Searchbar callback={searchBarHandler}/>
            <SearchButtonProductList products={products}/>
        </div>
      </div>
    )
}