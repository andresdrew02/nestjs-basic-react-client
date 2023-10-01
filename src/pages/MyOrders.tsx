import { useAtom } from "jotai";
import Layout from "../layout/Layout";
import { getUserOrders, isTokenValid } from "../lib/Auth";
import { useEffect, useState } from "react";
import { userAtom } from "../store/store";
import { UserOrders } from "../types/order";
import OrderComponent from "../components/OrderComponent";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [user] = useAtom(userAtom);
  const [orders, setOrders] = useState<UserOrders>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const checkAuth = async () => {
    const isValid = await isTokenValid();
    if (!isValid) {
      window.location.href = "/login";
    }
  };

  const getOrders = async () => {
    setLoading(true)
    const orders = await getUserOrders()
    setOrders(orders)
    setLoading(false)
  }

  useEffect(() => {
    checkAuth();
    getOrders()
  }, []);

  if (loading){
    return(
        <Layout user={user}>
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-bars w-20"></span>
            </div>
        </Layout>
    )
  }

  if (!loading && orders.length === 0) {
    return(
      <Layout user={user}>
        <div className="flex justify-center items-center mt-10">
          <h1>No ha hecho ningún pedido, <Link to="/shop">¡Ir a la tienda!</Link></h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={user}>
      <ul>
        {orders.map((order) => (
          <div className="p-4">
            <OrderComponent userOrder={order} key={order.id}/>
          </div>
        ))}
      </ul>
    </Layout>
  )
}
