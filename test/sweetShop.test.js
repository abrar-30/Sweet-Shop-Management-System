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


describe('Delete Sweet', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  test('should delete a sweet by ID', () => {
    const sweet1 = { id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    const sweet2 = { id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 30 };

    shop.addSweet(sweet1);
    shop.addSweet(sweet2);

    shop.deleteSweet(1001);
    const sweets = shop.viewSweets();

    expect(sweets.length).toBe(1);
    expect(sweets[0].id).toBe(1002);
  });

  test('should throw an error when trying to delete a non-existent sweet', () => {
    expect(() => {
      shop.deleteSweet(9999);
    }).toThrow('Sweet with this ID does not exist');
  });
});

describe('SweetShop - Search Sweets', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();

    shop.addSweet({ id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 30 });
    shop.addSweet({ id: 1003, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, quantity: 15 });
  });

  test('should search sweets by name', () => {
    const results = shop.searchByName('kaju');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Kaju Katli');
  });

  test('should search sweets by category', () => {
    const results = shop.searchByCategory('Milk-Based');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Gulab Jamun');
  });

  test('should search sweets by price range', () => {
    const results = shop.searchByPriceRange(10, 35);
    expect(results.length).toBe(2);
    expect(results.map(s => s.name)).toEqual(expect.arrayContaining(['Gulab Jamun', 'Gajar Halwa']));
  });
});


describe('SweetShop - Inventory Management (Purchase and Restock)', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
    shop.addSweet({ id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
  });

  test('should reduce quantity when a sweet is purchased', () => {
    shop.purchaseSweet(1001, 5);
    const sweet = shop.viewSweets().find(s => s.id === 1001);
    expect(sweet.quantity).toBe(15);
  });

  test('should throw error if purchase quantity exceeds stock', () => {
    expect(() => {
      shop.purchaseSweet(1001, 25);
    }).toThrow('Not enough stock to complete the purchase');
  });

  test('should throw error if sweet ID not found for purchase', () => {
    expect(() => {
      shop.purchaseSweet(9999, 1);
    }).toThrow('Sweet with this ID does not exist');
  });

  test('should increase quantity when a sweet is restocked', () => {
    shop.restockSweet(1001, 10);
    const sweet = shop.viewSweets().find(s => s.id === 1001);
    expect(sweet.quantity).toBe(30);
  });

  test('should throw error if sweet ID not found during restock', () => {
    expect(() => {
      shop.restockSweet(9999, 10);
    }).toThrow('Sweet with this ID does not exist');
  });
});
