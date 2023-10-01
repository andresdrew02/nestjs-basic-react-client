import { useAtom } from "jotai";
import Layout from "../layout/Layout";
import { isTokenValid } from "../lib/Auth";
import { useEffect } from 'react'
import { userAtom } from "../store/store";

export default function MyOrders(){
    const [user] = useAtom(userAtom)
    const checkAuth = async () => {
        const isValid = await isTokenValid();
        if (!isValid) {
          window.location.href = "/login";
        }
      };
    
      useEffect(() => {
        checkAuth();
      }, []);

    return(
        <Layout user={user}>
        </Layout>
    )
}