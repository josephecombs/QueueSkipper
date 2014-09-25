QueueSkipper.Views.ListingForm = Backbone.View.extend({
  events: {
    'submit form': 'submit'
  },

  template: JST['listings/form'],

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      listing: this.model
    });
    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.target).serializeJSON();

    function success () {
      Backbone.history.navigate("", { trigger: true });
    }

    this.model.set(attrs);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: success,
        // `wait: true` tells the collection to wait until the server has
        // confirmed the model was saved successfully before adding it to
        // itself
        wait: true
      });
    } else {
      this.model.save({}, {
        success: success
      });
    }
  }
});