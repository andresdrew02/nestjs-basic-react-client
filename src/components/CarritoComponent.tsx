import { Link } from "react-router-dom";
import { Product } from "../types/product";

export default function CarritoComponent({producto, quantity}: { producto: Product, quantity: number }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <Link to={`/product/${producto.id}`} className="card-title">{producto.name}</Link>
        <p>{producto.description}</p>
        <div className="card-actions justify-end">
            <p>Cantidad: {quantity}</p>
            <p>Precio unitario: {producto.price}€</p>
            <p>Subtotal: {quantity * producto.price}€</p>
        </div>
      </div>
    </div>
  );
}
