export function assertReservationHasPayment(depositAmount: number) {
  if (depositAmount <= 0) {
    throw new Error("Cannot reserve stock without a deposit or payment.");
  }
}

export function assertAvailableStock(availableQty: number, requestedQty: number) {
  if (availableQty < requestedQty) {
    throw new Error(`Insufficient available stock. Requested ${requestedQty}, available ${availableQty}.`);
  }
}
