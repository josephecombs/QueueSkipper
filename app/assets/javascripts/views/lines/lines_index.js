QueueSkipper.Views.LinesIndex = Backbone.View.extend({
  events: {
    'click .delete': 'destroyLine'
  },

  template: JST['lines/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync destroy', this.render);
  },

  destroyLine: function (event) {
    var $target = $(event.target);
    var line = this.collection.get($target.attr('data-id'));

    line.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      lines: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
});