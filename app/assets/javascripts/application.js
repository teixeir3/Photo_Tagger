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
//= require_tree ../templates
//
//= require_tree .

// var Photo = function(owner_id, url) {
//   this.owner_id = owner_id;
//   this.url = url;
// };

var Photo = function (POJO) {
  var attr = _.extend({}, POJO);
  this.attributes = attr;
};

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
    $.ajax({
      url: "/api/photos",
      type: "POST",
      data: {photo: this.attributes},
      success: callback
    });
  },

  update: function(id, callback) {
    $.ajax({
      url: "/api/photos/" + id,
      type: "PUT",
      data: {photo: this.attributes},
      success: callback
    });
  }



});


// var photoDetails = {owner_id: 1, url: 'www.google.com'};
//
// Photo.prototype.get = function(attr_name) {
//   return this[attr_name];
// }
//
// var photo = new Photo(photoDetails);
// photo.create();
// photo.save();