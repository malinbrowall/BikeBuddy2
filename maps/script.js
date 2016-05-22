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


  $mapster.mapster('addMarker', {
    location: 'Lönngatan 62, 214 49 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Bike pump - Lönngatan 62, 214 49 Malmö, Sverige')
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
        alert('Toilette - Stortorget 29, Malmo')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Kung Oscras väg 11, Malmo',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Kung Oscras väg 11, Malmo')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Baltiska vägen, 211 46 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Baltiska vägen, 211 46 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Malmö centralstation, 211 20 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Malmö centralstation, 211 20 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Einar Hansens Esplanad 49, 211 13 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Einar Hansens Esplanad 49, 211 13 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Ribersborgsstigen 6, 216 13 Limhamn, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Ribersborgsstigen 6, 216 13 Limhamn, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Amiralsgatan 35, 211 55 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Amiralsgatan 35, 211 55 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  $mapster.mapster('addMarker', {
    location: 'Dalaplan 4, 214 28 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Toilette - Dalaplan 4, 214 28 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Female_%E2%80%93_People_%E2%80%93_iOS.png'
  });

  //Rent a Bike
  $mapster.mapster('addMarker', {
    location: 'Malmö centralstation, 211 20 Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Malmobybike - Malmö centralstation, 211 20 Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bicycle_Shop_%E2%80%93_Stores_%E2%80%93_classic.png?uselang=sv'
  });

  $mapster.mapster('addMarker', {
    location: 'Stortorget, Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Malmobybike - Stortorget, Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bicycle_Shop_%E2%80%93_Stores_%E2%80%93_classic.png?uselang=sv'
  });

  $mapster.mapster('addMarker', {
    location: 'Ribersborgs Kallbadhus, Malmö, Sverige',
    event:{
      name:'click',
      callback: function(){
        alert('Malmobybike - Ribersborgs Kallbadhus, Malmö, Sverige')
      }
    },
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bicycle_Shop_%E2%80%93_Stores_%E2%80%93_classic.png?uselang=sv'
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
