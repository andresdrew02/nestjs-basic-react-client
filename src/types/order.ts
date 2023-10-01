export type Order = {
    orderItems: OrderItem[]
}

export type OrderItem = {
    productId: number,
    quantity: number
}