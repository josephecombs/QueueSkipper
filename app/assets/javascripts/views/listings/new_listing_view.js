QueueSkipper.Views.NewListingView = Backbone.View.extend({
  initialize: function(){
    this.mapView = new QueueSkipper.Views.NewListingMapView({
      model: this.model
    }).render();
    // this.listingsSidebar = new QueueSkipper.Views.NewListingSidebar({
    //   model: this.model
    // }).render();
  },
  
  template: JST['listings/new'],
  
  render: function(){
    this.$el.html(this.template);
    this.$('#map').html(this.mapView.$el);
    // this.$('#new-listing-sidebar').html(this.listingsSidebar.$el);
    return this;
  },
});