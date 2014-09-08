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

  if (window.Galleria) {
    Galleria.loadTheme('/js/lib/galleria/themes/classic/galleria.classic.min.js')
    Galleria.run('.galleria')
  }

  if (!$('body').hasClass('gallery') && $(window).width() > 2000) {
    $('.col-left').width($('body').width() * 0.32)
  }

  if (!$('body').hasClass('gallery')) {
    if ($(window).width() > 768) {
      $('.col-left').width($('body').width() * 0.32)
    }

    $(window).resize(function () {
      if ($(window).width() < 768) {
        $('.col-left').attr('style', '')
        return
      }
      $('.col-left').width($('body').width() * 0.32)
    })
  }
})
