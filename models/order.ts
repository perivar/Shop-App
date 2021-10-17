import Product from './product';

class Order {
  public id: string;
  public items: Product[];
  public totalAmount: number;
  public date: Date;

  constructor(id: string, items: Product[], totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export default Order;
