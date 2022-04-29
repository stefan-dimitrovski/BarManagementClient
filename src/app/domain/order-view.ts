export interface OrderView {
  orderView: {
    orderId: number,
    openedAt: Date
    closedAt: Date,
    tableId: number,
    waiterName: string,
    drinkName: string,
    drinkCategory: string,
    drinkPrice: number,
    quantity: number
  }[],
  totalPrice: number
}
