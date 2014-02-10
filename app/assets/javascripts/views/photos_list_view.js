(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $("<div></div>");
    PT.Photo.on("add", this.render.bind(this));

    // this.$el.on("add", function() {
//       this.render();
//     })
  }

  _.extend(PhotosListView.prototype, {
    render: function () {
      this.$el.html("<ul></ul>");

      var that = this;
      _.each(PT.Photo.all, function(photo) {
        that.$el.find("ul").append("<li>" + photo.get("title") + "</li>");
      });

      return this;
    }

  });
})(this);
