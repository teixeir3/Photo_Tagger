(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function(photo) {
    this.$el = $("<div></div>");
    this.photo = photo;
    // Photo.on("index", this.render.bind(this));
  }

  _.extend(PhotoDetailView.prototype, {
    render: function () {
      this.$el.html(JST["photo_detail"]({photo: this.photo}));
      return this;
    },

    submit: function(event) {
      // event.preventDefault();
//
//       var newPhoto = new PT.Photo($("#photo-form").serializeJSON()["photo"]);
//       newPhoto.save(function(){console.log("GREAT SUCCESS")});
//       console.log(newPhoto);
    }

  });
})(this);
