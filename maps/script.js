(function(window, $) {

  var $mapster = $('#map-canvas').mapster(Mapster.map_options);



    $mapster.mapster('addMarker', {
        location: 'Limhamnsvägen, Brygga 1, Malmo',
        event:{
          name: 'click',
          callback: function(){
            alert('Goal Position');
          }
        },
        icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bike_downhill_%E2%80%93_Sports_%E2%80%93_Dark.png'
});

  $mapster.mapster('addMarker', {
    location: 'Stortorget, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Start Position')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bike_rising_%E2%80%93_Sports_%E2%80%93_White.png'
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
