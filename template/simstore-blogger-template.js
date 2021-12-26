/* ==== Peringatan : Menghapus script lisensi berikut dapat mengakibatkan kerusakan / error pada template.. ==== */

window.onload = function() {
    etc();
    shortcode();
    post_convert();
    post_sort();
    pop();
    popwin();
    lazyload();
    timeago();
    lightbox();
    slideshow();
    darkmode();
    custom_js();
}

function slideshow() {
    $('.slideshow').each(function() {

        var $this = $(this);
        var $delay = 4000; // default
        var $data_delay = parseInt($this.attr('data-delay'));
        var $fade = 1000; // default
        var $data_fade = parseInt($this.attr('data-fade'));
        var $interval;

        if ($data_delay.length) {
            $delay = $data_delay;
        }
        if ($data_fade.length) {
            $fade = $data_fade;
        }

        if ($('.slideshow-item, .widget', $this).length > 1) {
            $interval = setInterval(function() {
                $('.slideshow-item:visible, .widget:visible', $this).each(function() {
                    var $item_visible = $(this);
                    $item_visible.hide();
                    if ($item_visible.next('.slideshow-item, .widget').length) {
                        $item_visible.next('.slideshow-item, .widget').fadeIn($fade);
                    } else {
                        $item_visible.closest('.slideshow').find('.slideshow-item, .widget').first().fadeIn($fade);
                    }
                });
            }, $delay);
            $(this).append('\
  <button class="nav-left">\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg>\
  </button>\
  <button class="nav-right">\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>\
  </button>\
   ');
        }
        $('.nav-left', $this).on('click', function() {
            clearInterval($interval);
            $('.slideshow-item:visible, .widget:visible', $this).each(function() {
                var $item_visible = $(this);
                $item_visible.hide();
                if ($item_visible.prev('.slideshow-item, .widget').length) {
                    $item_visible.prev('.slideshow-item, .widget').fadeIn($fade);
                } else {
                    $item_visible.closest('.slideshow').find('.slideshow-item, .widget').last().fadeIn($fade);
                }
            });
        });
        $('.nav-right', $this).on('click', function() {
            clearInterval($interval);
            $('.slideshow-item:visible, .widget:visible', $this).each(function() {
                var $item_visible = $(this);
                $item_visible.hide();
                if ($item_visible.next('.slideshow-item, .widget').length) {
                    $item_visible.next('.slideshow-item, .widget').fadeIn($fade);
                } else {
                    $item_visible.closest('.slideshow').find('.slideshow-item, .widget').first().fadeIn($fade);
                }
            });
        });

    });
}

function darkmode() {
    if (localStorage.getItem("darkmode") == 1) {
        $('a[href="#darkmode"] i').toggle();
    }
    $('a[href="#darkmode"]').on('click', function(e) {
        e.preventDefault();
        $("html").toggleClass("dark");
        $('i', this).toggle();
        if (localStorage.getItem("darkmode") == 1) {
            localStorage.setItem("darkmode", 0);
        } else {
            localStorage.setItem("darkmode", 1);
        }
        darkmode_head();
    });
}

