QueueSkipper.Collections.Listings = Backbone.Collection.extend({
  model: QueueSkipper.Models.Listing,
  url: '/api/listings',

  getOrFetch: function (id) {
    var listing = this.get(id),
      listings = this;
    if(!listing) {
      listing = new QueueSkipper.Models.Listing({ id: id });
      listing.fetch({
        success: function () {
          listings.add(listing);
        },
      });

    } else {

      listing.fetch();
      
    }
    return listing;
  }
  
  
});

QueueSkipper.Collections.listings = new QueueSkipper.Collections.Listings();