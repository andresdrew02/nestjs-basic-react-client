export type User = null | {
    id: string
    name: string
    email: string
}

export type UserProfileResponse = {
    id: string
    username: string
    email: string
    iat: number
}

export type RegisterData = {
    username: string | undefined
    email: string | undefined
    password: string | undefined 
    passwordConfirmation: string | undefined
}