function post_sort() {
    $('#sort select').on('change', function() {
        $('#sort').addClass('loading');
        if ($(this).val() == 'terbaru') {
            var gridItems = $('.Blog article');
            gridItems.sort(function(a, b) {
                return new Date($('[itemprop="datePublished"]', b).attr('content')).getTime() - new Date($('[itemprop="datePublished"]', a).attr('content')).getTime();
            });
            setTimeout(function() {
                $('.Blog .is_loop').append(gridItems);
                $('#sort').removeClass('loading');
            }, 500);
        }
        if ($(this).val() == 'terlama') {
            var gridItems = $('.Blog article');
            gridItems.sort(function(a, b) {
                return new Date($('[itemprop="datePublished"]', a).attr('content')).getTime() - new Date($('[itemprop="datePublished"]', b).attr('content')).getTime();
            });
            setTimeout(function() {
                $('.Blog .is_loop').append(gridItems);
                $('#sort').removeClass('loading');
            }, 500);
        }
        if ($(this).val() == 'terendah') {
            var gridItems = $('.Blog article');
            gridItems.sort(function(a, b) {
                return $('.harga [data-harga]', a).attr('data-harga') - $('.harga [data-harga]', b).attr('data-harga');
            });
            setTimeout(function() {
                $('.Blog .is_loop').append(gridItems);
                $('#sort').removeClass('loading');
            }, 500);
        }
        if ($(this).val() == 'tertinggi') {
            var gridItems = $('.Blog article');
            gridItems.sort(function(a, b) {
                return $('.harga [data-harga]', b).attr('data-harga') - $('.harga [data-harga]', a).attr('data-harga');
            });
            setTimeout(function() {
                $('.Blog .is_loop').append(gridItems);
                $('#sort').removeClass('loading');
            }, 500);
        }

    });
    if ($('#sort select').val() != 'terbaru') {
        $('#sort select').trigger('change');
    }
}

function post_convert() {
    $('article:not(.field_loaded)').each(function() {

        var $article = $(this);

        $article.addClass('field_loaded');

        if ($('.field .gambar', this).length) {
            $('.field .gambar img', this).each(function(i) {
                if (i > 0) {
                    var $url = $(this).attr('src').split('=')[0];
                    $('figure.cover', $article).append('<a class="lightbox" href="' + $url + '=s1000"><img data-src="' + $url + '=w150-h150-c"/></a>');
                }
            });
        }

        var $status = '';
        if ($('.field .status', $article).length) {
            $status = $('.field .status', $article).text().replaceAll('  ', '').replaceAll(/(?:\r\n|\r|\n)/g, '');
        }
        // console.log('$status = ' + $status);

        var $harga_normal = '';
        if ($('.field .harga_normal', $article).length) {
            $harga_normal = $('.field .harga_normal', $article).text().replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll(/(?:\r\n|\r|\n)/g, '');
        }
        // console.log('$harga_normal = ' + $harga_normal);

        var $harga_diskon = '';
        if ($('.field .harga_diskon', $article).length) {
            $harga_diskon = $('.field .harga_diskon', $article).text().replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll(/(?:\r\n|\r|\n)/g, '');
        }
        // console.log('$harga_diskon = ' + $harga_diskon);

        var $html = '';

        if ($harga_normal) {

            $html += '<div class="harga"><span class="wrap">';
            if (!$(this).hasClass('is_post') && $status == 'off') {
                $html += '\
                        <small class="off">' + $_config['cta']['order_button_off'] + '</small><span data-harga="' + $harga_normal + '">' + format_price($harga_normal, $_config['local']['country_id'], $_config['local']['currency']) + '</span>\
                    ';
                $('[itemprop="price"]', this).attr('content', $harga_normal);
            } else {
                if ($harga_diskon) {
                    var $diskon_persen = '';

                    if ($harga_diskon.includes('%')) {
                        $diskon_persen = $harga_diskon.replaceAll('%', '');
                        $harga_diskon = Number($harga_normal - ($harga_normal * $diskon_persen / 100)); // ambil "Nominal" harga diskon
                    } else {
                        $diskon_persen = Math.round(100 - (($harga_diskon / $harga_normal) * 100)); // ambil "Persen" harga diskon
                    }
                    $html += '\
                            <small class="persen">-' + $diskon_persen + '%</small><s>' + format_price($harga_normal, $_config['local']['country_id'], $_config['local']['currency']) + '</s> <b data-harga="' + $harga_diskon + '">' + format_price($harga_diskon, $_config['local']['country_id'], $_config['local']['currency']) + '</b>\
                        ';
                    $('[itemprop="price"]', this).attr('content', $harga_diskon);
                } else {
                    $html += '\
                            <span data-harga="' + $harga_normal + '">' + format_price($harga_normal, $_config['local']['country_id'], $_config['local']['currency']) + '</span>\
                        ';
                    $('[itemprop="price"]', this).attr('content', $harga_normal);
                }

            }

            $html += '</span></div>';

            if ($status == 'off') {
                $(this).addClass('off');
            }

        }

        if ($(this).hasClass('is_post')) {

            if ($status == 'off') {
                $html += '<div class="cta"><a class="link off" href="#off">' + $_config['cta']['order_button_off'] + '</a><a class="bagikan" target="pop-bagikan"><i class="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 248L288 96v85.334C138.666 202.667 85.333 309.334 64 416c53.333-74.666 117.333-108.802 224-108.802v87.469L448 248z"/></svg></i></a></div>';
            } else {
                $admin = encodeURIComponent($('[itemprop="author"] b', this).text()).replaceAll('%0A', '');
                $title = encodeURIComponent($('h1.title', this).text()).replaceAll('%0A', '');
                $html += '<div class="cta"><a class="link" href="https://api.whatsapp.com/send?phone=' + $_config['cta']['whatsapp'] + '&text=' + $_config['cta']['order_text'].replaceAll('[admin]', $admin).replaceAll('[title]', $title) + '%0A%0Avia. ' + $_config['url']['canonical'] + '" target="_popwin"><i class="icon left"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z"></path></svg></i> ' + $_config['cta']['order_button_text'] + '</a><a class="bagikan" target="pop-bagikan"><i class="icon"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 248L288 96v85.334C138.666 202.667 85.333 309.334 64 416c53.333-74.666 117.333-108.802 224-108.802v87.469L448 248z"/></svg></i></a></div>';
            }
        }
        var $title = $('.title', this);
        $($html).insertAfter($title);
    });
}

