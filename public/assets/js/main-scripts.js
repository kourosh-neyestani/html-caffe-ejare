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
        $(".masonry").masonry();
    };

    /*====== Toggle Number ======*/
    AFRA.ButtonToggleValue = function () {
        var btn = $(".button-toggle-value");

        btn.on("click", function(e) {
            e.preventDefault();

            $(this).children(".text").hide();
            $(this).children(".show-me").show();
        })
    };

    /*====== Modal ======*/
    AFRA.Modal = function () {
        var body = $("body");
        var btnModal = $("button[data-modal-id], a[data-modal-id]");
        var btnClose = $(".el-modal-overlay .modal-close");

        btnModal.on("click", function (e) {
            e.preventDefault();
            var data = $(this).data("modal-id");
            var overlay = $(".el-modal-overlay[data-modal-id=" + data + "]");
            var modal = overlay.find(".el-modal");
            body.addClass("state-menu");
            modal.addClass("active");
            overlay.show();
            overlay.addClass("active");
        });

        btnClose.on("click", function () {
            var modal = $(".el-modal");
            var overlay = $(".el-modal-overlay");
            body.removeClass("state-menu");
            modal.removeClass("active");
            overlay.hide();
            overlay.removeClass("active");
            modal.addClass("ass")
        });
    };

    /*====== Modal Tabs ======*/
    AFRA.ModalTabs = function () {
        var link = $("[data-modal-tab-link]");

        link.on("click", function () {
            var data = $(this).data("modal-tab-link");
            var content = $("[data-modal-tab-content='" + data + "']");
            if (!$(this).hasClass("active")) {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                content.siblings().removeClass("active");
                content.addClass("active");
            }
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
                mouseDrag: false,
                touchDrag: true,
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

    /*====== Avatar ======*/
    AFRA.UploadAvatar = function () {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#imagePreview").css("background-image", "url(" + e.target.result + ")");
                    $("#imagePreview").hide();
                    $("#imagePreview").fadeIn(650);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#imageUpload").change(function () {
            readURL(this);
        });
    };

    /*====== Multistep select ======*/
    AFRA.MultistepSelect = function () {
        var div = $(".form-item-select-multistep2");
        var input = div.find("input");
        var dropdown = div.find(".dropdown");

        div.on("click", function () {
            // Dropdown
            dropdown.addClass("active");
        });

        div.find(".menu_0")
            .closest("li")
            .on("click", function () {
                $(this).addClass("bg-primary");
                $(this).hide();
            });

        div.find("li").on("click", function (e) {
            e.stopPropagation();

            // Set data
            var value = $(this).attr("data-multistep-select-value");
            input.val(value);
        });

        // HTML output

        // <div class="form-item form-item-select-multistep2">
        //     <label class="form-label"><span>دنبال چی می گردی؟</span></label>
        //     <input type="text" name="text" placeholder="جستجو بر اساس نام کالا">
        //     <div class="dropdown">
        //         <ul class="menu_0">
        //             <li data-multistep-select-value="1">
        //                 <span>کتگوری اصلی ۱</span>
        //             </li>
        //             <li class="has-child" data-multistep-select-value="2">
        //                 <span>کتگوری اصلی 2</span>
        //                 <ul class="menu_1">
        //                     <li data-multistep-select-value="21">
        //                         <span>کتگوری پدر ۱</span>
        //                     </li>
        //                     <li data-multistep-select-value="22">
        //                         <span>کتگوری پدر ۲</span>
        //                         <ul class="menu_2">
        //                             <li data-multistep-select-value="221">
        //                                 <span>کتگوری فرزند ۱</span>
        //                             </li>
        //                             <li data-multistep-select-value="222">
        //                                 <span>کتگوری فرزند ۲</span>
        //                             </li>
        //                             <li data-multistep-select-value="223">
        //                                 <span>کتگوری فرزند ۳</span>
        //                             </li>
        //                         </ul>
        //                     </li>
        //                     <li data-multistep-select-value="23">
        //                         <span>کتگوری پدر ۳</span>
        //                     </li>
        //                 </ul>
        //             </li>
        //             <li data-multistep-select-value="2">
        //                 <span>کتگوری اصلی 3</span>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    };

    /*====== Select2 ======*/
    AFRA.Select2 = function () {
        function formatDefault(state) {
            if (!state.id) {
                return state.text;
            }
            var $state = $('<span class="text">' + state.text + "</span>");
            return $state;
        }

        $(".el-select2-category").select2({
            dir: "rtl",
            placeholder: "جستجو در همه گروه ها",
            templateResult: formatDefault,
        });

        $(".el-select2-set-category").select2({
            dir: "rtl",
            placeholder: "",
            templateResult: formatDefault,
        });

        $(".el-select2-city").select2({
            dir: "rtl",
            placeholder: "جستجو در همه شهر ها",
            templateResult: formatDefault,
        });

        $(".el-select2-date").select2({
            dir: "rtl",
            placeholder: "جستجو بر اساس تاریخ آگهی",
            templateResult: formatDefault,
        });

        $(".el-select2-set-date").select2({
            dir: "rtl",
            placeholder: "",
            templateResult: formatDefault,
        });

        $(".el-select2-set-gender").select2({
            dir: "rtl",
            placeholder: "",
            templateResult: formatDefault,
        });
    };

    /*====== Sidenav - Side Navigation Menu ======*/
    AFRA.Sidenav = function () {
        var header = $(".app-header");
        var sidenav = $(".app-sidenav");
        header.on("click", ".button-open-sidenav", function () {
            sidenav.addClass("active");
        });
        sidenav.on("click", ".button-close-sidenav, .sidenav-close, .sidenav-menu a", function () {
            sidenav.removeClass("active");
        });
    };

    $(window).on("load", function () {});

    $(document).ready(function () {
        AFRA.StickyHeader(), AFRA.Carousel(), AFRA.DefaultTabs(), AFRA.Accordion(), AFRA.Masonry(), AFRA.Modal(), AFRA.ModalTabs(), AFRA.Select2(), AFRA.MultistepSelect(), AFRA.Sidenav(), AFRA.ButtonToggleValue();
        AFRA.UploadAvatar();
    });
})($);
