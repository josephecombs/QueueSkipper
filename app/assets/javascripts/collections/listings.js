QueueSkipper.Collections.Listings = Backbone.Collection.extend({
  model: QueueSkipper.Models.Listing,
  url: '/api/listings',

  // comparator: function(line) {
  //   return line.get('votes');
  // },

  // findByVotes: function(votes) {
  //   return this.filter(function(line) {
  //     return line.get('votes') == votes;
  //   });
  // },

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