function popwin() {
    $(document).on('click', '[target="_popwin"]', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).attr('href'),
            width = $(this).attr('data-popwin-width'),
            height = $(this).attr('data-popwin-height');
        var w = 960;
        if (width) {
            w = width;
        }
        var h = 540;
        if (height) {
            h = height;
        }
        var left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

        popupWindow.focus();
    });
}

function shortcode() {
    $('.post-body').each(function() {
        $(this).html(
            $(this).html()
            .replace(/\[youtube\]/g, '<div class="video"><iframe allowfullscreen="true" data-shortcode="youtube" data-src="').replace(/\[\/youtube\]/g, '"></iframe></div>')
            .replace(/\[code\]/g, '<pre data-shortcode="code"><code>').replace(/\[\/code\]/g, '</code></pre>')
            .replace(/\[img\]/g, '<img style="display:block;width:100%;border-radius:10px;" data-shortcode="img" src="').replace(/\[\/img\]/g, '" alt="image"/>')
            .replace(/\[url\]/g, '<a data-shortcode="url" href="').replace(/\[\/url\]/g, '" target="_blank" rel="nofollow external">Lihat Tautan</a>')
        );
    });
    $('[data-shortcode]').each(function() {
        var $shortcode = $(this).attr('data-shortcode');
        if ($shortcode == 'img') {
            var $img_url = $(this).attr('src');
            $(this).wrap('<a class="lightbox" href="' + $img_url + '"></a>');
        }
        if ($shortcode == 'youtube') {
            var $data_src = $(this).attr('data-src');
            var youtube_id = $data_src.split('/')[3];
            if ($data_src.indexOf('https://www.youtube.com/watch?v=') >= 0) {
                youtube_id = get_url_parameter('v', $data_src);
            }
            $(this).attr('data-src', 'https://www.youtube.com/embed/' + youtube_id + '?autoplay=1&rel=0');
        }
    });
}

