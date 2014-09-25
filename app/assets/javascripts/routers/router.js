QueueSkipper.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644)
    };
  },

  routes: {
    "": "index",
    "listings/new": "new",
    "listings/:id": "show",
    "listings/:id/edit": "edit"
  },

  edit: function (id) {
    var listing = QueueSkipper.Collections.listings.getOrFetch(id);

    var formView = new QueueSkipper.Views.ListingForm({
      model: listing
    });

    this._swapView(formView);
  },

  index: function () {
    QueueSkipper.Collections.listings.fetch();
    var indexView = new QueueSkipper.Views.ListingsIndex({
      collection: QueueSkipper.Collections.listings
    });

    this._swapView(indexView);

    // this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
  },

  new: function () {
    var newListing = new QueueSkipper.Models.Listing();

    var formView = new QueueSkipper.Views.ListingForm({
      collection: QueueSkipper.Collections.listings,
      model: newListing
    });

    this._swapView(formView);mn    
  },

  show: function (id) {
    var listing = QueueSkipper.Collections.listings.getOrFetch(id);
    var formView = new QueueSkipper.Views.ListingShow({ model: listing });
    this._swapView(formView);
  },
  
  // showListingListings: function (id) {
  //   var listing = QueueSkipper.Collections.listings.getOrFetch(id);
  //   var formView = new QueueSkipper.Views.ListingShow({ model: listing });
  //   this._swapView(formView);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});