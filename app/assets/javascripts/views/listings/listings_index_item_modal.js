QueueSkipper.Views.ListingsIndexItemModal = Backbone.CompositeView.extend({
  template: JST['listings/index_item_modal'],
  
  initialize: function () {
    this.model.fetch();
  },
  
  events: {
    'click .listings-index-item-modal-dismiss': 'dismiss',
    'click .listings-index-item-modal-book': 'book'
  },
  
  dismiss: function (event) {
    event.preventDefault();
    this.remove();
  },
  
  render: function () {
    var content = this.template({ listingIndexItem: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});