import { userAtom } from "../store/store"
import { useAtom } from "jotai/react";
import { useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { logout } from "../lib/Auth";

export default function Logout() {
    const [user, setUser] = useAtom(userAtom)
    const [searchParams] = useSearchParams()

   useEffect(() => {
    setTimeout(() => {
        setUser(null)
        logout() // lib -> Auth.ts -> removes localStorage jwt token
        const pageParam = searchParams.get('page')

        if (searchParams.size > 0 && pageParam){
            document.location.href = pageParam
        }else{
            document.location.href = '/'
        }
        
    }, 500)
   }, []) 

    

    return(
        <div className="flex justify-center items-center h-screen w-100">
            <span className="loading loading-ball w-20"></span>
        </div>
    )
}