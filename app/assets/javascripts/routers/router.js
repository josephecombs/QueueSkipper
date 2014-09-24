QueueSkipper.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "lines/new": "new",
    "lines/:id": "show",
    "lines/:id/edit": "edit"
    //don't think I need this route.  Just need to render line_listings on the line page
    // "lines/:id/line_listings": "showLineListings"
  },

  edit: function (id) {
    var line = QueueSkipper.Collections.lines.getOrFetch(id);

    var formView = new QueueSkipper.Views.LineForm({
      model: line
    });

    this._swapView(formView);
  },

  index: function () {
    QueueSkipper.Collections.lines.fetch();
    var indexView = new QueueSkipper.Views.LinesIndex({
      collection: QueueSkipper.Collections.lines
    });

    this._swapView(indexView);
  },

  new: function () {
    var newLine = new QueueSkipper.Models.Line();

    var formView = new QueueSkipper.Views.LineForm({
      collection: QueueSkipper.Collections.lines,
      model: newLine
    });

    this._swapView(formView);
  },

  show: function (id) {
    
    var line = QueueSkipper.Collections.lines.getOrFetch(id);
    debugger;
    var lineListings = QueueSkipper.Collections.lineListings.getOrFetch(id);
    var formView = new QueueSkipper.Views.LineShow({ model: line });
    this._swapView(formView);
  },
  
  // showLineListings: function (id) {
  //   var line = QueueSkipper.Collections.lines.getOrFetch(id);
  //   var formView = new QueueSkipper.Views.LineShow({ model: line });
  //   this._swapView(formView);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});