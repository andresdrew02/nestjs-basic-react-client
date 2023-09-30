import { useParams } from "react-router-dom"
import Layout from "../layout/Layout"
import { useAtom } from "jotai"
import { userAtom } from "../store/store"
import { BsArrowLeftShort } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import { Product } from "../types/product"
import { getProductById } from "../lib/Api"
import { Error as ErrorType, isError } from "../types/error"
import DetailedProductComponent from "../components/DetailedProductComponent"

export default function DetailedProduct(){
    const id = useParams().id
    const [user] = useAtom(userAtom)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [product, setProduct] = useState<Product | ErrorType>()

    const NotExist = () => (
        <Layout user={user}>
               <button className="btn btn-ghost m-4 text-md" onClick={() => window.history.back()}>
                   <BsArrowLeftShort/>
                   Ir atrás
               </button>
               <h1 className="text-2xl">No existe un producto con esa ID</h1>
           </Layout>
    )

    if (!id){
        return <NotExist/>
    }

    const fetchProduct = async () => {
        const product = await getProductById(parseInt(id))
        if (isError(product)){
            setError(true)
            setLoading(false)
            return
        }
        setProduct(product as Product)
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    },[])
   

    if (error){
        return <NotExist/>
    }

    if (loading){
        return (
            <Layout user={user}>
                <div className="w-100 flex justify-center items-center">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </Layout>
        )
    }

    return (
        <Layout user={user}>
            <button className="btn btn-ghost m-4 text-md" onClick={() => window.history.back()}>
                <BsArrowLeftShort/>
                Ir atrás
            </button>
            {product && !isError(product) && (
                <DetailedProductComponent product={product} />
            )}
        </Layout>
    )
}