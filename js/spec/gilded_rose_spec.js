describe("Gilded Rose", function() {

  it("should degrade sell_in and quality by 1 for a normal item", function() {
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it("should degrade quality twice as fast after the sell date", function() {
    items = [ new Item("Elixir of the Mongoose", 0, 2) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("quality of item should never be negative ", function() {
    items = [ new Item("Elixir of the Mongoose", -1, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie increases in quality the older it gets", function() {
    items = [ new Item("Aged Brie", 2, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(1);
  });

  it("The Quality of an item is never more than 50", function() {
    items = [ new Item("Aged Brie", 2, 50) ];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(50);
  });

  it("Sulfuras never gets sold and the quality never changes", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ];
    update_quality();
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(80);
  });

  it("Backstage passes increase in quality the older they get", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(14);
    expect(items[0].quality).toEqual(21);
  });

  it("Backstage passes increase by 2 when sell_in is 10 or less", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(27);
  });

});
