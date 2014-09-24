QueueSkipper.Collections.LineListings = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.line = options.line;
  }, 
  
  model: QueueSkipper.Models.LineListing,
  // url: '/api/lines/:id/line_listings',
  url: function () {
    return '/api/lines/' + this.line.id + '/line_listings';
  },

  // comparator: function(line) {
  //   return line.get('votes');
  // },

  // findByVotes: function(votes) {
  //   return this.filter(function(line) {
  //     return line.get('votes') == votes;
  //   });
  // },

  getOrFetch: function (id) {
    var lineListing = this.get(id),
      lineListings = this;
    if(!lineListing) {
      lineListing = new QueueSkipper.Models.LineListing({ id: id });
      lineListing.fetch({
        success: function () {
          lineListings.add(line);
        },
      });
    } else {
      lineListing.fetch();
    }
    return lineListing;
  }
});
