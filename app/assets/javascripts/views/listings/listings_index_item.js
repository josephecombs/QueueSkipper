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

    $('.listings-index-item-modal').remove();
    $('.listings-index-item-modal-backdrop').remove();
    
    
    if (this.curModalView) {
      this.curModalView.remove();
    }
    
    this.modalView = this.modalView || 
      new QueueSkipper.Views.ListingsIndexItemModal({ model: this.model });
    $('body').prepend(this.modalView.render().$el);
    this.curModalView = this.modalView;
    
    //place the browser's focus on the modal after it is created so we can esc out of it quickly
    $('.listings-index-item-modal').focus();
    
    this.modalView.delegateEvents();
  }
});