import { Link } from "react-router-dom";
import { Product } from "../types/product";

export default function ProductComponent({product}: {product: Product}){
    return (
  <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
  <div className="p-4">
    <Link to={`/product/${product.id}`} className="font-bold text-xl mb-2 hover:underline">{product.name}</Link>
    <p className="text-gray-700 text-base">{product.description}</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="font-bold text-xl">{product.price}€</span>
      <button className={`btn btn-primary m-2`} disabled={product.quantity === 0} title={product.quantity === 0 ? "No hay stock" : "Agregar al carrito"}>
        Agregar al carrito
      </button>
    </div>
  </div>
</div>
    )
}