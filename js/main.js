jQuery(document).ready(function($) {
	// switch terms
	var intervalID = window.setInterval(myCallback, 6000);


	var words = ['cooking', 'laughing'];
	var current = 0;
	function myCallback() {
		current++;
		var index = current%words.length;
		if($('.intro__is-text').hasClass('flip')) {
			$('.intro__is-front').html(words[index]);
		} else {
			$('.intro__is-back').html(words[index]);
		}
		$('.intro__is-text').toggleClass('flip');
	}





	$('.menu__tab').click(function(event) {

		$(this).parent().find('.menu__tab').removeClass('is-active');
		$(this).addClass('is-active');

		var thisIndex = $(this).index();

		$('.menu__sections').removeClass('slide-0');
		$('.menu__sections').removeClass('slide-1');
		$('.menu__sections').removeClass('slide-2');

		$('.menu__sections').addClass('slide-' + thisIndex);

	});


	setTimeout(function() {
		$('.header__zooing-image').addClass('is-zooming');
	}, 1000);


	// $.post('/instagram.php', {}, function(data, textStatus, xhr) {

	// 	// populate first instagram item
	// 	$('#instagram-image').css({
	// 		'background-image': 'url(' + data[0].images.standard_resolution.url + ')'
	// 	});
	// 	$('#instagram-caption').html(data[0].caption.text);

	// 	// populate other
	// 	$('.instagram__item').each(function(index, el) {
	// 		$(this).css('background-image', 'url(' + data[index].images.standard_resolution.url + ')');
	// 		$(this).children('.instagram__item-copy').html(data[index].caption.text);
	// 	});

	// }, 'JSON');


	// fade in block
	if(!$('html').hasClass('touch')) {
		fadeInBlocks();
		$(window).scroll(function(event) {
			fadeInBlocks();
		});
	} else {
		$('.is-faded').each(function(index, el) {
			showImage($(this));
		});
	}
	function fadeInBlocks() {
		var winH = $(window).height();
		var top = $(window).scrollTop();

		var fadePoint = winH + top;

		$('.is-faded').each(function(index, el) {
			var itemPoint = $(this).offset().top + ($(this).height() / 4);
			if(itemPoint <= fadePoint) {
				$(this).addClass('is-faded-in');
			}
		});
	}

	function fadeInBlocks() {
		$('.is-faded').each(function(index, el) {
			if(imageInView($(this))) {
				showImage($(this));
			}
		});
	}

	function imageInView(el) {
		var winH = $(window).height();
		var top = $(window).scrollTop();
		var fadePoint = winH + top;

		var itemPoint = $(el).offset().top + ($(el).height() / 4);
		if(itemPoint <= fadePoint) {
			return true;
		} else {
			return false;
		}
	}

	function showImage(el) {
		var $box = $(el);

		$(el).waitForImages(function() {
			$(this).addClass('is-faded-in');
		});
	}



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
	var styles = [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
	map.setOptions({styles: styles});
}