function etc() {
    $(window).on('beforeunload', function() {
        $('body').addClass('loading');
        setTimeout(function() {
            $('body').removeClass('loading');
        }, 2000);
    });
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('shadow');
        } else {
            $('#header').removeClass('shadow');
        }
    });
    $('.LinkList li a[href*="#"]').each(function() {
        $(this).attr('href', 'javascript:void(0)');
        $(this).append('<i class="icon right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg></i>');
        var $li = $(this).parent('li');
        $li.addClass('dropdown');
        $li.wrapInner('<span class="dropdown-title"></span>');
        $li.append('<ul class="sub"></ul>');
    });
    $('.LinkList li a:contains("_")').each(function() {
        var dropdown = $(this).parent('li').prev('.dropdown').find('ul');
        $(this).parent('li').appendTo(dropdown);
        var text = $(this).text().replaceAll('_', '').replaceAll('_ ', '');
        $(this).text(text)
    });
    $('.LinkList').on('click', 'li.dropdown', function() {
        $(this).find('ul:first').toggle();
        $(this).toggleClass('active');
    });
    if ($('[data-feed]').length) {
        $('[data-feed]').each(function() {
            var $related = $(this);
            var $url = $(this).attr('data-feed');
            $related.addClass('loading');
            $related.load($url + ' .is_loop', function() {

                var $loop = $(this).html();
                $related.html($loop);

                var $article_id = $related.attr('data-hide-id');
                if ($article_id) {
                    if ($related.find('article#' + $article_id).length) {
                        $related.find('article#' + $article_id).remove();
                    } else {
                        $related.find('article:last-of-type').remove();
                    }
                }
                post_convert();
                lazyload();
                timeago();

                $related.removeClass('loading');

            });
        });
    }

    $('#pop-bagikan .copy button').on('click', function(e) {
        var $this = $(this);
        $this.siblings('input').select();
        document.execCommand('copy');
        $this.text('Disalin!');
        setTimeout(function() {
            $this.text('Salin');
        }, 2000);
    });
    if (window.location.hash) {
        if ($(window.location.hash).length) {
            var $header_sticky = $('#header').outerHeight();
            var $attr_sticky = $('.is_single article .attr-sticky').outerHeight();
            $("html, body").stop().animate({ scrollTop: $(window.location.hash).offset().top - $header_sticky - $attr_sticky - 20 }, 500);
            $(window.location.hash).addClass('focus');
            setTimeout(function() {
                $(window.location.hash).removeClass('focus');
            }, 2000);
        }
    }
    $(document).on('click', 'a[href*="#"]', function(e) {
        var $hash = '#' + $(this).attr('href').split('#')[1];
        if ($($hash).length && $(this).attr('href').split('#')[0] === '') {
            e.preventDefault();
            var $header_sticky = $('#header').outerHeight();
            var $attr_sticky = $('.is_single article .attr-sticky').outerHeight();
            if ($attr_sticky) {
                $("html, body").stop().animate({ scrollTop: $($hash).offset().top - $header_sticky - $attr_sticky - 20 }, 500);
            } else {
                $("html, body").stop().animate({ scrollTop: $($hash).offset().top - $header_sticky - 20 }, 500);
            }
            $($hash).addClass('focus');
            setTimeout(function() {
                $($hash).removeClass('focus');
            }, 2000);
        }
    });

    $(document).on('click', '.loadmore-btn', function(e) {
        e.preventDefault();
        let nextLink = $(this).attr('href');
        let loadmoreBtn = $('#blog-pager .loadmore-btn');
        let loadmore_txt = $('#blog-pager .loadmore-btn').text();
        if (nextLink) {
            $.ajax({
                url: nextLink,
                beforeSend: function() {
                    loadmoreBtn.addClass('loading');
                },
                complete: function() {
                    loadmoreBtn.removeClass('loading');
                },
                success: function(html) {
                    let rslt = $(html).find('.Blog .is_loop').html();
                    let nextPage = $(html).find('.loadmore-btn').attr('href');
                    $('.Blog .is_loop').append(rslt);
                    loadmoreBtn.show();
                    post_convert();
                    post_sort();
                    lazyload();
                    timeago();
                    if (nextPage) {
                        loadmoreBtn.attr('href', nextPage);
                    } else {
                        loadmoreBtn.fadeOut();
                    }
                }
            });
        }
    });

    if ($_config['url']['view'] == 'single') {

        var olderLink_text = $('a.blog-pager-older-link').text();
        var olderLink = $('a.blog-pager-older-link').attr('href');
        $('a.blog-pager-older-link').load(olderLink + ' article h1', function() {
            var olderLinkTitle = $('a.blog-pager-older-link').text();
            $('a.blog-pager-older-link').html('<figure class="loading"></figure><div class="flex left"><div class="wrap"><small><b>' + olderLink_text + '</b></small><h3>' + olderLinkTitle + '</h3></div></div>');
            $('a.blog-pager-older-link > figure').load(olderLink + ' article .post-body img:first-of-type', function() {
                var img = $(this).html();
                var src = img.split('src="')[1];
                var url = src.split('"')[0];
                var resize = url.split('=')[0] + '=w100-h100-c';
                $('a.blog-pager-older-link > figure').html('<img src="' + resize + '"/>').removeClass('loading');
            });
        });

        var newerLink_text = $('a.blog-pager-newer-link').text();
        var newerLink = $('a.blog-pager-newer-link').attr('href');
        $('a.blog-pager-newer-link').load(newerLink + ' article h1', function() {
            var newerLinkTitle = $('a.blog-pager-newer-link').text();
            $('a.blog-pager-newer-link').html('<figure class="loading"></figure><div class="flex right"><div class="wrap"><small><b>' + newerLink_text + '</b></small><h3>' + newerLinkTitle + '</h3></div></div>');
            $('a.blog-pager-newer-link > figure').load(newerLink + ' article .post-body img:first-of-type', function() {
                var img = $(this).html();
                var src = img.split('src="')[1];
                var url = src.split('"')[0];
                var resize = url.split('=')[0] + '=w100-h100-c';
                $('a.blog-pager-newer-link > figure').html('<img src="' + resize + '"/>').removeClass('loading');
            });
        });
    }
}

