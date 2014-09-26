QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  template: JST['listings/index'],

  initialize: function () {
    this.listingsIndexItem = new QueueSkipper.Views.ListingsIndexItem({
      collection: this.collection
    }).render();
    
    this.listenTo(this.collection, "add", this.addListingItem);
    this.listenTo(this.collection, "remove", this.removeListingItem);
  },
  
  addListingItem: function (listing) {
    $('ul').append('<li data-id=' + listing.attributes.id + '>' + listing.attributes.description + '</li>');
  },
  
  removeListingItem: function (listing) {
    $('li').filter(function(){
        return $(this).data('id') === listing.attributes.id;
    }).remove();
  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});