// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory,
// lib/assets/javascripts, vendor/assets/javascripts, or
// vendor/assets/javascripts of plugins, if any, can be referenced
// here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll
// appear at the bottom of the the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE
// PROCESSED, ANY BLANK LINE SHOULD GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON
//= require underscore
//
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates
//
//= require_tree .

// var Photo = function(owner_id, url) {
//   this.owner_id = owner_id;
//   this.url = url;
// };

(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView;
  var PhotoFormView = PT.PhotoFormView;


  _.extend(PT, {
    initialize: function(id) {
      Photo.fetchByUserId(id, function(){
        var view = new PhotosListView;
        $("#content").html(view.render().$el);

        var newForm = new PhotoFormView;
        $("body").prepend(newForm.render().$el);


      });
    },
    showPhotoDetail: function(photo) {
      var detailView = new PT.PhotoDetailView(photo);
      $("#photo-detail").prepend(detailView.render().$el);
    }
  });

  var Photo = PT.Photo = function (POJO) {
    var attr = _.extend({}, POJO);
    this.attributes = attr;
  };

  _.extend(Photo, {
    fetchByUserId: function(userId, callback) {

      $.ajax({
        url: "/api/users/" + userId + "/photos",
        type: "GET",
        success: function(response) {
          var photoObjs = _.map(response, function(el) {
            return new Photo(el);
          })

          Photo.all = Photo.all.concat(photoObjs);
          callback();
          // return photoObjs;
        }
      });
    },
    all: [],
    _events: {add: []},
    on: function(eventName, callback) {
      this._events[eventName].push(callback);
    },
    trigger: function(eventName) {
      var eventCBs = this._events[eventName];

      _.each(eventCBs, function(cb) {
        cb();
      });
    }

  });

  _.extend(Photo.prototype, {
    get: function(attr_name) {
      return this.attributes[attr_name];
    },

    set: function(attr_name, value) {
      return this.attributes[attr_name] = value;
    },

    save: function(callback) {
      var id = this.get("id");
      (id) ? this.update(id, callback) : this.create(callback);

    },

    create: function(callback) {
      var that = this;
      $.ajax({
        url: "/api/photos",
        type: "POST",
        data: {photo: this.attributes},
        success: function(response){
          _.extend(that.attributes, response);

          //add to photo array.
          Photo.all.push(that);
          Photo.trigger("add");
          callback();
        }
      });
    },

    update: function(id, callback) {
      $.ajax({
        url: "/api/photos/" + id,
        type: "PUT",
        data: {photo: this.attributes},
        success: function(response){
          _.extend(that.attributes, response);
          callback();
        }
      });
    }
  });
})(this);