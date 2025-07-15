const { SweetShop } = require('../src/sweetShop');

describe('SweetShop - Add Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  test('should add a sweet to shop', () => {
    const sweet = {
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };

    shop.addSweet(sweet);
    const sweets = shop.viewSweets();

    expect(sweets.length).toBe(1);
    expect(sweets[0]).toEqual(sweet);
  });

  test('should not allow more than one same id sweet', () => {
    const sweet1 = { id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    const sweet2 = { id: 1001, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 30 };

    shop.addSweet(sweet1);

    expect(() => shop.addSweet(sweet2)).toThrow('Sweet with this ID already exists');
  });
});
