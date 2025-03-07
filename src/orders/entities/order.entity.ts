export enum Status {
  CANCELLED = 'CANCELLED',
  TRANSPORT = 'TRANSPORT',
  PREPARATION = 'PREPARATION',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  AWAITING_PICKUP = 'AWAITING_PICKUP',
}

export default class Order {
  id: number;
  userId: number;
  productsIds: number[];
  totalPrice: number;
  status: Status;

  constructor(dto: {
    id: number;
    userId: number;
    productsIds: number[];
    totalPrice: number;
    status: Status;
  }) {
    this.id = dto.id;
    this.userId = dto.userId;
    this.productsIds = dto.productsIds ?? [];
    this.totalPrice = dto.totalPrice ?? 0;

    if (this._isNotAValidStatus(dto.status)) {
      throw new Error(`Invalid status: ${dto.status}`);
    }
    this.status = dto.status;
  }

  updateStatus(newStatus: Status) {
    if (this._isNotAValidStatus(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    this.status = newStatus;
  }

  _isNotAValidStatus(value: Status) {
    return !Object.values(Status).includes(value);
  }
}
