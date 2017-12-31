/*global google, $*/
(function(){
    'use strict';

    var search = $('#search'),
        location,
        map = new google.maps.Map(
            document.getElementById('map'),
            {
                zoom: 10,
                center: location,
                mapTypeId: google.maps.MapTypeId.hybrid
            });

    $('#button').click(function(){

        var searchValue = search.val();
        $('#list').empty();
         
         $.getJSON('http://api.geonames.org/wikipediaSearch?maxRows=10&username=bnussen&type=json&callback=?', {q:searchValue}, function(data) {   
               data.geonames.forEach(function(result) {
                  $('<li><img src="' + (result.thumbnailImg || 'default1.jpg') + '"/>' + result.title + '</li>')
                    .appendTo('#list')
                    .click(function(){
                        location = {lat: result.lat, lng: result.lng};
                        map.setCenter(location);

                        var marker = new google.maps.Marker({
                            position: location,
                            map: map
                        });
                        
                        var infoWindow = new google.maps.InfoWindow({
                            maxWidth: 175,
                            height: 150,
                            content: '<h1 id="title">' + result.title + '</h1></br>' +
                                    '<img id="infoWindowImage" src="' + (result.thumbnailImg || 'default1.jpg') + '"/></br>' + result.summary + 
                                    '</br><a target="_blank" href="https://' + result.wikipediaUrl + '">Wikipedia</a>'
                        });
                        
                        infoWindow.open(map, marker);
                        
                        marker.addListener('click', function () {
                            infoWindow.open(map, marker);
                        });
                });
            });
          });
    });
    
}());