QueueSkipper.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "lines/new": "new",
    "lines/:id": "show",
    "lines/:id/edit": "edit"
  },

  edit: function (id) {
    var line = QueueSkipper.Collections.lines.getOrFetch(id);

    var formView = new QueueSkipper.Views.PostForm({
      model: line
    });

    this._swapView(formView);
  },

  index: function () {
    var indexView = new QueueSkipper.Views.PostsIndex({
      collection: QueueSkipper.Collections.lines
    });
    this._swapView(indexView);
  },

  new: function () {
    var newPost = new QueueSkipper.Models.Post();

    var formView = new QueueSkipper.Views.PostForm({
      collection: QueueSkipper.Collections.lines,
      model: newPost
    });

    this._swapView(formView);
  },

  show: function (id) {
    var line = QueueSkipper.Collections.lines.getOrFetch(id);
    var formView = new QueueSkipper.Views.PostShow({ model: line });
    this._swapView(formView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
});