QueueSkipper.Collections.Listings = Backbone.Collection.extend({
  model: QueueSkipper.Models.Listing,
  url: '/api/listings',

  getOrFetch: function (id) {
    var listing = this.get(id),
      listings = this;
    if(!listing) {
      listing = new QueueSkipper.Models.Listing({ id: id });
      debugger;
      listing.fetch({
        success: function () {
          listings.add(listing);
        },
      });
      // listing.fetch({ success: function () { listings.add(listing); }, options: { tlt: 37.835573, tlg: -122.547144, brt: 37.737895, brg: -122.361750 } });
    } else {
      //may need to pass in mapBounds here

      listing.fetch();
      
    }
    debugger;
    return listing;
  }
  
  
});

QueueSkipper.Collections.listings = new QueueSkipper.Collections.Listings();