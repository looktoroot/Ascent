$(document).ready( function(){

  //открытые меню по клику на гамбургер
  $(".hamburger").click(function(){
    $(".page-header__nav-list").toggleClass("open");
   });

  var headerTop = $('.page-header__top').offset().top;
  var headerTextPadding = $('.page-header__text').css('padding-top');

  //фиксация меню
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


  //плавный переход на пункт меню
  $(".page-header__nav-list").on("click","a", function (event) {
    $(".page-header__nav-list").removeClass("open");
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -100 + "px"},
      {
        duration: 1000,
        easing: "swing"
      });
      return false;
  });

 });
