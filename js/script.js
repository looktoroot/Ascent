$(document).ready( function(){

  $(".hamburger").click(function(){
    $(".page-header__nav-list").toggleClass("open");
   });

  var headerTop = $('.page-header__top').offset().top;
  var headerTextPadding = $('.page-header__text').css('padding-top');

  $(window).scroll(function(){
    if( $(window).scrollTop() > headerTop ) {
      $('.container-for-fixed').addClass('fixed');
      $('.page-header__text').css('padding-top', $('.page-header__top').innerHeight());
    }

    else {
      $('.container-for-fixed').removeClass('fixed');
      $('.page-header__text').css('padding-top', headerTextPadding);
    }
  });

 });
