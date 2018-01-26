//script snippet for menu toggle
$(".menu-toggle").click(function(e){
		e.preventDefault();
		var catMenu = $(".cat-menu");
		
		if(!catMenu.hasClass("open")){
			catMenu.css({
				height: $(".cat-menu > .container .menu-content").outerHeight() + "px"
			});
			catMenu.addClass("open");
		}else{
			catMenu.css({
				height: 0 + "px"
			});
			catMenu.removeClass("open");
		}
		
});

//script snippet for scroll top button @ footer
(function(e){
  $(e).click(function(){
       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        $('html,body').animate({
            scrollTop: $(target).offset().top - 92
        }, {duration:1000});

      return false;
    }
  });
})('.scrollTo');

//script to show up go to top button @ footer
(function(){
	 $(window).on("scroll",  function(){
		 if($(window).scrollTop() > 500){
			 $(".topBtn a").css({
				 opacity: 1
			 });
		 }else{
			$(".topBtn a").css({
				opacity: 0
			});
		 }
	 });
})();

(function(){
	//script for background-parallax @ blog detail
	$(window).on("scroll",  function(){
		var x = $(window).scrollTop();
		$(".article-background").css('background-position-y', parseInt(-x / 5) + 'px');
	});

	//script for accordion
	$('.cat-filter .initer').accordion({
		transitionSpeed: 300,
		transitionEasing: 'ease',
		controlElement: '.control',
		contentElement: '.content',
		groupElement: '.cat-filter',
		singleOpen: true
	});

	$('.product-accordion-specfica .accordion-st').accordion({
		transitionSpeed: 300,
		transitionEasing: 'ease',
		controlElement: '.accordion-tr',
		contentElement: '.content',
		groupElement: '.product-accordion-specfica',
		singleOpen: true
	});

	//hack to keep open some categories
	if($(window).outerWidth() > 990){
		if($(".initer").hasClass("open")){
			var initerContentChilds = $(".initer.open > .content").children();
			var heights = 0;
			initerContentChilds.each(function(i,e){
					heights = heights + $(e).outerHeight();
			});
			$('.cat-first').each(function(i,e){
					if($(e).hasClass("open")){
						$(e).find(".first-content").css({
							maxHeight : heights
						});
					}
			});
		}
	}else{
		$('.cat-first').find(".content").css({
			maxHeight: 0 + "px"
		});
		$(".initer").removeClass("open");
	}

	//slider initializer
	$('.feature-slider').slick({
		dots: true,
		adaptiveHeight: true,
		autoplay: true,
		prevArrow: "<i class='slick-arrow slick-prev fa fa-angle-left'></i>",
		nextArrow: "<i class='slick-arrow slick-next fa fa-angle-right'></i>",
	});

	//detail image initializer
	$('#main_show').slick({
		arrows: false,
		asNavFor: '#nav_show',
		fade: true,
	});

	//script to init zoom effect
	$('#main_show').on('afterChange', function(event, slick, currentSlide, nextSlide){
		$("#main_show .slick-current img").elevateZoom({
			zoomType: "inner",
			cursor: "crosshair",
			responsive: true
		});
		if($("#main_show .slick-current").hasClass("video")){
			$(".zoomContainer").detach();
		}	
	});

	//script to hackand optimize init zoom effect
	$(window).on("resize", function(){
		$(".zoomContainer").detach();
		$("#main_show .slick-current img").elevateZoom({
			zoomType: "inner",
			cursor: "crosshair",
			responsive: true
		});
	});

	//detail page image nav
	$('#nav_show').slick({
		prevArrow: "<i class='slick-arrow slick-prev fa fa-angle-left'></i>",
		nextArrow: "<i class='slick-arrow slick-next fa fa-angle-right'></i>",
		asNavFor: "#main_show",
		slidesToShow: 8,
		slidesToScroll: 1,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
				  slidesToShow: 6,
				  slidesToScroll: 1,				
				}
			},
			{
				breakpoint: 990,
				settings: {
				  slidesToShow: 5,
				  slidesToScroll: 1,				
				}
			},
			{
				breakpoint: 550,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 1,				
				}
			},
		]
	});

	//script to toggle search option in smaller screen
	$(".toggle_search").click(function(e){
		e.preventDefault();
		$(".search-option").toggleClass("showSearch");
	});

	//script for hamburger menu
	$(".tcon").click(function(){
		$(this).toggleClass("tcon-transform");
		$(".middle-header").slideToggle(100);
	});

	//trigger cart open / close
	$(".cart-trigger, .close-cart").click(function(e){
		e.preventDefault();
		$(".cart-block").toggleClass("open");
	});

	//to activate search suggestion
	$('.search-option input').on("focus", function(){
		$(".suggestion").addClass("active");
	});
	$('.search-option input').on("focusout", function(){
		$(".suggestion").removeClass("active");
	});
})();
