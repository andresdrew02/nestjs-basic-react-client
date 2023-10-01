import { Link } from "react-router-dom";
import { UserOrderItem } from "../types/order";

export default function OrderComponent({
  userOrder,
}: {
  userOrder: UserOrderItem;
}) {
  const convertDate = () => {
    const dateString = userOrder.orderDate;
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="card w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Pedido del día: {convertDate()}</h2>
        <p>Estado del pedido: {userOrder.status}</p>
        <p>Productos: </p>
        <ul>
          {userOrder.orderItems.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.productId}`} className="font-bold hover:underline">{product.product.name}</Link>: {product.quantity} unidades
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
