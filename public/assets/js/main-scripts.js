(function ($) {
    "use strict";

    /*====== Owl Carousel Setting ======*/
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
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
        };
        params.responsive = {
            0: {items: 1}
        };
        if (typeof $(this).data("breakpoint") != "undefined") {
            var j;
            var breakpoint = $(this).data("breakpoint").split(",");
            for (j in breakpoint) {
                var b = breakpoint[j].split(":");

                if (b.length == 2) {
                    params.responsive[b[0]] = {
                        items: parseInt(b[1])
                    };
                }
            }
        } else {
            params.responsive[768] = {
                items: params.items
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

})($);
