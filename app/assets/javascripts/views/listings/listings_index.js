QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  template: JST['listings/index'],

  initialize: function () {
    this.listenTo(this.collection, "add", this.addListingItem);
    this.listenTo(this.collection, "remove", this.removeListingItem);
  },
  
  addListingItem: function (listing) {

    $('ul').append('<li data-id=' + listing.attributes.id + '>' + listing.attributes.description + '</li>');
  },
  
  removeListingItem: function (listing) {
    $('li').filter(function(){
        return $(this).data('id') === listing.attributes.id
    }).remove();
  },
  
  
  
  // destroyListing: function (event) {
  //   var $target = $(event.target);
  //   var listing = this.collection.get($target.attr('data-id'));
  //
  //   listing.destroy();
  // },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
});