import { Product } from "../types/product";

export default function DetailedProductComponent({product}: {product: Product}) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-700 mb-2">Precio: {product.price}€</p>
      <p className="text-gray-700 mb-2">Descripción: {product.description}</p>
      <p className="text-gray-700 mb-2">Stock: {product.quantity}</p>
      <button
        className={`btn btn-block btn-primary`}
        disabled={product.quantity === 0}
        title={product.quantity === 0 ? "No hay stock" : "Agregar al carrito"}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
