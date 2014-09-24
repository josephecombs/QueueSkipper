QueueSkipper.Models.Line = Backbone.Model.extend({
  urlRoot: '/api/lines',
  
  lineListings: function () {
    if (!this._lineListings) {
      this._lineListings = new QueueSkipper.Collections.LineListings([], { line: this });
    }
    return this._lineListings;
  }
});