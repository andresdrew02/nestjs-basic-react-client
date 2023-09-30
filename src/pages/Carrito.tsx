import { useAtom } from "jotai";
import Layout from "../layout/Layout";
import { carritoAtom, userAtom } from "../store/store";
import { useEffect } from "react";
import { isTokenValid } from "../lib/Auth";

export default function Carrito() {
    const [user] = useAtom(userAtom)
    const [carrito] = useAtom(carritoAtom)

    // Check if JWT token is Valid, if not, redirect to login. 
    // First atom load will always set user to null, this is why I have to check the user this way..
    // I tried loadable from jotai/utils that set state in the atom data, but it didn't work
    const checkAuth = async () => {
        const isValid = await isTokenValid()
        if (!isValid){
            window.location.href = "/login"
        }
    }

    useEffect(() => {
        checkAuth()
    })

    return (
        <Layout user={user}>
            <div className="p-4">
                <button className="btn btn-ghost" onClick={() => window.history.back()}>Volver atrás</button>
                {carrito.length === 0 && <h1 className="text-center text-2xl mx-auto">No hay productos en el carrito</h1>}
                <ul>
                    {carrito.map(product => (
                        <li key={product.id} className="mt-4"><a href={`/product/${product.id}`} className="font-bold text-xl mb-2 hover:underline">{product.id}</a></li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}