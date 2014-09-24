QueueSkipper.Views.LineForm = Backbone.View.extend({
  tagName: 'form',
  template: _.template("<label for='title'>Title</label><br><input type='text' name='title' id='title' value='<%= post.escape('title') %>'><br><label for='body'>Body</label><br><textarea name='body' id='body'><%= post.escape('body') %></textarea><br><button>Submit</button><a href='#/'>Back</a>"),

  events: {
    'click button': 'submit'
  },

  render: function () {
    var renderedContent = this.template({
      line: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    function success () {
      Backbone.history.navigate("", { trigger: true });
    }

    this.model.set(attrs);
    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: success
      });
    } else {
      this.model.save({}, {
        success: success
      });
    }
  }
});