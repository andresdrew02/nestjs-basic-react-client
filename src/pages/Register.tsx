import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import { RegisterData } from "../types/user";
import { getProfile, register, saveToken } from "../lib/Auth";
import { useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { useAtom } from "jotai";
import { userAtom } from "../store/store";

export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [, setUser] = useAtom(userAtom)

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Check Blanks
        if (isBlank(formData)){
            toast.error('Todos los campos son obligatorios.')
            return
        }

        // Check Email Format
        if (!isValidEmail(formData.get('email')?.toString())){
            toast.error('El correo no es válido.')
            return
        }

        // Check Passwords
        if (formData.get('password')?.toString() !== formData.get('password-confirmation')?.toString()){
            toast.error('Las contraseñas no coinciden.')
            return
        }

        const registerData: RegisterData = {
            email: formData.get('email')?.toString(),
            username: formData.get('username')?.toString(),
            password: formData.get('password')?.toString(),
            passwordConfirmation: formData.get('password-confirmation')?.toString()
        }

        setLoading(true)
        const response = await register(registerData)
        // Checking response errors
        if (response.message){
            let errorMsg = ""
            if (Array.isArray(response.message)){
                response.message.forEach((message: string) => {
                    errorMsg += message.substring(0,1).toUpperCase() + message.substring(1) + "\n"
                })
                toast.error(errorMsg)
            }else{
                errorMsg = response.message.substring(0,1).toUpperCase() + response.message.substring(1)
                toast.error(errorMsg)
            }
            setLoading(false)
            return
        }
        
        setLoading(false)
        if (!response.access_token){
            toast.error('Oops!, algo ha ido mal, inténtelo de nuevo más tarde.')
            return
        }
        
        // Register succesfully
        toast.success('¡Cuenta creada exitosamente!')
        saveToken(response.access_token)
        setTimeout(() => {
            window.location.href = "/shop"
        }, 1000)
    }

    const isBlank = (formData: FormData) => {
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const passwordConfirmation = formData.get('password-confirmation')
        return !username || !email || !password || !passwordConfirmation
    }

    const isValidEmail = (email: string | undefined) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email as string)
    }

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <ToastContainer/>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Registrar una cuenta</h1>
            <form className="space-y-4" onSubmit={registerUser}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Nombre de usuario</span>
                    </label>
                    <input type="text" placeholder="Nombre de usuario" className="w-full input input-bordered" name="username"/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Dirección de email" className="w-full input input-bordered" name="email"/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Contraseña</span>
                    </label>
                    <div className="flex">
                    <input type={showPassword ? "text" : "password"} placeholder="Ingrese una contraseña"
                        className="w-full input input-bordered" name="password"/>
                        <button onClick={(e: any) => {e.preventDefault(); setShowPassword(!showPassword)}} className="btn btn-square btn-ghost text-xl">{showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}</button>
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Confirmar contraseña</span>
                    </label>
                    <div className="flex">
                    <input type={showPassword ? "text" : "password"} placeholder="Confirme su contraseña"
                        className="w-full input input-bordered" name="password-confirmation"/>
                        <button onClick={(e: any) => {e.preventDefault(); setShowPassword(!showPassword)}} className="btn btn-square btn-ghost text-xl">{showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}</button>
                    </div>
                </div>
                <div>
                    <button className="btn btn-block">
                        {!loading && "Registrarse"}
                        {loading && <span className="loading loading-infinity"></span>}
                    </button>
                </div>
                <span>¿Ya tienes una cuenta?
                    <Link className="text-blue-600 hover:text-blue-800 hover:underline ml-1" to="/login">Iniciar sesión</Link>
                </span>
            </form>
        </div>
    </div>
  );
}
