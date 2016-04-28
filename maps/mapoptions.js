(function(window, google, mapster) {

    mapster.map_options= {
    center: {
      lat: 55.606641,
      lng: 13.000076,

    },
    zoom: 13,
    disableDefaultUI: false,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

    cluster: true,
    geocoder: true
    };
}(window, google, window.Mapster || (window.Mapster={})))
