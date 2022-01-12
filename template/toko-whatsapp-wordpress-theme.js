(function($) {
    
    $('.titleCase').each(function() {
       $(this).addClass('title_case');
       $(this).removeClass('titleCase'); 
    });
    $(document).on('input','.title_case', function(e) {
        e.stopPropagation();
        var str = $(this).val();
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        str = str.join(' ');
        $(this).val(str);
    });
    
    if (tw_config.fbPixel_ID !== '') {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tw_config.fbPixel_ID);
        fbq('track', 'PageView');
        $('<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='+tw_config.fbPixel_ID+'&amp;ev=PageView&amp;noscript=1"/></noscript>').appendTo('body');
        $(window).bind('load',function(){
            if($('#product').html() != undefined) {
                var harga = $('#product').find('.item_product').find('.price').attr('data-price');
                fbq('track', 'ViewContent', {
                    value: harga,
                    currency: "IDR"
                });
            }
        });
        $(document).on('click', '.item_product .orderBtn a', function() {
            var harga = $(this).parents('.item_product').find('.price').attr('data-price');
            var qty = $(this).parents('.item_product').find('.productQty input').val();
            fbq('track', 'AddToCart', {
                value: harga,
                quantity : qty,
                currency: "IDR"
            });
        });
        $(document).one('click', '.cartCheckout a.btnCheckout', function() {
            fbq('track', 'InitiateCheckout');
        });
        function fbqPurchase(subtotal){
            fbq('track', 'Purchase', {
                value: subtotal,
                currency: 'IDR'
            });
        }
    }
    $(window).bind('load',function(){
        // $(".notifComRat_item").sort(function(a,b){
        // return new Date($(a).attr("data-time")) < new Date($(b).attr("data-time"));
        // }).each(function(){
        //     $(".notifComRat").prepend(this);
        // });

        $(function() {
          $(".notifComRat li").sort(sort_li).prependTo('.notifComRat');
          function sort_li(a, b) {
            return ($(b).data('time')) > ($(a).data('time')) ? 1 : -1;
          }
        });
    });
    $(document).ready(function(){
      var loadMore_count = 6;
      $(".notifComRat li").slice(0,loadMore_count).show();
      $(".notifComRat .more").click(function(e){
        e.preventDefault();
        $(".notifComRat li:hidden").slice(0,loadMore_count).fadeIn("slow");
        if($(".notifComRat li:hidden").length == 0){
           $(".notifComRat .more").fadeOut("slow");
          }
      });
    });
    $("li.cat-item").each(function() {
        var html = $(this).html();
        html = html.replace("(", "<small>");
        html = html.replace(")", "</small>");
        $(this).html(html);
        $('small', this).prependTo($(this));
    });
    $("ul.children li").each(function() {
        var html = $(this).html();
        html = html.replace("(", "<small>");
        html = html.replace(")", "</small>");
        $(this).html(html);
        $('small', this).prependTo($(this));
    });
    // Sticky Sidebar
    var mql = window.matchMedia('screen and (min-width: 769px)');
    if (mql.matches) {
        ! function(i) {
            i.fn.theiaStickySidebar = function(t) {
                function o(t, o) {
                    var a = e(t, o);
                    a || (console.log("TST: Body width smaller than options.minWidth. Init is delayed."), i(document).scroll(function(t, o) {
                        return function(a) {
                            var n = e(t, o);
                            n && i(this).unbind(a)
                        }
                    }(t, o)), i(window).resize(function(t, o) {
                        return function(a) {
                            var n = e(t, o);
                            n && i(this).unbind(a)
                        }
                    }(t, o)))
                }

                function e(t, o) { return t.initialized === !0 ? !0 : i("body").width() < t.minWidth ? !1 : (a(t, o), !0) }

                function a(t, o) {
                    t.initialized = !0, i("head").append(i('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), o.each(function() {
                        function o() { a.fixedScrollTop = 0, a.sidebar.css({ "min-height": "1px" }), a.stickySidebar.css({ position: "static", width: "" }) }

                        function e(t) { var o = t.height(); return t.children().each(function() { o = Math.max(o, i(this).height()) }), o }
                        var a = {};
                        a.sidebar = i(this), a.options = t || {}, a.container = i(a.options.containerSelector), 0 == a.container.size() && (a.container = a.sidebar.parent()), a.sidebar.css({ position: "relative", overflow: "visible", "-webkit-box-sizing": "border-box", "-moz-box-sizing": "border-box", "box-sizing": "border-box" }), a.stickySidebar = a.sidebar.find(".theiaStickySidebar"), 0 == a.stickySidebar.length && (a.sidebar.find("script").remove(), a.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()), a.sidebar.append(a.stickySidebar)), a.marginTop = parseInt(a.sidebar.css("margin-top")), a.marginBottom = parseInt(a.sidebar.css("margin-bottom")), a.paddingTop = parseInt(a.sidebar.css("padding-top")), a.paddingBottom = parseInt(a.sidebar.css("padding-bottom"));
                        var n = a.stickySidebar.offset().top,
                            d = a.stickySidebar.outerHeight();
                        a.stickySidebar.css("padding-top", 1), a.stickySidebar.css("padding-bottom", 1), n -= a.stickySidebar.offset().top, d = a.stickySidebar.outerHeight() - d - n, 0 == n ? (a.stickySidebar.css("padding-top", 0), a.stickySidebarPaddingTop = 0) : a.stickySidebarPaddingTop = 1, 0 == d ? (a.stickySidebar.css("padding-bottom", 0), a.stickySidebarPaddingBottom = 0) : a.stickySidebarPaddingBottom = 1, a.previousScrollTop = null, a.fixedScrollTop = 0, o(), a.onScroll = function(a) {
                            if (a.stickySidebar.is(":visible")) {
                                if (i("body").width() < a.options.minWidth) return void o();
                                if (a.sidebar.outerWidth(!0) + 50 > a.container.width()) return void o();
                                var n = i(document).scrollTop(),
                                    d = "static";
                                if (n >= a.container.offset().top + (a.paddingTop + a.marginTop - a.options.additionalMarginTop)) {
                                    var r, s = a.paddingTop + a.marginTop + t.additionalMarginTop,
                                        c = a.paddingBottom + a.marginBottom + t.additionalMarginBottom,
                                        p = a.container.offset().top,
                                        b = a.container.offset().top + e(a.container),
                                        g = 0 + t.additionalMarginTop,
                                        l = a.stickySidebar.outerHeight() + s + c < i(window).height();
                                    r = l ? g + a.stickySidebar.outerHeight() : i(window).height() - a.marginBottom - a.paddingBottom - t.additionalMarginBottom;
                                    var h = p - n + a.paddingTop + a.marginTop,
                                        f = b - n - a.paddingBottom - a.marginBottom,
                                        S = a.stickySidebar.offset().top - n,
                                        u = a.previousScrollTop - n;
                                    "fixed" == a.stickySidebar.css("position") && "modern" == a.options.sidebarBehavior && (S += u), "legacy" == a.options.sidebarBehavior && (S = r - a.stickySidebar.outerHeight(), S = Math.max(S, r - a.stickySidebar.outerHeight())), S = u > 0 ? Math.min(S, g) : Math.max(S, r - a.stickySidebar.outerHeight()), S = Math.max(S, h), S = Math.min(S, f - a.stickySidebar.outerHeight());
                                    var m = a.container.height() == a.stickySidebar.outerHeight();
                                    d = (m || S != g) && (m || S != r - a.stickySidebar.outerHeight()) ? n + S - a.sidebar.offset().top - a.paddingTop <= t.additionalMarginTop ? "static" : "absolute" : "fixed"
                                }
                                if ("fixed" == d) a.stickySidebar.css({ position: "fixed", width: a.sidebar.width(), top: S, left: a.sidebar.offset().left + parseInt(a.sidebar.css("padding-left")) });
                                else if ("absolute" == d) { var y = {}; "absolute" != a.stickySidebar.css("position") && (y.position = "absolute", y.top = n + S - a.sidebar.offset().top - a.stickySidebarPaddingTop - a.stickySidebarPaddingBottom), y.width = a.sidebar.width(), y.left = "", a.stickySidebar.css(y) } else "static" == d && o();
                                "static" != d && 1 == a.options.updateSidebarHeight && a.sidebar.css({ "min-height": a.stickySidebar.outerHeight() + a.stickySidebar.offset().top - a.sidebar.offset().top + a.paddingBottom }), a.previousScrollTop = n
                            }
                        }, a.onScroll(a), i(document).scroll(function(i) { return function() { i.onScroll(i) } }(a)), i(window).resize(function(i) { return function() { i.stickySidebar.css({ position: "static" }), i.onScroll(i) } }(a))
                    })
                }
                var n = { containerSelector: "", additionalMarginTop: 0, additionalMarginBottom: 0, updateSidebarHeight: !0, minWidth: 0, sidebarBehavior: "modern" };
                t = i.extend(n, t), t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0, o(t, this)
            }
        }(jQuery);
        $(document).ready(function() {
            var tss = $('#sidebar');
            if (tss != null) {
                tss.theiaStickySidebar({
                    additionalMarginTop: $('#header').height() + 20,
                    additionalMarginBottom: 20
                });
            }
            var tss = $('.productRecommend');
            if (tss != null) {
                tss.theiaStickySidebar({
                    additionalMarginTop: $('#header').height() + 20,
                    additionalMarginBottom: 80
                });
            }
            var tss = $('.archiveWrap > nav');
            if (tss != null) {
                tss.theiaStickySidebar({
                    additionalMarginTop: $('#header').height() + 20,
                    additionalMarginBottom: 80
                });
            }
        });
    }
    // # Sticky Sidebar
    $('a').each(function() {
        var url = $(this).attr('href');
        if (url == window.location) {
            $(this).addClass('current');
        }
    });
    $(document).on('click', '.pageTitle .toggleBtn', function() {
        $(this).toggleClass('toggle');
        $('.archiveWrap').toggleClass('toggle');
    });
    $('.footerGrid .widget_media_gallery').append('<ul class="payShipIcon"></ul>');
    $('.footerGrid .widget_media_gallery figure').each(function() {
        var url = $('img', this).attr('data-src');
        $('img', this).parents('.widget_media_gallery').find('.payShipIcon').append('<li style="background-image:url(' + url + ');"></li>');
    });
    $('.footerGrid .widget_media_gallery .gallery').remove();

    function kilo(gram) {
        var kilogram = '';
        if (gram == 0) {} else {
            var kilogram = (gram / 1000 + " Kg");
        }
        return kilogram;
    }

    function replaceText(before, after) {
        return document.body.innerHTML = document.body.innerHTML.replace(before, after);
    }

    function titleCase(str) {
        var capitalText = str.split(" ");
        for (var i = 0; i < capitalText.length; i++) {
            var j = capitalText[i].charAt(0).toUpperCase();
            capitalText[i] = j + capitalText[i].substr(1);
        }
        return capitalText.join(" ");
    }

    replaceText('seconds', 'detik');

    $(document).ready(function() {
        var headerHeight = $('#header').height();
        $('body').attr('style', 'padding-top:' + headerHeight + 'px');
        var currentPageYOffset = 0;
        window.addEventListener("scroll", function() {
            var Y = this.pageYOffset;
            if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
                if (currentPageYOffset < Y) {
                    // $('#header').attr('style','top:-'+headerHeight+'px');
                } else if (currentPageYOffset > Y) {
                    // $('#header').attr('style','top:0px');
                }
                currentPageYOffset = Y;
            }
        }, false);
        $(document.body).append('<div id="page-loader"></div>');
    });
    $(window).on("beforeunload", function() {
        $('.poptamv').removeClass('open');
        $.magnificPopup.close()
        $('#header .grid .item.search').removeClass('active');
        $('#page-loader').fadeIn(500).delay(1000).fadeOut(1000);
    });

    $(document).ready(function() {
        if (window.location.hash) {
            var getHash = window.location.hash;
            $(window).bind('load', function() {
                $('html, body').animate({ scrollTop: $(getHash).offset().top - $('#header').height() - 20 }, 1000);
                $(getHash).addClass('focusHash');
                setTimeout(function() {
                    $(getHash).removeClass('focusHash');
                }, 1400);
            });
        }
    });

    $('body').on('click', 'a', function(e) {
        if ($(this).attr('data-scroll') == 'true') {
            e.preventDefault();
            var getHash = this.hash;
            $('html, body').animate({ scrollTop: $(getHash).offset().top - $('#header').height() - 10 }, 1000);
            $(getHash).addClass('focusHash');
            setTimeout(function() {
                $(getHash).removeClass('focusHash');
            }, 2000);
        }
    });

    $('#checkoutWA label .nama').on('keyup', function() {
        $('form#formOrder .acf-field[data-name="_post_title"] .acf-input').find('input').val(titleCase($(this).val()));
    });
    $('#checkoutWA label .email').on('keyup', function() {
        $('form#formOrder .acf-field[data-name="email_sales"] .acf-input').find('input').val($(this).val());
    });

    $(window).bind('load', function() {
        var negara_pengirim = $('#checkoutWA label .negara_pengirim').val();
        $('form#formOrder .acf-field[data-name="negara_sales"] .acf-input').find('input').val(negara_pengirim);
        $('#checkoutWA label .negara_pengirim').on('change', function() {
            $('form#formOrder .acf-field[data-name="negara_sales"] .acf-input').find('input').val($(this).val());
        });
    });
    $('#checkoutWA label .no_wa_pengirim').on('keyup', function() {
        $('form#formOrder .acf-field[data-name="no_wa_sales"] .acf-input').find('input').val($(this).val());
    });
    $('#checkoutWA label .grup-alamat').on('keyup', function() {
        var alamat = $('#checkoutWA label .alamat').val();
        var kota = $('#checkoutWA label .kota').val();
        var kecamatan = $('#checkoutWA label .kecamatan').val();
        $('form#formOrder .acf-field[data-name="alamat_sales"] .acf-input').find('input').val(titleCase(alamat));
        $('form#formOrder .acf-field[data-name="kota_sales"] .acf-input').find('input').val(titleCase(kota));
        $('form#formOrder .acf-field[data-name="kecamatan_sales"] .acf-input').find('input').val(titleCase(kecamatan));
    });

    $(window).bind('load', function() {

        $('.imgArea, .gallery, .postContent').each(function() { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a:has(img)', // the selector for gallery item
                type: 'image',
                preload: [1, 2],
                gallery: {
                    enabled: true
                },
                callbacks: {
                    beforeOpen: function() {
                        // just a hack that adds mfp-anim class to markup 
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                closeOnContentClick: true,
                midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            });
        });

        var productID = $('#product').attr('data-product-id');
        var productTitle = $('#product').attr('data-product-title');
        $('form#ulasanProduk .acf-field[data-name="produk_ulasan"] .acf-input').find('select').html('<option value="' + productID + '">' + productTitle + '</option>")');
        $('form#ulasanProduk .acf-field[data-name="_post_title"] .acf-input').find('input').val(productTitle);
        $('form#ulasanProduk .acf-field[data-name="nama_ulasan"] .acf-input input').on('keyup', function() {
            var nama_ulasan = $(this).val();
            $(this).val(titleCase(nama_ulasan));
            $('form#ulasanProduk .acf-field[data-name="_post_title"] .acf-input').find('input').val(nama_ulasan + ' : ' + productTitle);
        });
        $('.acf-input input').each(function() {
            $(this).attr('autocomplete', 'off');
        });

        $('form#ulasanProduk .acf-field[data-name="rating_ulasan"] .acf-input ul li label').each(function() {
            var kelas = $(this).attr('class');
            if (kelas === 'selected') {
                $(this).parents('li').addClass('selected');
            }
        });
        $(document).on('click', 'form#ulasanProduk .acf-field[data-name="rating_ulasan"] .acf-input ul li label', function() {
            $(this).parents('li').addClass('selected');
        });
    });

    $('#header .grid .item.btnSearch a, .fixBtn a.searchBtn').on('click', function() {
        $('#header .grid .item.search').addClass('active');
        setTimeout(function() {
            $('#header .grid .item.search form input').focus();
        }, 200);
    });

    $('#header .grid .item.search form input').on('focus', function() {
        $('body').addClass('hideScroll');
        $(this).parents('.item.search').addClass('active');
    });

    $('#header .grid .item.search').on('mouseleave', function() {
        $('body').removeClass('hideScroll');
        $(this).removeClass('active');
        $('#header .grid .item.search form input').blur();
    });

    $('#header .grid .item.search form span').on('click', function() {
        $('body').removeClass('hideScroll');
        $('#header .grid .item.search').removeClass('active');
        $('#header .grid .item.search form input').blur();
    });

    $('.titleSearch a').on('click', function() {
        $('.itemTab').hide();
        $('.titleSearch a').removeClass('active');
        $(this).addClass('active');
        var target = '#' + $(this).attr('data-target');
        $(target).show();
    });

    $('#header .grid .item.search .inSearch .itemTab ul li.menu-item-has-children > i').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent('li').find('ul:first').slideToggle();
    });

    $(window).bind('load', function() {
        $('#livesales .item_livesales').each(function() {
            id = $(this).attr('id');
            cekst = localStorage.getItem(id);
            if (cekst == 'hide') {
                $('#' + id).remove();
            }
        });
        $(document).on('click','#livesales .item_livesales .img',function(){
            $(this).parents('.item_livesales').find('a.cekSales').trigger('click');
        });
        $(document).on('click','#livesales .item_livesales a.cekSales',function(){
            $(this).parents('.item_livesales').find('.closelivesales').trigger('click');
        });
        // Retrieve
        setTimeout(function() {
            $("#livesales > .item_livesales:gt(0)").removeClass('active');
            $("#livesales > .item_livesales:first").addClass('active');
            setInterval(function() {
                $('#livesales > .item_livesales:first').removeClass('active');
                setTimeout(function() {
                    $('#livesales > .item_livesales:first')
                        .next()
                        .addClass('active')
                        .end()
                        .appendTo('#livesales');
                }, 4000); // delay next
            }, 10000); // delay show
        }, 1000); // delay first
        $('#livesales .item_livesales .closelivesales').on('click', function() {
            $(this).parents('.item_livesales').removeClass('active');
            id = $(this).parents('.item_livesales').attr('id');
            localStorage.setItem(id, 'hide');
            setTimeout(function() {
                $('#' + id).remove();
            }, 500);
        });
    });

    var store_id = window.location.hostname;

    function angkaToRp(angka) {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp.' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }
    /* alert(angkaToRp(10000000)); -> Rp. 10.000.000 */

    function lazyload() {
        var loadingBG = '';
        $('img[data-src]').each(function() {
            $(this).attr('style', 'display: block;max-width:100%;opacity: 0;');
            var data_img = $(this).attr('data-src');
            $(this)
                .attr('src', data_img)
                .wrap('<div class="lazy-img-wrap" style="background:' + loadingBG + '"></div>');
            $(this).bind('load', function() {
                $(this).addClass('loaded').animate({
                        opacity: "1"
                    }, 1000)
                    .removeAttr('data-src')
                    .unwrap();
            });
        });

        $('*[data-bg]').each(function() {
            var data_bg = $(this).attr('data-bg');
            $(this)
                .attr('style', 'position:relative;')
                .prepend('<div class="lazy-bg-placeholder" style="position:absolute;z-index:auto;top:0;left:0;right:0;bottom:0;background:' + loadingBG + '"><img src="' + data_bg + '" style="display:none;"/></div>');
            $('.lazy-bg-placeholder img', this).bind('load', function() {
                $(this)
                    .parents('*[data-bg]')
                    .attr('style', 'background-image:url(' + data_bg + ');position:relative;')
                    .removeAttr('data-bg')
                    .find('.lazy-bg-placeholder').fadeOut(1000, function() {
                        $(this).remove();
                    });
            });
        });
    }
    $('.item_product').each(function() {
        var discount = $('.price', this).attr('data-discount');
        var price = $('.price', this).attr('data-price');

        if (discount != null && discount != 0) {
            var discount_price = price - price * discount / 100;
            $('.price', this).attr('data-price', discount_price);
            $('.price', this).text(angkaToRp(discount_price));
            $('.priceArea', this).prepend('<span class="normalPrice">' + angkaToRp(price) + '</span>');
            $('.thumbProduct', this).append('<span class="discount"><b>-' + discount + '%</b> OFF</span>');
        } else {
            $('.price', this).text(angkaToRp(price));
        }
    });

    $(document).ready(function() {
        $('.productOption, .productOption2').each(function() {
            $(this).find('button:first').trigger('click');
        });
    });

    $('.productOption button').each(function() {
        var optionPrice = $(this).attr('data-price');
        var price = $(this).parents('.item_product').find('.price').attr('data-normal-price');
        if (optionPrice == 0 || optionPrice == undefined) {
            $(this).attr('data-price', price);
        }
    });

    $('.item_product').each(function() {
        $('.qtyMin', this).on('click', function() {
            var el = $(this).parents('.item_product').find('.qty');
            var value = $(this).parents('.item_product').find('.qty').val();
            var qty = Number(value) - 1;
            if (qty <= 1) {
                $(el).val(1);
            } else {
                $(el).val(qty);
            }
        });
        $('.qtyPlus', this).on('click', function() {
            var el = $(this).parents('.item_product').find('.qty');
            var value = $(this).parents('.item_product').find('.qty').val();
            var qty = Number(value) + 1;
            $(el).val(qty);
        });
        $('.qty', this).on('change blur', function() {
            value = $(this).val();
            if (value <= 1) {
                $(this).val(1);
            }
        });
        $('.productOption button', this).on('click', function() {
            var text = $(this).text();
            var price = $(this).attr('data-price');
            $(this).parents('.productOption').find('button').removeClass('selected');
            $(this).addClass('selected');

            var id = $(this).parents('.item_product').attr('id');
            var title = $(this).parents('.item_product').find('.title').text();

            if($('.productOption2').html() == undefined) {

                $(this).parents('.item_product').attr('data-id', id + '_' + text);
                $(this).parents('.item_product').find('.title').attr('data-title', title + ' (' + text + ')');
                
            } else {
                var productOption2_val = $('.productOption2').find('button.selected').text();
                $(this).parents('.item_product').attr('data-id', id + '_' + text + '_' + productOption2_val);
                $(this).parents('.item_product').find('.title').attr('data-title', title + ' (' + text + ', '+productOption2_val+')');
            }

            var discount = $(this).parents('.item_product').find('.price').attr('data-discount');

            if (price != null && price != 0) {

                if (discount != null && discount != 0) {
                    var discount_price = price - price * discount / 100;

                    $(this).parents('.item_product').find('.price').attr('data-price', discount_price);
                    $(this).parents('.item_product').find('.price').text(angkaToRp(discount_price));
                    $(this).parents('.item_product').find('.priceArea .normalPrice').text(angkaToRp(price));
                    $(this).parents('.item_product').find('.priceArea .discount').html('<b>' + discount + '%</b> OFF');
                } else {
                    $(this).parents('.item_product').find('.price').attr('data-price', price);
                    $(this).parents('.item_product').find('.price').text(angkaToRp(price));
                }
            } else {
                $(this).parents('.item_product').find('.price').attr('data-price', price);
                $(this).parents('.item_product').find('.price').text(angkaToRp(price));
            }
        });
        $('.productOption2 button', this).on('click', function() {
            var text = $(this).text();
            $(this).parents('.productOption2').find('button').removeClass('selected');
            $(this).addClass('selected');

            var id = $(this).parents('.item_product').attr('id');
            var title = $(this).parents('.item_product').find('.title').text();

            if($('.productOption').html() == undefined) {
                $(this).parents('.item_product').attr('data-id', id + '_' + text);
                $(this).parents('.item_product').find('.title').attr('data-title', title + ' (' + text + ')');
            } else {
                var productOption_val = $('.productOption').find('button.selected').text();
                $(this).parents('.item_product').attr('data-id', id + '_' + productOption_val + '_' + text);
                $(this).parents('.item_product').find('.title').attr('data-title', title + ' (' + productOption_val + ', '+text+')');
            }

        });
    });
    // load  
    var JSON_cart = [];
    function TokoWA_insertJSON(id_temp){
        var data = '';
        id = store_id + id_temp;
        temp = localStorage.getItem(id);
        data = '"' + id + '"' + ':' + temp.replace(/\"/g, '"');
        JSON_cart.push(data);
    }   
    function TokoWA_loadLocalStorage() {
        var arr_temp = [];
        var id_storage = '';
        var x = '';
        var array = TokoWA_getKeyLocalStorage();
        for (var i in array) {
            arr_temp.push(i);        
        }
        arr_temp.sort();
        for (var key in arr_temp) {
            x = arr_temp[key];
            id_storage = '[' + x + '][' + array[x] + ']';
            TokoWA_getValueLocalStorage(id_storage);
            TokoWA_insertJSON(id_storage);
        }
        $('div#JSON_Cart').html(JSON.stringify(JSON_cart));
        var totalprice = 0;
        $('#cartPopup .amountprice').each(function() {
            var amountprice = Number($(this).attr('data-amountprice'));
            totalprice = totalprice + amountprice;
        });
        $("#cartPopup #cartTotal .subtotal h2").html(angkaToRp(totalprice.toFixed(0)));
        $("#cartPopup #cartTotal .subtotal h2").attr('data-subtotal',totalprice.toFixed(0));
        $("#cartPopup #textCheckout .subtotal b").text(angkaToRp(totalprice.toFixed(0)));

        var totalweight = 0;
        $('#cartPopup .amountweight').each(function() {
            var amountweight = Number($(this).attr('data-amountweight'));
            totalweight = totalweight + amountweight;
        });
        $('form#formOrder .acf-field[data-name="berat_produk_sales"] input').val(totalweight.toFixed(0));
        if (totalweight.toFixed(0) != 0) {
            $("#cartPopup #textCheckout .subtotal small").text(' %0ABerat : ' + kilo(totalweight.toFixed(0)));
        }

        $('form#formOrder .acf-field[data-name="data_order_sales"] .acf-input').find('input').val($("#cartPopup #textCheckout").text());
        
        $('#cartPopup .listItem').each(function() {
            $('.qtyMin', this).on('click', function() {
                var el = $(this).parents('.listItem').find('.qty');
                var value = $(this).parents('.listItem').find('.qty').val();
                var qty = Number(value) - 1;
                if (qty <= 1) {
                    $(el).val(1);
                } else {
                    $(el).val(qty);
                }
                // set
                var parents = $(this).parents('.listProduct').attr('id');
                var id = $(this).parents('.listItem').attr('data-id');
                TokoWA_setLocalStorage(parents, id);
            });
            $('.qtyPlus', this).on('click', function() {
                var el = $(this).parents('.listItem').find('.qty');
                var value = $(this).parents('.listItem').find('.qty').val();
                var qty = Number(value) + 1;
                $(el).val(qty);
                // set
                var parents = $(this).parents('.listProduct').attr('id');                
                var id = $(this).parents('.listItem').attr('data-id');         
                TokoWA_setLocalStorage(parents, id);

            });
            $('.qty', this).on('change blur', function() {
                value = $(this).val();
                if (value <= 1) {
                    $(this).val(1);
                }
                // set
                var parents = $(this).parents('.listProduct').attr('id');                
                var id = $(this).parents('.listItem').attr('data-id');
                TokoWA_setLocalStorage(parents, id);
            });
            $('.note', this).keypress(function(e) {
                if (e.which == 13) {
                    // set
                    var parents = $(this).parents('.listProduct').attr('id');                    
                    var id = $(this).parents('.listItem').attr('data-id');
                    TokoWA_setLocalStorage(parents, id);
                }
            });
            $('.note', this).on('change blur', function() {
                // set
                var parents = $(this).parents('.listProduct').attr('id');                
                var id = $(this).parents('.listItem').attr('data-id');
                TokoWA_setLocalStorage(parents, id);
            });
        });
    }

    // view
    $(document).on('click', '.openCart, .vieTokoWA', function() {

        $('#cartPopup .btnCheckout').removeClass('active');
        $('#cartPopup #listCartPopup').show();
        $('#cartPopup .cartForm').hide();
    });
    // add
    $(document).on('click', '.item_product .orderBtn a.orderCart', function() {
        // set
        var parents = $(this).parents('.listProduct').attr('id');
        var id = $(this).parents('.item_product').attr('data-id');
        TokoWA_setLocalStorage(parents, id);

        $('#cartPopup .btnCheckout').removeClass('active');
        $('#cartPopup #listCartPopup').show();
        $('#cartPopup .cartForm').hide();
    });
    // checkout
    $(document).on('click', '.item_product .orderBtn a.orderCheckout', function() {
        // set
        var parents = $(this).parents('.listProduct').attr('id');
        var id = $(this).parents('.item_product').attr('data-id');
        TokoWA_setLocalStorage(parents, id);

        $('#cartPopup .btnCheckout').addClass('active');
        $('#cartPopup .cartForm').slideDown();
        $('#cartPopup #listCartPopup').hide();
        setTimeout(function() {
            $('#cartPopup .cartForm .nama').focus();
        }, 100);
    });
    function TokoWA_checkLocalStorage(id){
        var state = 'false';
        var result = [];
        var value = [];
        var index = '';
        var id_temp = '';
        for (i = 0; i < localStorage.length; i++) {
            cookies = localStorage.key(i);
            temp = cookies.substring(0, store_id.length);
            if (temp == store_id && state == 'false') {
                index = cookies.substring(store_id.length, store_id.length + 5);                
                value = decodeURIComponent(cookies);
                value = value.replace(temp, '');
                value = value.replace(index, '');
                value = value.replace('[', '');
                value = value.replace(']', '');
                if (value == id) {
                    state = 'true';
                    id_temp = cookies;
                    break;
                }
            }
        }
        result = [state,id_temp];
        return result;
    }
    function TokoWA_setLocalStorage(parents, id) {    
        temp = TokoWA_checkLocalStorage(id);
        if (temp[0] == 'true') {
             id_temp = temp[1];        
        }else{
            id_temp = store_id + '[' + ("00" + TokoWA_getIndexKey()).slice(-3) + '][' + id + ']'
        }
        img = $('#' + parents + ' [data-id="' + id + '"] .img').attr('src');
        link = $('#' + parents + ' [data-id="' + id + '"] .link').attr('href');
        title = $('#' + parents + ' [data-id="' + id + '"] .title').attr('data-title');
        price = Number($('#' + parents + ' [data-id="' + id + '"] .price').attr('data-price'));
        weight = Number($('#' + parents + ' [data-id="' + id + '"] .weight').attr('data-weight'));
        note = $('#' + parents + ' [data-id="' + id + '"] .note').val();
        qty = Number($('#' + parents + ' [data-id="' + id + '"] .qty').val());
        calcPrice = qty * price;
        amountprice = calcPrice.toFixed(0);
        calcWeight = qty * weight;
        amountweight = calcWeight.toFixed(0);

        dataStorage = { 'img': img, 'link': link, 'title': title, 'price': price, 'amountprice': amountprice, 'weight': weight, 'amountweight': amountweight, 'note': note, 'qty': qty };
        myJSON = JSON.stringify(dataStorage);
        localStorage.setItem(id_temp, myJSON);

        // clear
        $('.listCart').html('');
        $('select#acf-field_5dc42eeab3e5e').html('');

        // get
        TokoWA_loadLocalStorage();
    }

    $('#cartPopup').on('click', '.btnCheckout', function() {
        $(this).toggleClass('active');
        $('#cartPopup #listCartPopup').slideToggle();
        $('#cartPopup .cartForm').slideToggle();
        $('#cartPopup .cartForm .nama').focus();
    });
    // get
    $(document).ready(function() {
        TokoWA_loadLocalStorage();
    });
    function TokoWA_getKeyLocalStorage() {
        var result = [];
        var value = [];
        var index = '';
        var key = '';
        var i = 0;
        var j = 0;
        for (i = 0; i < localStorage.length; i++) {
            cookies = localStorage.key(i).replace(/^ /, '');
            temp = cookies.substring(0, store_id.length);
            if (temp == store_id) {
                index = cookies.substring(store_id.length, store_id.length + 5);
                key = index.replace('[', '');
                key = key.replace(']', '');

                value = decodeURIComponent(cookies);
                value = value.replace(temp, '');
                value = value.replace(index, '');
                value = value.replace('[', '');
                value = value.replace(']', '');
                result[key] = [value];
                j = j + 1;
            }
        }
        if (j == 0) {
            $('#cartHeader .off, #cartPopup .off').show();
            $('#cartHeader .on, #cartPopup .on').hide();
            $('.btnCart .count').hide();
            $('.btnCart .count').text('');
        } else {
            $('.btnCart .count').show();
            $('.btnCart .count').text(j);
            $('#cartHeader .off, #cartPopup .off').hide();
            $('#cartHeader .on, #cartPopup .on').show();
        }
        return result;
    }    
    function TokoWA_getIndexKey(){
        var result = 0;
        var arr_temp = [];
        var array = TokoWA_getKeyLocalStorage();
        for (var value in array) {           
            arr_temp.push(parseInt(value));            
        } 
        if (arr_temp.length == 0){
            result = 1;
        }else{
            result =  Math.max.apply(null, arr_temp) + 1;
        }
        return result;
    }
    function TokoWA_getValueLocalStorage(id_temp) {
        id = store_id + id_temp;
        temp = localStorage.getItem(id);
        values = JSON.parse(temp);
        // alert(id);

        var dataID = id_temp.replace(id_temp.substring(0,5), '');
        dataID = dataID.replace('[', '');
        dataID = dataID.replace(']', '');
        var id_produk = dataID.replace('product_', '').split('_')[0] ;

        $('select#acf-field_5dc42eeab3e5e').prepend('\
        <option value="' + id_produk + '" selected>' + values.title + '</option>\
        ');
        $('#listCartHeader').prepend('\
        <li class="listItem" data-id="' + dataID + '">\
            <div class="left">\
                <a href="' + values.link + '"><img class="img" src="' + values.img + '"/></a>\
            </div>\
            <div class="center">\
                <h3 class="title" data-title="' + values.title + '"><a class="link" href="' + values.link + '">' + values.title + '</a></h3>\
                <small class="note">' + values.note + '</small>\
            </div>\
            <div class="right">\
                <b class="price" data-price="' + values.price + '">' + angkaToRp(values.price) + '</b> <small>x</small> <span class="qty">' + values.qty + '</span>\
                <br/>\
                <a class="removeProductCart" href="javascript:void(0);" title="Hapus produk?"><small>Hapus</small></a>\
            </div>\
        </li>\
        ');
        $('#listCartPopup').prepend('\
        <li class="listItem" data-id="' + dataID + '">\
            <div class="left">\
                <a href="' + values.link + '"><img class="img" src="' + values.img + '"/></a>\
            </div>\
            <div class="center">\
                <h3 class="title" data-title="' + values.title + '"><a class="link" href="' + values.link + '">' + values.title + '</a></h3>\
                <button class="qtyMin">-</button><input class="qty" type="number" value="' + values.qty + '" min="1" placeholder="Qty"/><button class="qtyPlus">+</button>\
                <noscript class="price" data-price="' + values.price + '">' + angkaToRp(values.price) + '</noscript>\
                <noscript class="weight" data-weight="' + values.weight + '">' + values.weight + '</noscript>\
                <br/>\
                <input type="text" class="note" placeholder="Tambahkan Catatan..." value="' + values.note + '"/>\
                </small>\
            </div>\
            <div class="right">\
                <b class="amountprice" data-amountprice="' + values.amountprice + '" title="Jumlah">' + angkaToRp(values.amountprice) + '</b>\
                <small class="amountweight" data-amountweight="' + values.amountweight + '" title="Berat Produk">' + kilo(values.amountweight) + '</small>\
                <br/>\
                <a class="removeProductCart" href="javascript:void(0);" title="Hapus produk?"><small>Hapus</small></a>\
            </div>\
        </li>\
        ');

        $('#textCheckout .listCart').prepend('\
<span class="listItem" data-id="' + dataID + '">*' + values.title + '*%0A\
' + values.link + '%0A\
' + values.qty + ' x ' + angkaToRp(values.price) + ' ( *' + angkaToRp(values.amountprice) + '* )%0A\
_' + values.note + '_%0A%0A</span>');
    }

    if ($('#slide').html() != undefined) {
        $('#slide .owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            autoHeight: false,
            lazyLoad: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            margin: 0,
            nav: true,
            navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
            items: 1,
            dots: true,
            responsive: {
                769: {
                    mouseDrag: false,
                    touchDrag: false,
                    pullDrag: false,
                },
            },
        });
        $(window).bind('load', function() {
            var slideimgFirst = $('#slide .owl-carousel').find('img:first').width() / 2;
            $('#slide .owl-stage-outer').attr('style', 'height:' + slideimgFirst + 'px!important;');
        });
    }


    if ($('.imgProducts').html() != undefined) {
        $('.imgProducts').owlCarousel({
            loop: false,
            autoHeight: false,
            lazyLoad: true,
            margin: 0,
            nav: true,
            navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
            items: 1,
            dots: true,
            responsive: {
                769: {
                    mouseDrag: false,
                    touchDrag: false,
                    pullDrag: false,
                    smartSpeed: 0,
                },
            },
        });
    }


    $(window).bind('load', function() {
        lazyload();
    });

    $(document).ready(function() {
        if ($('#slide-ulasan').html() != undefined) {
            $('#slide-ulasan .owl-carousel').owlCarousel({
                loop: true,
                center: true,
                navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
                autoHeight: false,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1,
                        stagePadding: 60,
                        margin: 10,
                        nav: true,
                    },
                    // breakpoint from 480 up
                    769: {
                        items: 2,
                        nav: false,
                    },
                    // breakpoint from 768 up
                    1069: {
                        margin: 20,
                        items: 3,
                    }
                }
            });
        }
    });
    // remove
    $(document).on('click', '.removeProductCart', function() {

        if (confirm("Yakin ingin menghapus produk ini?")) {
            var id = $(this).parents('.listItem').attr('data-id');
            temp = TokoWA_checkLocalStorage(id);
            if (temp[0] == 'true') {
                id_temp = temp[1];      
                localStorage.removeItem(id_temp);
                // clear
                $('.listCart').html('');
                $('select#acf-field_5dc42eeab3e5e').html('');
                // get
                TokoWA_loadLocalStorage();  
            }
        } else {
            return false;
        }
    });


    // var tw_payment = {
    //  'Transfer BCA' : '4371278065 A/n. Rian Nurherdian',
    //  'Paypal' : 'kangrian14@gmail.com',
    //  'DANA' : '0896-1888-5066',
    // };

    // var tw_shipping = {
    //     'Standar' : 'JNE, J&T, SICEPAT, dsb..',
    //     'GO-SEND' : 'Bandung Only',
    //     'Pick-up!' : 'Ambil di Tempat',
    // };

    // var arr_payment = tw_payment;
    // $.each(arr_payment, function(key, value) {
    //  $('#checkoutWA .pembayaran optgroup').append('<option value="'+key+'%0A'+value+'">'+key+' (' +value+ ')</option>');
    // });

    // var arr_shipping = tw_shipping;
    // $.each(arr_shipping, function(key, value) {
    //     $('#checkoutWA .pengiriman optgroup').append('<option value="'+key+'%0A'+value+'">'+key+' (' +value+ ')</option>');
    // });

    $('.poptamvBtn').one('click', function() {
        $('body').addClass('hideScroll');
        var title = $(this).attr('data-title');
        var target = '#' + $(this).attr('data-target');
        $(target).addClass('open');
        $(target).find('.titletamv-content').html(title);
        if ($(this).attr('data-iframe') != null) {
            var iframe = $(this).attr('data-iframe');
            $(target).find('iframe').remove();
            $(target).find('.content').prepend('<iframe src="' + iframe + '" />');
        }
    });
    $('.poptamvBtn').on('click', function() {
        $('body').addClass('hideScroll');
        var title = $(this).attr('data-title');
        var target = '#' + $(this).attr('data-target');
        $(target).addClass('open');
        $(target).find('.titletamv-content').html(title);
        if ($(this).attr('data-width') != null) {
            var width = $(this).attr('data-width');
            $(target).find('.wrap').attr('style', 'max-width:' + width + 'px!important;')
        }
        $(target).find('.poptamv-img').remove();
        if ($(this).attr('data-img') != null) {
            var img = $(this).attr('data-img');
            $(target).find('.content').prepend('<img class="poptamv-img" style="width:100%;height:auto;" src="' + img + '" />');
        }
        if ($(this).attr('data-time') != null) {
            var time = $(this).attr('data-time');
            $(target).find('.poptamv-time').remove();
            $(target).find('.content').append('<div class="poptamv-time poptamv-wrap">' + time + '</div>');
        }
        if ($(this).attr('data-caption') != null) {
            var caption = $(this).attr('data-caption');
            $(target).find('.poptamv-caption').remove();
            $(target).find('.content').append('<div class="poptamv-caption poptamv-wrap">' + caption + '</div>');
        }
    });

    $('.poptamv .closeTamv').on('click', function() {
        $('body').removeClass('hideScroll');
        $(this).parents('.poptamv').removeClass('open');
        $(this).parents('.poptamv').find('iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.poptamv .closeTamv').trigger('click');
        }
    });

    $(document).on('click', '.popWin', function() {
        var target_url = $(this).attr('href'),
            w = $(this).attr('data-popWidth'),
            h = $(this).attr('data-popHeight');
        if (w == null) {
            w = 960;
        }
        if (h == null) {
            h = 540;
        }
        left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(target_url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
        popupWindow.focus();
        return false;
    });
})(jQuery);
(function($) {
    $('.formWA [type=email]').each(function(){
        $(this).val('-').trigger('change');
        $(this).closest('.grid-wa').attr('style','grid-template-columns:1fr');
        $(this).closest('.item').hide();
    });
    $('#ulasanProduk [type=email]').each(function(){
        $(this).val('ulasan@'+window.location.hostname).trigger('change');
        $(this).closest('[data-name=email_ulasan]').hide();
    });
    
})(jQuery);