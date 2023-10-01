import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { BsFillTrashFill } from 'react-icons/bs'

export default function CarritoComponent({producto, handleDelete}: { producto: Product, handleDelete: Function }){

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <Link to={`/product/${producto.id}`} className="card-title">{producto.name}</Link>
        <p>{producto.description}</p>
        <div className="card-actions justify-end">
            <p>Cantidad: {producto.quantity}</p>
            <p>Precio unitario: {producto.price}€</p>
            <p>Subtotal: {producto.quantity * producto.price}€</p>
        </div>
        <button className="btn btn-ghost btn-square text-xl" onClick={() => handleDelete(producto)}>
            <BsFillTrashFill/>
        </button>
      </div>
    </div>
  );
}
