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

  $('body:not(.about) .col-right .content').jScrollPane({ verticalGutter: 20 })
  $('.about .scroll-all').jScrollPane({ verticalGutter: 80 })

  if (window.Galleria) {
    Galleria.loadTheme('/js/lib/galleria/themes/classic/galleria.classic.min.js')
    Galleria.run('.galleria')
  }
})
