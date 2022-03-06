export default class Cart {
  items = [];

  add(item) {
    if (this.items.includes(item)) return;

    this.items.push(item);
  }

  remove(item) {
    const filteredItems = this.items.filter(
      (i) => i.product.id !== item.product.id
    );

    this.items = filteredItems;
  }

  getTotal() {
    const total = this.items.reduce(
      (acc, item) => (acc + item.quantity) * item.product.price,
      0
    );
    return total;
  }

  summary() {
    return {
      total: this.getTotal(),
      items: this.items,
    };
  }

  checkout() {
    this.items = [];

    return this.summary();
  }
}
