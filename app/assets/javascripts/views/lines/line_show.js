QueueSkipper.Views.LineShow = Backbone.View.extend({
  template: JST['lines/show'],

  events: {
    'dblclick .editable': 'editField',
    'blur .edit-input': 'saveField',
  },

  editField: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var field = $currentTarget.data('field');
    var $input = $("<input class='edit-input'>");

    $input.data('field', field);
    $input.val(this.model.escape(field));
    $currentTarget.removeClass('editable');
    $currentTarget.html($input);
    $input.focus();
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  saveField: function (event) {
    event.preventDefault();
    var field = $(event.currentTarget).data('field');
    var newVal = $(event.currentTarget).val();

    this.model.set(field, newVal);
    this.model.save();
    this.render();
  },

  render: function () {
    var renderedContent = this.template({
      line: this.model
    });
    this.$el.html(renderedContent);

    return this;
  }
});