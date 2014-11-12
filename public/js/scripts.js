jQuery(document).ready(function ($) {
  $('.scrollDown').on('click', function (e) {
    e.preventDefault()

    var sidebar = $('ul.sidebar')
    var scrollTo = sidebar.scrollTop() + (0.9 * sidebar.height())
    
    sidebar.animate({scrollTop: scrollTo})
  })

  $('.scrollUp').on('click', function (e) {
    e.preventDefault()

    var sidebar = $('ul.sidebar')
    var scrollTo = sidebar.scrollTop() - (0.9 * sidebar.height())
    
    sidebar.animate({scrollTop: scrollTo})
  })

  var jscroll = null

  if (!detectMobile()) {
    var jscrollEl = $('body:not(.about, .project, .contact) .col-right .content, .about .scroll-all').jScrollPane({ verticalGutter: 20 })
    if (jscrollEl.size() > 0) jscroll = jscrollEl.data().jsp
  }

  $(window).resize(function () {
    if (!detectMobile()) {
      var jscrollEl = $('body:not(.about, .project, .contact) .col-right .content, .about .scroll-all').jScrollPane({ verticalGutter: 20 })
      if (jscrollEl.size() > 0) jscroll = jscrollEl.data().jsp
    } else {
      if (jscroll) {
        jscroll.destroy()
        jscroll = null
      }
    }
  })

  if ($('body').hasClass('project')) {
    Galleria.loadTheme('/js/lib/galleria/themes/classic/galleria.classic.min.js')
    Galleria.run('.galleria', { showCounter: false })
  }
  
  splashScreen()
})

/* 
  If #splash is present and the user hasn't seen it already this session, play it.
  If no splash is present, record that they've seen the splash already, so we don't show it half way through a session.
 */
function splashScreen () {
  var sessionStorage = window.sessionStorage || { getItem: function(){}, setItem: function () {}}
  
  var $splash = $('#splash')
  
  if ((sessionStorage && sessionStorage.getItem('splashed')) || detectMobile()) {
    $splash.hide();
    return
  }
  
  // Ok do a splash if you must...
  sessionStorage.setItem('splashed', true)

  if (!$splash.length) return // nothing to do
    
  Galleria.configure({
    imageCrop: true,
    transition: 'fade',
    thumbnails: false,
    autoplay: 100,
    transitionSpeed: 2500
  })
  
  Galleria.loadTheme('/js/lib/galleria/themes/classic/galleria.classic.min.js')
  
  Galleria.on('image', function (evt) {
    if ((evt.index + 1) !== this.getDataLength()) return

    // we're at the end
    this.pause()
    $splash.addClass('splash-end')
    setTimeout(function () {
      $splash.fadeOut(1000)
    }, 2500)
  })

  var galleryData = [
    { image: '/images/splash/lassco.jpg' },
    { image: '/images/splash/stairs.jpg' },
    { image: '/images/splash/fireplace.jpg' },
    { image: '/images/splash/team.jpg' }
  ]

  Galleria.run('.galleria', {
    showCounter: false,
    dataSource: galleryData,
    showImagenav: false,
    showInfo: false
  })
}

function detectMobile () {
  var mobileSniffer = jQuery('#mobile-sniffer')
  if (mobileSniffer.css('display') === 'block') return true
  return false
}
