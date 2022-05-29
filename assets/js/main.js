(function ($) {
  "use strict";
/*
  01. On Load Function
  02. Preloader
  03. Mobile Menu Active
  04. Sticky fix
  05. Scroll To Top
  06. Set Background Image & Color
  07. Popup Sidemenu
  08. Search Box Popup
  09. Hero Slider Active
  10. Magnific Popup
  11. Date & Time Picker
  12. Filter
  13. Progress Bar
  14. Section Position
  00. Right Click Disable
  00. Inspect Element Disable
*/
/*=================================
    JS Index End
==================================*/
/*

  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    $('.preloader').fadeOut();
  });



  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    $('.preloaderCls').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.preloader').css('display', 'none');
      })
    });
  };



  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
      menuToggleBtn: '.vs-menu-toggle',
      bodyToggleClass: 'vs-body-visible',
      subMenuClass: 'vs-submenu',
      subMenuParent: 'vs-item-has-children',
      subMenuParentToggle: 'vs-active',
      meanExpandClass: 'vs-mean-expand',
      subMenuToggleClass: 'vs-open',
      toggleSpeed: 400,
    }, options);

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = '.' + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css('display', 'none')
            $(this).parent().removeClass(opt.subMenuParentToggle);
          };
        });
      };

      // Class Set Up for every submenu
      menu.find('li').each(function () {
        var submenu = $(this).find('ul');
        submenu.addClass(opt.subMenuClass);
        submenu.css('display', 'none');
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev('a').addClass(opt.meanExpandClass);
        submenu.next('a').addClass(opt.meanExpandClass);
      });

      // Toggle Submenu 
      function toggleDropDown($element) {
        if ($($element).next('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next('ul').slideToggle(opt.toggleSpeed);
          $($element).next('ul').toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev('ul').length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev('ul').slideToggle(opt.toggleSpeed);
          $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
        };
      };

      // Submenu toggle Button
      var expandToggler = '.' + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on('click', function (e) {
          e.preventDefault();
          toggleDropDown(this);
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on('click', function () {
          menuToggle();
        })
      })

      // Hide Menu On out side click
      menu.on('click', function (e) {
        e.stopPropagation();
        menuToggle()
      })

      // Stop Hide full menu on menu click
      menu.find('div').on('click', function (e) {
        e.stopPropagation();
      });

    });
  };

  $('.vs-menu-wrapper').vsmobilemenu();





  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop'

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css('height');
    $targetMenu.parent().css('min-height', height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.parent().css('min-height', '').removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-active'), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });



  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, lastScrollTop / 3);
      return false;
    });
  })




  /*---------- 06.Set Background Image & Color ----------*/
  if ($('[data-bg-src]').length > 0) {
    $('[data-bg-src]').each(function () {
      var src = $(this).attr('data-bg-src');
      $(this).css('background-image', 'url(' + src + ')');
    });
  };

  if ($('[data-bg-color]').length > 0) {
    $('[data-bg-color]').each(function () {
      var color = $(this).attr('data-bg-color');
      $(this).css('background-color', color);
    });
  };





  /*---------- 07. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on('click', function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls)
    });
    var sideMenuChild = $sideMenu + ' > div';
    $(sideMenuChild).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls)
    });
    $($sideMenuCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  };
  popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');





  /*---------- 08. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox).find('form').on('click', function (e) {
      e.stopPropagation();
      $($searchBox).addClass($toggleCls);
    });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  };
  popupSarchBox('.popup-search-box', '.searchBoxTggler', '.searchClose', 'show');





  /*----------- 09. Hero Slider Active ----------*/
  $('.vs-hero-carousel').each(function () {
    var vsHslide = $(this);

    // Get Data From Dom
    function d(data) {
      return vsHslide.data(data)
    }

    // Custom Style Set    
    vsHslide.on('sliderWillLoad', function (event, slider) {

      // Define Variable
      var respLayer = jQuery(this).find('.ls-responsive'),
        lsDesktop = 'ls-desktop',
        lsLaptop = 'ls-laptop',
        lsTablet = 'ls-tablet',
        lsMobile = 'ls-mobile',
        windowWid = jQuery(window).width(),
        lgDevice = 1025,
        mdDevice = 993,
        smDevice = 768;

      // Set Style on each Layer
      respLayer.each(function () {
        var layer = jQuery(this);

        function lsd(data) {
          return (layer.data(data) === '') ? layer.data(null) : layer.data(data);
        }
        // var respStyle = (windowWid < smDevice) ? ((lsd(lsMobile)) ? lsd(lsMobile) : lsd(lsTablet)) : ((windowWid < mdDevice) ? ((lsd(lsTablet)) ? lsd(lsTablet) : lsd(lsDesktop)) : lsd(lsDesktop)),
        var respStyle = (windowWid < smDevice) ? lsd(lsMobile) : ((windowWid < mdDevice ? lsd(lsTablet) : ((windowWid < lgDevice) ? lsd(lsLaptop) : lsd(lsDesktop)))),
        mainStyle = (layer.attr('style') !== undefined) ? layer.attr('style') : ' ';
        layer.attr('style', mainStyle + respStyle);
      });

    });

    // Custom Arrow 
    vsHslide.find('[data-ls-go]').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        var target = $(this).data('ls-go');
        vsHslide.layerSlider(target)
      });
    });

    vsHslide.layerSlider({
      allowRestartOnResize: true,
      maxRatio: (d('maxratio') ? d('maxratio') : 1),
      type: (d('slidertype') ? d('slidertype') : 'responsive'),
      pauseOnHover: (d('pauseonhover') ? true : false),
      navPrevNext: (d('navprevnext') ? true : false),
      hoverPrevNext: (d('hoverprevnext') ? true : false),
      hoverBottomNav: (d('hoverbottomnav') ? true : false),
      navStartStop: (d('navstartstop') ? true : false),
      navButtons: (d('navbuttons') ? true : false),
      loop: ((d('loop') === false) ? false : true),
      autostart: (d('autostart') ? true : false),
      height: (d('height') ? d('height') : 1080),
      responsiveUnder: (d('responsiveunder') ? d('responsiveunder') : 1220),
      layersContainer: (d('container') ? d('container') : 1220),
      showCircleTimer: (d('showcircletimer') ? true : false),
      skinsPath: 'layerslider/skins/',
      thumbnailNavigation: ((d('thumbnailnavigation') === false) ? false : true)
    });
  });




  /*----------- 10. Magnific Popup ----------*/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });



   /*---------- 11. Date & Time Picker ----------*/
   // Time And Date Picker
   $('.dateTime-pick').datetimepicker({
     timepicker: true,
     datepicker: true,
     format: 'y-m-d H:i',
     hours12: false,
     step: 30
   });

   // Only Date Picker
   $('.date-pick').datetimepicker({
     timepicker: false,
     datepicker: true,
     format: 'm-d-y',
     step: 10
   });

   // Only Time Picker
   $('.time-pick').datetimepicker({
     datepicker: false,
     timepicker: true,
     format: 'H:i',
     hours12: false,
     step: 10
   });


  /*----------- 12. Filter ----------*/
  $('.filter-active').imagesLoaded(function () {
    var $filter = '.filter-active',
      $filterItem = '.filter-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      });

      // filter items on button click
      $($filterMenu).on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });

      // Menu Active Class 
      $($filterMenu).on('click', 'button', function (event) {
        event.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.active').removeClass('active');
      });
    };
  });

  /*----------- 13. Progress Bar ----------*/
  if ($('.progress-bar').length) {
    $('.progress-bar').each(function(){
      var value = $(this).attr('aria-valuenow');
      $(this).css('width', value + '%')
    })
  }



  /*----------- 14. Section Position   ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10)
  }
  
  $.fn.sectionPosition = function (mainAttr, posAttr) {   
    $(this).each(function () {
      var section = $(this);
      
      function setPosition (){
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
        posData = section.attr(mainAttr), // where to position
        posFor  = section.attr(posAttr), // On Which section is for positioning  
        topMark = 'top-half', // Pos top
        bottomMark = 'bottom-half', // Pos Bottom
        parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
        parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

        if (posData === topMark) {
          $(posFor).css('padding-bottom', parentPB + sectionHeight + 'px');
          section.css('margin-top', "-" + sectionHeight + 'px');
        } else if (posData === bottomMark) {
          $(posFor).css('padding-top', parentPT + sectionHeight + 'px');
          section.css('margin-bottom', "-" + sectionHeight + 'px');
        }
      }
      setPosition(); // Set Padding On Load
    })
  }


  if ($('[data-sec-pos]').length) {
    $('[data-sec-pos]').sectionPosition('data-sec-pos', 'data-pos-for');
  }

  $('.classes').slick({
    dots: true,
    prevArrow: false,
    nextArrow: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  });

})(jQuery);

// lazy loads elements with default selector as '.lozad'
const observer = lozad(); 
observer.observe();
