class SweetShop {
  constructor() {
    this.sweets = [];
  }

  addSweet(sweet) {
    const exists = this.sweets.some(s => s.id === sweet.id);
    if (exists) {
      throw new Error('Sweet with this ID already exists');
    }
    this.sweets.push(sweet);
  }
  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sweet with this ID does not exist');
    }
    this.sweets.splice(index, 1);
  }
  searchByName(name) {
  return this.sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(name.toLowerCase())
  );
}

searchByCategory(category) {
  return this.sweets.filter(sweet =>
    sweet.category.toLowerCase().includes(category.toLowerCase())
  );
}

searchByPriceRange(min, max) {
  return this.sweets.filter(sweet =>
    sweet.price >= min && sweet.price <= max
  );
}

  viewSweets() {
    return this.sweets;
  }

purchaseSweet(id, quantity) {
  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error('Sweet with this ID does not exist');
  }
  if (sweet.quantity < quantity) {
    throw new Error('Not enough stock to complete the purchase');
  }
  sweet.quantity -= quantity;
}

restockSweet(id, quantity) {
  const sweet = this.sweets.find(s => s.id === id);
  if (!sweet) {
    throw new Error('Sweet with this ID does not exist');
  }
  sweet.quantity += quantity;
}
 
}

module.exports = { SweetShop };
