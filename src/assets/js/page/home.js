import Swiper, { Navigation, Pagination } from 'swiper';
let isIE = false;
let winW = 0;
let winH = 0;
let scrollY = 0;
let $humberger = {};
let $mainHeader = {};
let $work = {};
let isWork = false;
let $html = {};
let workY = 0;
let targetScrollCalc = 0;
let animObjArray = [];
let $animTarget = {};
let isScroll = false;
let newsSlider = {};
let isSliderDisable = false;

export default class Home {
  constructor () {

    //IE対応のためhtmlにieクラスを付与
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1) {
      $('html').addClass('ie');
      isIE = true;
    }

    $html = $('html');
    $humberger = $('#js-hamburger');
    $mainHeader = $('.main-header');
    $work = $('.work-section');
    $animTarget = $('.js-anim');

    //画面サイズやスクロール位置
    winW = window.innerWidth;
    winH = window.innerHeight;
    scrollY = window.scrollY;

    /*-- initChangeBgの準備 --*/
    workY = $work.offset().top;
    //ウィンドウの高さがworkエリアの位置より低い場合は初期表示でworkエリアが表示されている
    //スクロール値が100以上になったら背景色を変更する
    if ((winH - 30) > workY) {
      targetScrollCalc = 100;
    //それ以外はworkエリアが画面に入った+スクロール量+100になったら背景色変更
    } else {
      targetScrollCalc = (workY - winH) + Math.floor(winH * 0.5);
    }

    /*-- js-animクラス用 --*/
    $animTarget.each(function (index, elem) {
      const obj = {
        'el': elem,
        isShow: false,
      }
      animObjArray.push(obj);
    });

    window.addEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("resize", this.onResize.bind(this));

    this.initMV();
    this.initNav();
    this.renderChangeBg();
    this.scrollAnim();
    this.initClientToggle();

    //swiperの初期化
    newsSlider = new Swiper(".js-news-slider", {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
    });
    this.initNewsSlider();

    if (winW > 1040) {
      newsSlider.disable();
      isSliderDisable = true;
    }
  }

  /*-------------------
  * initClientToggle
  * SP用開閉
  /*-------------------*/
  initClientToggle() {

    const $clients = $('.clients-section');
    const $block = $clients.find('.block');

    $('.js-client-ico').on('click', function (e) {
      e.preventDefault();
      $clients.toggleClass('active');
      $block.slideToggle();
    });
  }

  /*-------------------
  * initNewsSlider
  * swiperの設定。画面幅で機能を変更
  /*-------------------*/
  initNewsSlider() {
    if (winW > 1040) {
      newsSlider.disable();
      isSliderDisable = true;
    } else {
      if (isSliderDisable) {
        newsSlider.enable();
      }
    }

  }

  /*-------------------
  * scrollAnim
  * 要素が画面に入ったらクラスを付与して表示させる
  /*-------------------*/
  scrollAnim() {
    //要素がまだ表示されていなければクラスを付与して表示させる
    for (let key in animObjArray) {
      if (!animObjArray[key].isShow) {
        const y = Math.floor(animObjArray[key].el.getBoundingClientRect().top);
        if (y < (Math.floor(winH * 0.8))) {
          animObjArray[key].el.classList.add('visible');
          animObjArray[key].isShow = true;
        }
      }
    }
    isScroll = false;
  }

  /*-------------------
  * renderChangeBg
  * workエリアに来たら背景色を変更する
  /*-------------------*/
  renderChangeBg() {
    if (scrollY >= targetScrollCalc && !isWork) {
      $html.addClass('bg-black');
      isWork = true;
    } else if (scrollY < targetScrollCalc && isWork) {
      $html.removeClass('bg-black');
      isWork = false;
    }
  }

  /*-------------------
  * initMV
  * MV用モーション
  /*-------------------*/
  initMV() {
    const $mv = $('.mv-section');

    let lastLine = document.querySelectorAll('.js-line-last');
    if (winW > 750) {
      lastLine = lastLine[0];
    } else {
      lastLine = lastLine[1];
    }
    $mv.addClass('anim');
    lastLine.addEventListener('transitionend', function (e) {
      $mv.addClass('grad');
    });
  }

  /*-------------------
  * initNav
  * sp用Gnav
  /*-------------------*/
  initNav() {
    $humberger.on('click', function(e){
      e.preventDefault();
      $mainHeader.toggleClass('active');
      $('html').toggleClass('is-modal');
    })
  }

  /*-------------------
  * onScroll
  /*-------------------*/
  onScroll() {
    if (isScroll) return;
    isScroll = true;
    scrollY = window.scrollY;
    this.renderChangeBg();
    this.scrollAnim();
  }

  /*-------------------
  * onResize
  /*-------------------*/
  onResize() {
    setTimeout(() => {
      winW = window.innerWidth;
      winH = window.innerHeight;
      this.initNewsSlider();
    }, 60);
  }
}
