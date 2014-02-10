(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function() {
    this.$el = $("<div></div>");
  }

  _.extend(PhotoFormView.prototype, {
    render: function () {
      this.$el.html(JST["photo_form"]);
      console.log(this.$el);
      return this;
    }

  });
})(this);
