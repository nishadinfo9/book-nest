export interface OrderType {
  id: string
  userId: string
  status: string
  totalAmount: number
  paymentStatus: string
  paymentGateway: string
  paymentMethod: string
  shippingAddress: string
  transactionId: string
}

export interface OrderResponse {
  id: string
  title: string
  stock: string
  amount: number
  status: string
  paymentStatus: string
  createdAt: string
}