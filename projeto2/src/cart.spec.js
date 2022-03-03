import Cart from "./cart";

describe("Cart", () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("should return 0 when getTotal is executed in a newly created instance", () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it("should be multiply quantity and price and receive total amount", () => {
    const item = {
      product: {
        title: "produto 1",
        price: 35388,
      },
      quantity: 2,
    };

    cart.add(item);

    expect(cart.getTotal()).toEqual(70776);
  });
});