function timeago() {
    $('[datetime]:not(.timeago)').each(function() {
        var $this = $(this);
        var data_timeago = $this.attr('datetime');
        $this.addClass('timeago');
        if (!$this.attr('title')) {
            $this.attr('title', data_timeago);
        }
        $this.text(get_timeago(data_timeago));
    });

    function get_timeago(t) {
        var e = new Date(t),
            a = 36e5,
            o = 24 * a,
            s = 30 * o,
            i = 365 * o,
            n = "yang lalu",
            l = new Date - e;
        return l < 6e4 ? Math.round(l / 1e3) + " detik " + n : l < a ? Math.round(l / 6e4) + " menit " + n : l < o ? Math.round(l / a) + " jam " + n : l < s ? Math.round(l / o) + " hari " + n : l < i ? Math.round(l / s) + " bulan " + n : Math.round(l / i) + " tahun " + n
    }
    $('#comments .datetime a:not(.timeago)').each(function() {
        var $this = $(this);
        var data_timeago = $this.text();
        $this.attr('datetime', data_timeago);

        var datetime = $this.attr('datetime');

        $this.addClass('timeago');
        $this.attr('title', datetime);

        $this.text(get_timeago(datetime));
    });
}

function format_price($number, $country_id, $currency) {
    return new Intl.NumberFormat($country_id, { style: 'currency', currency: $currency, maximumSignificantDigits: 3 }).format($number);
}

function separator(angka, symbol = '') {
    var separator = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) separator += angkarev.substr(i, 3) + '.';
    if (symbol) {
        return symbol + ' ' + separator.split('', separator.length - 1).reverse().join('');
    } else {
        return separator.split('', separator.length - 1).reverse().join('');
    }
}

