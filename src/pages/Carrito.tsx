import { useAtom } from "jotai";
import Layout from "../layout/Layout";
import { carritoAtom, userAtom } from "../store/store";
import { useEffect, useState } from "react";
import { isTokenValid } from "../lib/Auth";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
    Carrito,
  NormalizedCarrito,
  getTotal,
  normalizeCarrito,
} from "../types/carrito";
import CarritoComponent from "../components/CarritoComponent";
import { toast, ToastContainer } from "react-toastify";
import { saveOrder } from "../lib/Api";
import { Product } from "../types/product";

export default function CarritoPage() {
  const [user] = useAtom(userAtom);
  const [carrito, setCarrito] = useAtom(carritoAtom);
  const [normalizedCarrito, setNormalizedCarrito] = useState<NormalizedCarrito>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const clearCarrito = () => {
    setCarrito([]);
    setNormalizedCarrito([]);
  };

  const makeOrder = async () => {
    setLoading(true);
    const orderResponse = await saveOrder(normalizedCarrito);
    if (orderResponse === 201) {
      toast.success("¡Gracias por tu compra!");
      clearCarrito();
    } else {
      toast.error(
        "Ups!, algo ha ido mal, quizá haya intentado comprar mas cantidad de la que hay disponible de algún producto. Comprueba su compra y si no funciona, prueba de nuevo más tarde."
      );
    }
    setLoading(false);
  };

  const deleteProduct = (producto: Product) => {
    if (producto.quantity - 1 <= 0) {
      const newCarrito = carrito.filter((p) => p.id !== producto.id);
      setCarrito(newCarrito);
      setNormalizedCarrito(normalizeCarrito(newCarrito));
    } else {
        // Delete one quantity of the product
        const index = carrito.findIndex((p) => p.id === producto.id);
        const newCarrito = [...carrito];
        newCarrito.splice(index, 1);
        setCarrito(newCarrito);
        setNormalizedCarrito(normalizeCarrito(newCarrito));
    }
  };

  return (
    <Layout user={user}>
      <ToastContainer />
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
                handleDelete={deleteProduct}
              />
            ))}
          </div>
        </div>
        <div className="w-1/4 border-blue-700 border-2 p-6 rounded-xl">
          <span
            className="float-right text-xl hover:cursor-pointer active:scale-90 transition-all"
            title='La "compra" ha realizar no es real, no se cobrará un importe. Es solo un ejemplo'
            onClick={() =>
              toast.info(
                'La "compra" ha realizar no es real, no se cobrará un importe. Es solo un ejemplo'
              )
            }
          >
            <BsFillInfoCircleFill />
          </span>
          <h1 className="text-2xl">Total: {getTotal(normalizedCarrito)}€</h1>
          <h2>Total de artículos: {normalizedCarrito.length}</h2>
          <button
            className="btn btn-block btn-primary mt-4"
            onClick={makeOrder}
            disabled={normalizedCarrito.length === 0}
          >
            {!loading && "¡Comprar ahora!"}
            {loading && <span className="loading loading-dots"></span>}
          </button>
          {normalizedCarrito.length !== 0 && (
            <p
              className="text-center mt-2 text-sm text-red-300 hover:underline cursor-pointer"
              onClick={clearCarrito}
            >
              Vaciar el carrito
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
