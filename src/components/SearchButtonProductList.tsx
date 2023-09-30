import { Link } from "react-router-dom";
import { ProductList } from "../types/product";

export default function SearchButtonProductList({products} : {products: ProductList}){
    if (products.length === 0){
        return (
            <div className="p-4">
                <h1>No se han encontrado productos</h1>
            </div>
        )
    }

    return (
        <div className="p-4">
            <ul>
                {products.map(product => (
                    <li key={product.id} className="mt-4"><a href={`/product/${product.id}`} className="font-bold text-xl mb-2 hover:underline">{product.name}</a></li>
                ))}
            </ul>
        </div>
    )
}