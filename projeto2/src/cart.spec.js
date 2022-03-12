import Cart from "./cart";

describe("Cart", () => {
  let cart;
  const product = {
    id: 1,
    title: "produto 1",
    price: 35388,
  };
  const product2 = {
    id: 2,
    title: "produto 2",
    price: 40388,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe("getTotal()", () => {
    it("should be return 0 when getTotal is executed in a newly created instance", () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it("should be multiply quantity and price and receive total amount", () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should be not have duplicated products", () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);
      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should be update value when update and remove product", () => {
      const item1 = {
        product,
        quantity: 2,
      };

      const item2 = {
        product: product2,
        quantity: 5,
      };

      cart.add(item1);
      cart.add(item2);
      cart.remove(item2);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
  });

  describe("checkout()", () => {
    it("should be return an object with total and the list of items", () => {
      const item1 = {
        product,
        quantity: 2,
      };

      const item2 = {
        product: product2,
        quantity: 5,
      };

      cart.add(item1);
      cart.add(item2);

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it("should be include in summary formatted total", () => {
      const item1 = {
        product,
        quantity: 2,
      };

      const item2 = {
        product: product2,
        quantity: 5,
      };

      cart.add(item1);
      cart.add(item2);

      expect(cart.summary().formatted).toEqual("R$2,727.16");
    });

    it("should reset cart when checkout() called", () => {
      const item1 = {
        product,
        quantity: 2,
      };

      cart.add(item1);

      cart.checkout();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe("special conditions", () => {
    it("should be apply percentage discount when above minium passed", () => {
      const condition = {
        percentage: 30,
        minimun: 2,
      };

      cart.add({ condition, product, quantity: 3 });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it("should be apply quantity discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({ condition, product, quantity: 4 });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it("should be apply quantity discount for odd quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({ condition, product, quantity: 5 });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it("should be receive more one discount condition and apply the best discount (quantity)", () => {
      const condition1 = {
        quantity: 2,
      };

      const condition2 = {
        percentage: 30,
        minimun: 2,
      };

      cart.add({ condition: [condition1, condition2], product, quantity: 5 });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it("should be receive more one discount condition and apply the best discount (percentage)", () => {
      const condition1 = {
        quantity: 2,
      };

      const condition2 = {
        percentage: 80,
        minimun: 2,
      };

      cart.add({ condition: [condition1, condition2], product, quantity: 5 });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
