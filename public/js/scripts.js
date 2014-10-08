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
    Galleria.run('.galleria')
  }
})

function detectMobile () {
  var mobileSniffer = jQuery('#mobile-sniffer')
  if (mobileSniffer.css('display') === 'block') return true
  return false
}
