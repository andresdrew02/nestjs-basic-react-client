import { ProductList } from "../types/product";
import Product from './ProductComponent'

export function ProductListComponent({ productList } : { productList: ProductList}) {
    return (
       <div className={`${productList.length !== 0 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}>
            {productList.map(product => (
                <Product product={product}/>
            ))}
            {productList.length === 0 && <h1 className="text-center text-2xl">No hay productos</h1>}
       </div>
    )
}