function pop() {
    if ($('[target=pop-video]').length) {
        $pop_video_html = '\
 <div id="pop-video" data-pop-title="Video" data-pop-width="960">\
   <div class="video">\
  <iframe allowfullscreen="true"></iframe>\
   </div>\
 </div>\
 ';
        $($pop_video_html).appendTo('body');
    }
    $('[id*="pop-"]:not(".pop-loaded")').each(function() {
        var $this = $(this),
            $id = $this.attr('id'),
            $pop_title = $this.attr('data-pop-title'),
            $pop_width = $this.attr('data-pop-width'),
            $pop_height = $this.attr('data-pop-height');
        $this.wrap('<div class="pop"></div>');
        $this.wrap('<div class="pop-wrap"></div>');
        $this.addClass('pop-content pop-loaded');
        var header = '\
   <header class="pop-header">\
  <div class="pop-title">\
    <h3>\
   ' + $pop_title + '\
    </h3>\
  </div>\
  <div class="pop-close">\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"/></svg>\
  </div>\
   </header>\
 ';
        $this.closest('.pop-wrap').prepend(header);
        if ($pop_width) {
            $this.closest('.pop-wrap').css('width', $pop_width);
        }
    });
    $('.pop-close').on('click', function() {
        $(this).closest('.pop').removeClass('open');
        $('body').removeClass('pop-open');
        if ($('[id=pop-video] iframe').length) {
            $('[id=pop-video] iframe').attr('src', '');
        }
    });
    $(document).on('click', '[target*="pop-"]', function(e) {
        e.preventDefault();
        var $this = $(this),
            pop_id = $this.attr('target'),
            pop_title = ($this.attr('data-pop-title') ? $this.attr('data-pop-title') : $('#' + pop_id).attr('data-pop-title')),
            pop_width = $this.attr('data-pop-width'),
            pop_height = $this.attr('data-pop-height');


        $this.closest('.pop').removeClass('open');
        $('body').removeClass('pop-open');


        if ($('#' + pop_id).length) {

            $('body').addClass('pop-open');
            $('#' + pop_id).closest('.pop').addClass('open');
            if ($this.closest('.pop-content').length) {
                $back_id = $this.closest('.pop-content').attr('id');
                pop_title = '<a target="' + $back_id + '"><i class="pop-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg></i></a>' + pop_title;
            }
            if (pop_title) {
                $('#' + pop_id).closest('.pop').find('.pop-title h3').html(pop_title);
            }
            $('[data-src]').each(function() {
                var data_src = $(this).attr('data-src');
                $(this).attr('src', data_src).removeAttr('data-src');
            });
        }

        /* custom */

        if (pop_id == 'pop-video') {
            $href = $(this).attr('href');

            var youtube_id = $href.split('/')[3];

            if ($href.indexOf('https://www.youtube.com/watch?v=') >= 0) {
                youtube_id = get_url_parameter('v', $href);
            }

            $('[id=pop-video] iframe').attr('src', 'https://www.youtube.com/embed/' + youtube_id + '?autoplay=1&showinfo=0');

        }

    });
    $(document).on('click', '.pop.open', function() {
        $(this).find('.pop-close').trigger('click');
    });
    $(document).on('click', '.pop-wrap', function(e) {
        e.stopPropagation();
    });
}

function lightbox() {
    if ($('.lightbox-auto').length) {
        $('.lightbox-auto').each(function() {
            $('img', this).closest('a').each(function() {
                $(this).addClass('lightbox');
            })
        });
    }
    if ($('.lightbox:not([target])').length) {
        var $html = '\
   <div id="lightbox">\
  <figure></figure>\
   </div>\
 ';
        $('body').append($html);

        $(document).on('click', '.lightbox:not([target])', function(e) {
            e.preventDefault();

            var $href = $(this).attr('href');

            $('#lightbox').addClass('open');
            $('#lightbox figure').addClass('loading');
            $('#lightbox figure').html('<img src="' + $href + '"/>');
            $('#lightbox figure img').on('load', function() {
                $('#lightbox figure').removeClass('loading');
                $(this).addClass('open');
            });
        });

        $(document).on('click', '#lightbox', function(e) {
            $('#lightbox').removeClass('open');
            $('#lightbox img').remove();
        });
        $(window).on('scroll', function() {
            $('#lightbox').removeClass('open');
            $('#lightbox img').remove();
        });
    }
}

