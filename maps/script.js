(function(window, $) {

  var $mapster = $('#map-canvas').mapster(Mapster.map_options);

//Bike pumps
    $mapster.mapster('addMarker', {
        location: 'Kaptensgatan 8, Malmo',
        event:{
          name: 'click',
          callback: function(){
            alert('Bike pump');
          }
        },
        icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Borehole_%E2%80%93_Nature_%E2%80%93_default.png'
});

  $mapster.mapster('addMarker', {
    location: 'Klerkgatan 4, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Bike pump')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Borehole_%E2%80%93_Nature_%E2%80%93_default.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Malmöhusvägen 1, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Bike pump')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Borehole_%E2%80%93_Nature_%E2%80%93_default.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Limhamnsvägen 27, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Bike pump')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Borehole_%E2%80%93_Nature_%E2%80%93_default.png'
  });

//Toilettes
  $mapster.mapster('addMarker', {
    location: 'Stortorget 29, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Kung Oscras väg 11, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });



  if(navigator.geolocation) {
  $mapster.mapster('getCurrentPosition', function(position){
    $mapster.mapster('addMarker', {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      event:{
        name: 'click',
        callback: function(){
          alert('Current location');
        }
      },
    });
  });
}




   //var matches = $mapster.mapster('findMarkers', function(markers){
    //return marker.id === 1;
   //});

   //$mapster.mapster('removeMarkers', function(markers){
    //return marker.id === 2;
   //});

   //console.log($mapster.mapster('markers'));


}(window, jQuery));
