import { validFormData } from "../components/LoginForm"
import { UserOrders } from "../types/order"
import { RegisterData, User } from "../types/user"
import { UserProfileResponse } from "../types/user"

export function isTokenAvailable(){
    return localStorage.getItem('token') !== null
}

export async function isTokenValid() : Promise<boolean>{
    const token = localStorage.getItem('token')
    
    if (!token) return false

    const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.ok
}

export function saveToken(token: string){
    localStorage.setItem('token', token)
}

export function getToken(){
    return localStorage.getItem('token')
}

export async function getProfile(): Promise<User>{
    const token = localStorage.getItem('token')

    if (!token) return null

    const userProfileRequest = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const userProfile: UserProfileResponse = await userProfileRequest.json()
    return {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.username
    }
}

export async function register(registerData: RegisterData){
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
    return await response.json()
}

export async function login(userData: validFormData) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userData.data.get('email'),
            password: userData.data.get('password')
        })
    })
    return await response.json()
}

export function logout(){
    localStorage.removeItem('token')
}

export async function getUserOrders(): Promise<UserOrders>{
    const token = getToken()
    if (!token) return []
    const response = await fetch('http://localhost:3000/api/orders', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    })
    return await response.json()
}