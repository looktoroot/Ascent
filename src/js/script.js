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

   //SMOOTH SCROLLING
   // $(function() {
   //   $('a[href*=#]:not([href=#])').click(function() {
   //     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
   //       var target = $(this.hash);
   //       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
   //       if (target.length) {
   //         $('html,body').animate({
   //           scrollTop: target.offset().top -50
   //         }, 1000);
   //         return false;
   //       }
   //     }
   //   });
 });
