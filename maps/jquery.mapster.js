(function(window, Mapster){


$.widget( "mapster.mapster", {
      // default options
      options: {

      },

      // the constructor
      _create: function() {

      	var element = this.element[0],
      	options = this.options;
      	this.map = Mapster.create(element, options);

      },

      // called when created, and later when changing options
      _refresh: function() {

      },


      getCurrentPosition: function(callback){
      	var self = this;
      	self.map.getCurrentPosition(callback);
      },

      // a public method to change the color to a random value
      // can be called directly via .colorize( "random" )
      addMarker: function( opts ) {
      	var self = this;
      	if(opts.location){
      		self.map.geocode({
      		address: opts.location,
      		success: function(results){
      			results.forEach(function(result){
      				opts.lat = result.geometry.location.lat();
      				opts.lng = result.geometry.location.lng();
      				self.map.addMarker(opts);
      			});
      	},
      	error: function(status){
      		console.error(status);
      	}

      });

      	} else {
        this.map.addMarker(opts);
    	}
    },

        findMarkers: function(callback){
        	return this.map.findBy(callback);
        },

        removeMarkers: function(callback){
        	this.map.removeBy(callback);
        },

        markers: function(){
        	return this.map.markers.items;
        },

        setPano: function(selector, opts){
        	var elements = $(selector);
        	var self = this;
        	$.each(elements, function(key, element){
        		self.map.setPano(element, opts);
        	});

        },


        // trigger an event, check if it's canceled


      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {

      },

      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },

      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        this._super( key, value );
      }
    });


}(window, Mapster))
