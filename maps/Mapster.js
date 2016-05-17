(function(window, google, List){

  var Mapster = (function(){
    function Mapster(element, opts){
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
    if(opts.geocoder){
      this.geocoder = new google.maps.Geocoder();
    }
    }
    Mapster.prototype= {
      zoom: function(level){
        if(level){
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },

      on: function(opts){
        var self= this;
        google.maps.event.addListener(opts.obj, opts.event, function(e){
        opts.callback.call(self, e, opts.obj);
        });
      },


      geocode: function(opts){
      this.geocoder.geocode({
      address: opts.address
      },
      function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          opts.success.call(this, results, status);

        } else {
          opts.error.call(this, status);
        }
      });
    },


    getCurrentPosition: function(callback){
      var self = this;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          callback.call(self, position);
        });
      }
    },


      setPano: function(element, opts){
        var panorama = new google.maps.StreetViewPanorama(element, opts);
        this.gMap.setStreetView(panorama);
      },


      addMarker: function(opts){
        var marker,
        self = this;
        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        }
        marker = self.createMarker(opts);
        if(self.markerClusterer){
        self.markerClusterer.addMarker(marker);
      }
        self._addMarker(marker);
        if(opts.events){
          self._attachEvents(marker, opts.events);
        }
        if(opts.event){
          self.on({
          obj: marker,
          event: opts.event.name,
          callback: opts.event.callback
          });
        }
        return marker;
      },


      _attachEvents: function(obj, events){
        var self = this;
        events.forEach(function(event){
          self.on({
            obj: obj,
            event: event.name,
            callback: event.callback
          });
          });
      },


      _addMarker: function(marker){
        this.markers.add(marker);
      },


      findBy: function(callback){
        return this.markers.find(callback);
      },




      removeBy: function(callback){
        var self = this;
        self.markers.find(callback, function(markers){
          markers.forEach(function(marker){

            if(self.markerClusterer){
              self.markerClusterer.removeMarker(marker);
            }
            else {
            marker.setMap(null);
          }
          });
        });
      },



      createMarker: function(opts){
          opts.map = this.gMap;
        return new google.maps.Marker(opts);
      }
    };
    return Mapster;
  }());

  Mapster.create = function(element, opts){
    return new Mapster(element, opts);
  };

  window.Mapster = Mapster;

}(window, google, List));
