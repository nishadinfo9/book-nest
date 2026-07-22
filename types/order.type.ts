export interface OrderType {
  id: string
  userId: string
  status : string
  totalAmount : number
  paymentStatus : string
  paymentGateway : string
  paymentMethod : string
  shippingAddress : string
  transactionId : string
}
