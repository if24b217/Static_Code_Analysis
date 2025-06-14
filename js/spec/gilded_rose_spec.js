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

});
