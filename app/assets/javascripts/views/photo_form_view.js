(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function() {
    this.$el = $("<div></div>");
    $(this.$el).on("submit", this.submit)
    // Photo.on("index", this.render.bind(this));
  }

  _.extend(PhotoFormView.prototype, {
    render: function () {
      this.$el.html(JST["photo_form"]);
      console.log(this.$el);
      return this;
    },

    submit: function(event) {
      event.preventDefault();

      var newPhoto = new PT.Photo($("#photo-form").serializeJSON()["photo"]);
      newPhoto.save(function(){console.log("GREAT SUCCESS")});
      console.log(newPhoto);
    }

  });
})(this);
