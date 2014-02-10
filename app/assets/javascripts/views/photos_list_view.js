(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $("<div id='content'>");
  }

  _.extend(PhotosListView.prototype, {
    render: function () {
      var $el = this.$el;
      $el = $("<div id='content'>");
      $el.append("<ul>");

      _.each(PT.Photo.all, function(photo) {
        $el.find("ul").append("<li>");
        $el.find("ul").children().last().append(photo.get("title"));
      });

      return this;

    }

  });
})(this);
