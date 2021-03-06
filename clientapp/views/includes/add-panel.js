var HumanView = require('human-view');
var templates = require('templates');
var ItemList = require('./add-list');
var Achievements = require('../../models/achievements');

module.exports = HumanView.extend({
  template: templates.includes.addPanel,
  initialize: function (opts) {
    this.backpack = opts.sources.backpack;
    this.wishlist = opts.sources.wishlist;
  },
  render: function () {
    this.renderAndBind();
    this.backpackList = new ItemList({collection: this.backpack});
    this.wishlistList = new ItemList({collection: this.wishlist});
    //this.renderSubview(this.backpackList, '.js-backpack-items'); hiding earned badges for demo
    this.renderSubview(this.wishlistList, '.js-wishlist-items');
    return this;
  },
  events: {
    'click .js-add-items': 'add',
    'click .js-cancel-add': 'cancel'
  },
  add: function (evt) {
    var selected = [].concat(
      this.backpackList.getSelected({deselect: true}),
      this.wishlistList.getSelected({deselect: true})
    );
    this.trigger('add', selected);
    evt.preventDefault();
  },
  cancel: function (evt) {
    this.backpackList.deselectAll();
    this.wishlistList.deselectAll();
    this.trigger('cancel');
    evt.preventDefault();
  }
});