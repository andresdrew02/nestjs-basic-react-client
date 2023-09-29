import { useState } from 'react'

export type validFormData = {
    valid: boolean,
    data: FormData
}

export default function LoginForm({ callback } : {callback: (data: validFormData) => void}) {
    const submitHandler = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        callback(validateData(formData))
    }

    const validateData = (formData: FormData): validFormData => {
        const email = formData.get('email')
        const password = formData.get('password')
        return {
            valid: !!email && !!password,
            data: formData
        }
    }

    return(
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">NestJS</h1>
            <form className="space-y-4" onSubmit={submitHandler}>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Correo eletrónico" className="w-full input input-bordered" name="email" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Contraseña</span>
                    </label>
                    <input type="password" placeholder="Introduzca la contraseña"
                        className="w-full input input-bordered" name="password"/>
                </div>
                <div>
                    <button className="btn btn-block">Iniciar sesión</button>
                </div>
            </form>
        </div>
    </div>
    )
}