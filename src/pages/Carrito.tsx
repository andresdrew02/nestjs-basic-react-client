import { useAtom } from "jotai";
import Layout from "../layout/Layout";
import { carritoAtom, userAtom } from "../store/store";
import { useEffect, useState } from "react";
import { isTokenValid } from "../lib/Auth";
import {
  NormalizedCarrito,
  getTotal,
  normalizeCarrito,
} from "../types/carrito";
import CarritoComponent from "../components/CarritoComponent";

export default function Carrito() {
  const [user] = useAtom(userAtom);
  const [carrito] = useAtom(carritoAtom);
  const [normalizedCarrito, setNormalizedCarrito] = useState<NormalizedCarrito>(
    []
  );

  // Check if JWT token is Valid, if not, redirect to login.
  // First atom load will always set user to null, this is why I have to check the user this way..
  // I tried loadable from jotai/utils that set state in the atom data, but it didn't work
  const checkAuth = async () => {
    const isValid = await isTokenValid();
    if (!isValid) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    checkAuth();
    setNormalizedCarrito(normalizeCarrito(carrito));
  }, []);

  return (
    <Layout user={user}>
      <button className="btn btn-ghost" onClick={() => window.history.back()}>
        Volver atrás
      </button>
      <div className="flex justify-around items-start mt-10">
        <div className="p-4">
          {normalizedCarrito.length === 0 && (
            <h1 className="text-center text-2xl mx-auto">
              No hay productos en el carrito
            </h1>
          )}
          <div className="flex flex-col gap-4">
            {normalizedCarrito.map((product) => (
              <CarritoComponent
                producto={product}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
        <div className="w-1/4 border-blue-700 border-2 p-6 rounded-xl">
          <h1 className="text-2xl">Total: {getTotal(normalizedCarrito)}€</h1>
          <h2>Total de artículos: {normalizedCarrito.length}</h2>
          <button className="btn btn-block btn-primary mt-4">
            ¡Comprar ahora!
          </button>
        </div>
      </div>
    </Layout>
  );
}
