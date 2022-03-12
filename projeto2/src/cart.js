import Dinero from "dinero.js";

Dinero.defaultCurrency = "BRL";
Dinero.defaultPrecision = 2;
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

  calculatePercentageDiscount(amount, item) {
    const { condition, quantity } = item;
    let amountWithDiscount = Dinero({ amount: 0 });
    let percentageCondition;

    if (Array.isArray(condition)) {
      percentageCondition = condition.find((element) => element.percentage);
    } else {
      percentageCondition = condition;
    }

    if (
      percentageCondition?.percentage &&
      quantity > percentageCondition?.minimun
    ) {
      amountWithDiscount = amount.percentage(percentageCondition.percentage);
    }

    return amountWithDiscount;
  }

  calculateQuantityDiscount(amount, item) {
    const { condition, quantity } = item;
    let quantityCondition;

    if (Array.isArray(condition)) {
      quantityCondition = condition.find((element) => element.quantity);
    } else {
      quantityCondition = condition;
    }

    const isEven = quantity % 2 === 0;

    let amountWithDiscount = Dinero({ amount: 0 });

    if (quantityCondition?.quantity && quantity > quantityCondition?.quantity) {
      amountWithDiscount = amount.percentage(isEven ? 50 : 40);
    }

    return amountWithDiscount;
  }

  calculateDiscount(amount, item) {
    const list = Array.isArray(item.condition)
      ? item.condition
      : [item.condition];

    const allDiscounts = list.map((condition) => {
      if (condition.quantity) {
        return this.calculateQuantityDiscount(amount, item).getAmount();
      }

      if (condition.percentage) {
        return this.calculatePercentageDiscount(amount, item).getAmount();
      }
    });

    const bestDiscount = Math.max(...allDiscounts);

    return Dinero({ amount: bestDiscount });
  }

  getTotal() {
    const total = this.items.reduce((acc, item) => {
      const amount = Dinero({ amount: item.quantity * item.product.price });
      let discount = Dinero({ amount: 0 });

      if (item.condition) {
        discount = this.calculateDiscount(amount, item);
      }

      return acc.add(amount).subtract(discount);
    }, Dinero({ amount: 0 }));
    return total;
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.toFormat("$0,0.00");

    return {
      total,
      formatted,
      items: this.items,
    };
  }

  checkout() {
    const { total, items } = this.summary();
    this.items = [];

    return {
      total: total.getAmount(),
      items,
    };
  }
}
