QueueSkipper.Views.ListingsIndexItem = Backbone.View.extend({
  template: JST["listings/index_item"],
  
  initialize: function () {
    
  },
  
  events: {
    'click .booking-button': 'showModal'
  },
  
  render: function () {
    var lst = this.model;

    var renderedContent = this.template({
      listing: lst
    });

    this.$el.html(renderedContent);
    // this.$el.append(renderedContent);

    return this;
  },
  
  showModal: function () {
    //throw away existing modal if it exists
    debugger;
    if (this.modalView) {
      this.modalView.remove();
    }
    this.modalView = this.modalView || 
      new QueueSkipper.Views.ListingsIndexItemModal({ model: this.model });
    $('body').prepend(this.modalView.render().$el);
    this.modalView.delegateEvents();
  }
});