function lazyload() {

    $('[data-bg]').each(function() {
        var $this = $(this);
        var url = $this.attr('data-bg');
        $this.css('background-image', 'url(' + url + ')').removeAttr('data-bg');
    });

    $('[data-src]:not([lazy="true"])').each(function() {

        var $this = $(this);

        var window_height = $(window).height();
        var scroll_top = $(window).scrollTop();
        var window_bottom = scroll_top + window_height;

        var $this_top = $this.offset().top;

        $this.attr('data-offset-top', $this_top);

        var url = $this.attr('data-src');
        url = url.replace('1.bp.blogspot.com', 'lh3.googleusercontent.com');
        url = url.replace('2.bp.blogspot.com', 'lh3.googleusercontent.com');
        url = url.replace('3.bp.blogspot.com', 'lh3.googleusercontent.com');
        url = url.replace('4.bp.blogspot.com', 'lh3.googleusercontent.com');

        var tag_name = $this.prop('tagName').toLowerCase();
        if ($this_top <= window_bottom) {
            if (tag_name == 'img') {
                $this.attr('src', url).removeAttr('data-src');
                $this.attr('lazy', 'true');
                // $this.attr('src', url).on('load', function() {
                //     $this.removeAttr('data-src');
                // });
            } else if (tag_name == 'iframe') {
                $this.attr('src', url).removeAttr('data-src');
                $this.attr('lazy', 'true');
            }
        }

    });

    $(window).on('scroll', function() {

        var window_height = $(window).height();
        var scroll_top = $(window).scrollTop();
        var window_bottom = scroll_top + window_height;

        $('[data-src]:not([lazy="true"])').each(function() {

            var $this = $(this);

            var window_height = $(window).height();
            var $this_top = $this.offset().top;

            var url = $this.attr('data-src');
            url = url.replace('1.bp.blogspot.com', 'lh3.googleusercontent.com');
            url = url.replace('2.bp.blogspot.com', 'lh3.googleusercontent.com');
            url = url.replace('3.bp.blogspot.com', 'lh3.googleusercontent.com');
            url = url.replace('4.bp.blogspot.com', 'lh3.googleusercontent.com');

            var tag_name = $this.prop('tagName').toLowerCase();
            if ($this_top <= window_bottom) {
                if (tag_name == 'img') {
                    $this.attr('src', url).removeAttr('data-src');
                    $this.attr('lazy', 'true');
                    // $this.attr('src', url).on('load', function() {
                    //     $this.removeAttr('data-src');
                    // });
                } else if (tag_name == 'iframe') {
                    $this.attr('src', url).removeAttr('data-src');
                    $this.attr('lazy', 'true');
                }
            }
        });

    });

}

function titleCase(str) {
    str = str.split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    str = str.join(' ');
    return str;
}

