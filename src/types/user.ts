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