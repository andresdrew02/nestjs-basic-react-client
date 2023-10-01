export type Order = {
    orderItems: OrderItem[]
}

export type OrderItem = {
    productId: number,
    quantity: number
}

export type UserOrderItem = {
    id: number
    userId: string
    orderDate: string
    status: string
    orderItems: [{
        id: number,
        productId: number,
        orderId: number,
        quantity: number,
        totalLine: number,
        product: {
            id: number,
            name: string
            price: number
            quantity: number
            description: string
        }
    }]
}

export type UserOrders = UserOrderItem[]