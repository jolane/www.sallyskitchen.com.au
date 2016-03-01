jQuery(document).ready(function($) {
    $('.menu__tab').click(function(event) {

        $(this).parent().find('.menu__tab').removeClass('is-active');

        $(this).addClass('is-active');
    });
});
