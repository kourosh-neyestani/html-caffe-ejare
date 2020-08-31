(function ($) {
    "use strict";

    var AFRA = {};

    /*====== Preloader ======*/
    var preloader = $(".preloader");
    $(window).on("load", function () {
        var preloaderFadeOutTime = 500;

        function hidePreloader() {
            preloader.fadeOut(preloaderFadeOutTime);
        }

        hidePreloader();
    });

    /*====== Accordion ======*/
    AFRA.Accordion = function () {
        var toggle = $(".el-accordion .el-accordion-head");
        toggle.click(function (e) {
            e.preventDefault();

            var $this = $(this);
            var arrow = $(this).children(".inner").children(".accordion-arrow");

            console.log(arrow);

            if ($this.next().hasClass("show")) {
                $this.next().removeClass("show");
                $this.next().slideUp(350);
                arrow.removeClass("active");
                $this.parent().removeClass("active");
            } else {
                $this.parent().parent().find("li .inner").removeClass("show");
                $this.parent().parent().find("li .inner").slideUp(350);
                $this.next().toggleClass("show");
                $this.next().slideToggle(350);
                arrow.addClass("active");
                $this.parent().addClass("active");
            }
        });
    };

    /*====== Sticky Navigation Menu ======*/
    AFRA.StickyHeader = function () {
        var header = $(".app-header");
        $(window).scroll(function () {
            if ($(this).scrollTop() > header.height()) {
                header.addClass("sticky");
            } else {
                header.removeClass("sticky");
            }
        });
    };

    /*====== Calendar Tabs ======*/
    AFRA.DefaultTabs = function () {
        var className = "active";
        var link = $(".el-tabs .el-tabs-links ul li");

        link.on("click", function (e) {
            e.preventDefault();

            var data = $(this).data("tab-link");
            var links = $(this).siblings("li");
            var item = $("[data-tab-content=" + data + "]");
            var items = $(this).parent().parent().siblings(".el-tabs-content").children("ul").children("li");

            links.removeClass(className);
            items.removeClass(className);
            item.addClass(className);
            $(this).addClass(className);
        });
    };

    /*====== Masonry Layout ======*/
    AFRA.Masonry = function () {
        $(function () {
            $(".masonry").masonry();
        });
    };

    /*====== Owl Carousel Setting ======*/
    AFRA.Carousel = function () {
        var owlEvent = function () {
            var i;
            var params = {
                items: 1,
                slideBy: 1,
                rtl: true,
                nav: false,
                loop: false,
                dots: false,
                center: false,
                autoplay: false,
                mouseDrag: true,
                margin: 0,
                dotsSpeed: 1500,
                smartSpeed: 1500,
                autoplayTimeout: 6000,
                autoplayHoverPause: true,
                stagePadding: 0,
                navText: ['<i class="fa fa-angle-right"></i>', '<i class="fa fa-angle-left"></i>'],
            };
            params.responsive = {
                0: { items: 1 },
            };
            if (typeof $(this).data("breakpoint") != "undefined") {
                var j;
                var breakpoint = $(this).data("breakpoint").split(",");
                for (j in breakpoint) {
                    var b = breakpoint[j].split(":");

                    if (b.length == 2) {
                        params.responsive[b[0]] = {
                            items: parseInt(b[1]),
                        };
                    }
                }
            } else {
                params.responsive[768] = {
                    items: params.items,
                };
            }
            for (i in params) {
                var dtlc = i.toLowerCase();
                var data = $(this).data(dtlc);

                if (typeof data != "undefined") {
                    params[i] = data;
                }
            }
            $(this).owlCarousel(params);
        };
        $(".owl-carousel").each(owlEvent);
    };

    $(window).on("load", function () {});

    $(document).ready(function () {
        AFRA.StickyHeader(), AFRA.Carousel(), AFRA.DefaultTabs(), AFRA.Accordion(), AFRA.Masonry();
    });
})($);