function $_GET(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function get_url_parameter(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


/*
████████████████████████████████████████████████████████

                LICENSE

████████████████████████████████████████████████████████
*/

const $license_item = 'simstore-blogger-template'; // tentukan item_path

license(); // load license

function license() {

    function dkrypt($data) {
        function isBase64(str) {
            try {
                return btoa(atob(str)) == str;
            } catch (err) {
                return false;
            }
        }
        if (isBase64($data)) {
            $data = atob($data);
            $data = $data.replaceAll('XXX', '.');
            $data = $data.replaceAll('YY', '-');
            $data = $data.replaceAll('O5', 'a');
            $data = $data.replaceAll('E4', 'i');
            $data = $data.replaceAll('U3', 'u');
            $data = $data.replaceAll('I2', 'e');
            $data = $data.replaceAll('A1', 'o');

            function reverseString(str) {
                const arrayStrings = str.split("");
                const reverseArray = arrayStrings.reverse();
                const joinArray = reverseArray.join("");
                return joinArray;
            }
            $data = reverseString($data); // balikeun
            return $data; // ambil hanya hostname
        } else {
            return '';
        }
    }

    function notice_html($text) {
        var $html = '\
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap" rel="stylesheet">\
            <style>* { font-family: "Rubik", sans-serif; font-weight:400; box-sizing:border-box;margin:0;padding:0; text-decoration:none; color:#636363; } b { font-weight: 500; color:#232323; }</style>\
            <div id="notice_html" style="display:flex;background:#fafafa;min-height:100vh;text-align:center;">\
                <div style="margin:auto;width:480px;max-width:80%;background:white;padding:30px;border-radius:10px;border:1px solid #ddd;">\
                    <svg style="fill:#636363;width:100px;height:100px;display:block;margin:0 auto 20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"/></svg>\
                    <h2><b>Peringatan</b> :</h2>\
                    <br>\
                    <p>' + $text + '</p>\
                    <br>\
                    <hr style="border:0;border-top:1px solid #ddd;">\
                    <br>\
                    <a href="https://lapak.kangrian.net/ketentuan" target="_blank" style="opacity:.7;font-size:70%;letter-spacing:1px;">https://lapak.kangrian.net</a>\
                </div>\
            </div>\
        ';
        return document.body.innerHTML = $html;
    }

    if (typeof $license_key === 'undefined') {
        notice_html('Dilarang menghapus variable <b>$license_key</b>..');
    } else if (typeof $license_item === 'undefined') {
        notice_html('Dilarang menghapus variable <b>$license_item</b>..');
    } else {
        if (location.hostname.indexOf('localhost') != -1 || location.hostname.indexOf('.blogspot.com') != -1 || location.hostname.indexOf('.blogger.com') != -1) {
            console.log('Developed by. https://kangrian.net ( Free / Trial Version )');
        } else {
            if ($license_key === '') {
                notice_html('<b>Kode Lisensi</b> dibutuhkan..<br><br><small>#ERR_LICENSE</small>');
            } else {
                const $license_get_domain = dkrypt($license_key).split('|')[0];
                const $license_get_item = dkrypt($license_key).split('|')[1];

                // console.log($license_get_domain);
                // console.log($license_get_item);

                if ($license_get_domain == '' || $license_get_domain == undefined) { // ngasal

                    notice_html('<b>Kode Lisensi</b> yang digunakan tidak valid.</b><br><br><small>#ERR_KEY</small>');

                } else {

                    if (location.hostname.indexOf($license_get_domain) == -1) { // hostname tidak termasuk domain

                        notice_html('<b>Kode Lisensi</b> hanya bisa digunakan pada website dengan domain : <b>' + $license_get_domain + '</b><br><br><small>#ERR_DOMAIN</small>');

                    } else if ($license_get_item != $license_item) { // item tidak sesuai

                        function titlecase_item(str) {
                            str = str.split(' ');
                            for (var i = 0; i < str.length; i++) {
                                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
                            }
                            str = str.join(' ');
                            return str;
                        }
                        notice_html('<b>Kode Lisensi</b> hanya bisa digunakan untuk <b>' + titlecase_item($license_item.replaceAll('-', ' ')) + '</b><br><br><small>#ERR_ITEM</small>');

                    } else {
                        console.log('Developed by. https://kangrian.net ( Premium Version )');
                    }

                }
            }
        }
    }
}

/*
████████████████████████████████████████████████████████

                / LICENSE

████████████████████████████████████████████████████████
*/