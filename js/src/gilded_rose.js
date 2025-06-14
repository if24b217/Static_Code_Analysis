function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

// Helper functions
function isAgedBrie(item) {
  return item.name === 'Aged Brie';
}

function isSulfuras(item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function isBackstagePass(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isConjured(item) {
  return item.name.toLowerCase().includes('conjured');
}

function increaseQuality(item, amount = 1) {
  item.quality = Math.min(50, item.quality + amount);
}

function decreaseQuality(item, amount = 1) {
  item.quality = Math.max(0, item.quality - amount);
}

function update_quality() {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (isSulfuras(item)) {
      // Legendary item: no change
      continue;
    }

    if (isAgedBrie(item)) {
      increaseQuality(item);
    } else if (isBackstagePass(item)) {
      if (item.sell_in > 10) {
        increaseQuality(item);
      } else if (item.sell_in > 5) {
        increaseQuality(item, 2);
      } else if (item.sell_in > 0) {
        increaseQuality(item, 3);
      } else {
        // After concert
        item.quality = 0;
      }
    } else {
      // Normal or conjured item degradation
      let degradeAmount = isConjured(item) ? 2 : 1;
      decreaseQuality(item, degradeAmount);
    }

    // Decrease sell_in for all but Sulfuras
    item.sell_in -= 1;

    // If sell_in < 0, apply additional degradation
    if (item.sell_in < 0) {
      if (isAgedBrie(item)) {
        increaseQuality(item);
      } else if (isBackstagePass(item)) {
        item.quality = 0;
      } else {
        let degradeAmount = isConjured(item) ? 2 : 1;
        decreaseQuality(item, degradeAmount);
      }
    }
  }
}
