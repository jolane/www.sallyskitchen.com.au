jQuery(document).ready(function($) {
    $('.menu__tab').click(function(event) {

        $(this).parent().find('.menu__tab').removeClass('is-active');

        $(this).addClass('is-active');
    });
});


var map;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -37.808973, lng: 144.968828},
        zoom: 16,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    });

    var icon = {
        url: "/icons/icon-map-marker.svg",
        anchor: new google.maps.Point(26,69),
        scaledSize: new google.maps.Size(52,69)
    }

    var marker = new google.maps.Marker({
        position: {lat: -37.808973, lng: 144.968828},
        map: map,
        draggable: false,
        icon: icon,
        zIndex : -20
    });

    // add map styles
    var styles = [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}]
    map.setOptions({styles: styles});
}
