QueueSkipper.Collections.Lines = Backbone.Collection.extend({
  model: QueueSkipper.Models.Line,
  url: '/api/lines',

  // comparator: function(line) {
  //   return line.get('votes');
  // },

  // findByVotes: function(votes) {
  //   return this.filter(function(line) {
  //     return line.get('votes') == votes;
  //   });
  // },

  getOrFetch: function (id) {
    var line = this.get(id),
      lines = this;
    if(!line) {
      line = new QueueSkipper.Models.Line({ id: id });
      line.fetch({
        success: function () {
          lines.add(line);
        },
      });
    } else {
      line.fetch();
    }
    return line;
  }
});

QueueSkipper.Collections.lines = new QueueSkipper.Collections.Lines();