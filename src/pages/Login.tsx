import { ToastContainer, toast } from "react-toastify";
import LoginForm, { validFormData } from "../components/LoginForm";
import 'react-toastify/dist/ReactToastify.css';
import { login, saveToken } from "../lib/Auth";
import { userAtom } from "../store/store";
import { useAtom } from 'jotai'

export default function Login(){
    const [user] = useAtom(userAtom)
    const loginResponse = async (data: validFormData) => {
        if (!data.valid){
            // Notificate error
            toast.error("No pueden existir campos en blanco")
            return
        }
        // Valid Data, Try Login In
        const loginResponse = await login(data)
        if (loginResponse.message){
            // Notificate error
            toast.error(loginResponse.message)
            return
        }else if (loginResponse.access_token){
            toast.success("¡Sesión iniciada!")
            setTimeout(() => {
                saveToken(loginResponse.access_token)
                window.location.href = "/shop"
            }, 500);
        }else{
            // Notificate error
            toast.error("Uuups!, algo ha ido mal, prueba de nuevo más tarde.")
        }
    }

    if (user){
        history.back()
    }

    return (
        <>
        <ToastContainer/>
        <LoginForm callback={loginResponse}/>
        </>
    )
}