QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  events: {
    'click .delete': 'destroyListing'
  },

  template: JST['listings/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync destroy', this.render);
  },

  destroyListing: function (event) {
    var $target = $(event.target);
    var listing = this.collection.get($target.attr('data-id'));

    listing.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
});