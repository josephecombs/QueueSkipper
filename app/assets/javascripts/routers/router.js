QueueSkipper.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "listings/new": "new",
    "listings/:id": "show",
    "listings/:id/edit": "edit",
  //I AM A FUCKING GENIUS.  FACEBOOK SUCKS
	"_=_": "index"
  },

  // edit: function (id) {
  //   var listing = QueueSkipper.Collections.listings.getOrFetch(id);
  //   d
  //   var formView = new QueueSkipper.Views.ListingForm({
  //     model: listing
  //   });
  //
  //   this._swapView(formView);
  // },

  index: function () {
    var searchView = new QueueSkipper.Views.SearchView({
      collection: QueueSkipper.Collections.listings
    });
    QueueSkipper.Collections.listings.fetch();
    this._swapView(searchView);
  },

  new: function () {
    var newListing = new QueueSkipper.Models.Listing();

    var formView = new QueueSkipper.Views.NewListingView({
      model: newListing
    });

    this._swapView(formView);
  },

  // show: function (id) {
  //   var listing = QueueSkipper.Collections.listings.getOrFetch(id);
  //   var formView = new QueueSkipper.Views.ListingShow({ model: listing });
  //   this._swapView(formView);
  // },
  
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