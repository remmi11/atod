$(document).ready(function() {
    "use strict";
   
    function e() {
     $(".nav_button").click(function() {
      $("#burger").toggleClass("active-sandwich"), $("body").toggleClass("body-transform"), $(".navigation").toggleClass("navigation-active"), $(".menu-helper-close").toggleClass("menu-helper-toggle")
     }), $(".menu-helper-close").click(function() {
      $("body").toggleClass("body-transform"), $("#burger").toggleClass("active-sandwich"), $(".navigation").toggleClass("navigation-active"), $(this).toggleClass("menu-helper-toggle")
     })
    }
   
    // function o() {
    //  $(".back-to-top a").click(function(e) {
    //   e.preventDefault(), $("html,body").animate({
    //    scrollTop: 0
    //   }, 300)
    //  })
    //}
   });