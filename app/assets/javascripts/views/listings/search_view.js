QueueSkipper.Views.SearchView = Backbone.View.extend({
  initialize: function(){
    this.mapView = new QueueSkipper.Views.MapView({
      collection: this.collection
    }).render();
    this.listingsIndex = new QueueSkipper.Views.ListingsIndex({
      collection: this.collection
    }).render();
  },
  
  template: JST['search/search_view'],
  
  render: function(){
    this.$el.html(this.template);
    this.$('#map').html(this.mapView.$el);
    this.$('#listings-index').html(this.listingsIndex.$el);
    return this;
  },
});