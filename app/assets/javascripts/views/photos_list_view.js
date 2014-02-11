(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $("<div></div>");
    PT.Photo.on("add", this.render.bind(this));
    $(this.$el).on("click", "li",  function(event) {
      // console.log(event.currentTarget);
      event.preventDefault();
      var liEl = $(event.currentTarget)[0];
      var $li = $(liEl);
      var liID = $li.data("id");
      var currentPhoto = _.find(PT.Photo.all, function(el) { return el.get("id") == liID; });
      console.log(currentPhoto);
      PT.showPhotoDetail(currentPhoto);
      // var detailView = new PT.PhotoDetailView(currentPhoto);
      // detailView.render();
      // // instantiate new PhotoDetailView()
    });
  }

  _.extend(PhotosListView.prototype, {
    render: function () {
      this.$el.html("<ul></ul>");

      var that = this;
      _.each(PT.Photo.all, function(photo) {
        that.$el.find("ul").append("<li data-id='" + photo.get("id") + "'><a href='#/photos/" + photo.get("id") + "'>" + photo.get("title") + "</a></li>");
      });

      return this;
    }

  });
})(this);
