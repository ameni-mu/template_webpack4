let isIE = false;
let winW = 0;
let winH = 0;
let scrollY = 0;
let $html = {};
let $humberger = {};
let $mainHeader = {};

export default class Common {
  constructor () {

    //IE対応のためhtmlにieクラスを付与
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
      $('html').addClass('ie');
      isIE = true;
    }

    $html = $('html');
    $humberger = $('#js-hamburger');
    $mainHeader = $('.main-header');

    this.initNav();
  }

  /*-------------------
  * initNav
  * sp用Gnav
  /*-------------------*/
  initNav() {
    $humberger.on('click', function(e){
      e.preventDefault();
      $mainHeader.toggleClass('active');
      $html.toggleClass('is-modal');
    })
  }
}
