function campur() {
    blogger_feed();
    global_js();
    lightbox_js();
    lazyload();

    console.log(config);

    if (config.canonical_url != config.checkout_url && config.live_sales.status == 'on') {
        if (config.live_sales.url_add == '') {
            alert('url_add dibutuhkan! (redirect youtube integrasi gsheet)');
        } else if (config.live_sales.url_sync == '') {
            alert('url_sync dibutuhkan! (redirect youtube integrasi gsheet)');
        } else if (config.live_sales.url_get == '') {
            alert('url_get dibutuhkan! (redirect youtube integrasi gsheet)');
        } else {
            live_sales_get();
        }
    }

    lokasi_js();
}

function blogger_feed() {
    window.onload = function() {
        var json_post = window.location.origin + '/feeds/posts/default?alt=json';
        $.getJSON(json_post, function(data) {
            // console.log(data.feed.entry);
            data.feed.entry.forEach(function(item) {
                var id = item.id.$t.split('post-')[1];

                config.feed.posts[id] = {};

                var content = item.content.$t;

                if (content) {

                    config.feed.posts[id].content = content;

                    if ($('.data_img img', content).first()) {

                        var img = $('.data_img img:first', content).attr('src'),
                            img_split = img.split('/'),
                            img_size = img_split[img_split.length - 2],
                            thumb = img.replace(img_size, 'w100-h100-c');

                        config.feed.posts[id].thumb = thumb;

                    }

                }

                var title = item.title.$t;
                config.feed.posts[id].title = title;

                var url = item.link[2].href;
                config.feed.posts[id].url = url;
            });
        });
        var json_pages = window.location.origin + '/feeds/pages/default?alt=json';
        $.getJSON(json_pages, function(data) {
            // console.log(data.feed.entry);
            data.feed.entry.forEach(function(item) {
                var id = item.id.$t.split('page-')[1];

                config.feed.pages[id] = {};

                var content = item.content.$t;

                if (content) {
                    config.feed.pages[id].content = content;
                }

                var title = item.title.$t;
                config.feed.pages[id].title = title;

                var url = item.link[2].href;
                config.feed.pages[id].url = url;
            });
        });
    }
}

function time_ago(t) {
    var e = new Date(t),
        a = 36e5,
        o = 24 * a,
        s = 30 * o,
        i = 365 * o,
        n = "yang lalu",
        l = new Date - e;
    return l < 6e4 ? Math.round(l / 1e3) + " detik " + n : l < a ? Math.round(l / 6e4) + " menit " + n : l < o ? Math.round(l / a) + " jam " + n : l < s ? Math.round(l / o) + " hari " + n : l < i ? Math.round(l / s) + " bulan " + n : Math.round(l / i) + " tahun " + n
}

function live_sales_get() {

    var live_sales_get = config.live_sales.url_get;
    live_sales_get += '?action=read';

    $.getJSON(live_sales_get, function(data) {
        if (data) {
            $('body').append('<div id="live_sales"></div>');

            data.records.forEach(function(item, i) {
                var live_sales = $('#live_sales');
                var pesanan = item.pesanan.split('|');

                var time = new Date(item.timestamp).getTime();
                var id = pesanan[1] + '-' + time;
                id = id.replaceAll(' ', '').toLowerCase();

                var website = pesanan[0];

                if (website === window.location.hostname) { // hostname

                    var nama = pesanan[1];
                    var produk_id = pesanan[2];

                    var produk_nama = config.feed.posts[produk_id].title;
                    var produk_img = config.feed.posts[produk_id].thumb;
                    var produk_url = config.feed.posts[produk_id].url;
                    var produk_lainnya = pesanan[3];

                    var html5 = '';
                        html5 += '<div class="item" id="' + id + '">';
                        html5 += '<a class="img" href="' + produk_url + '"><img src="' + produk_img + '"/></a>';
                        html5 += '<div class="info">';
                        html5 += '<span class="close">×</span>';
                        html5 += '<b>' + nama + '</b>';
                        html5 += ' ' + config.live_sales['have_ordered'] + ' ';
                        html5 += '<a href="' + produk_url + '">' + produk_nama + '</a>';
                        if (produk_lainnya) {
                            html5 += ' & ' + produk_lainnya + ' ' + config.live_sales['more_item'];
                        }
                        html5 += '<br/><small>' + time_ago(item.timestamp) + '</small>';
                        html5 += '</div>';
                        html5 += '</div>';

                    if (!sessionStorage['live_sales_' + id]) {
                        live_sales.append(html5);
                    }
                }
            });


            var records_length = data.records.length;
            var records_delay = 6000;
            var records_interval = records_delay * 2;
            var counter = 0;

            function show_records(records_delay) {
                setTimeout(function() {
                    $('#live_sales .item').last().addClass('open');
                    var id = $('#live_sales .item.open').attr('id');
                    sessionStorage['live_sales_' + id] = 1;
                    setTimeout(function() {
                        $('#live_sales .item.open').addClass('opened').removeClass('open');
                        setTimeout(function() {
                            $('#live_sales .item.opened').remove();
                        }, 500);
                    }, records_delay);
                }, 1);
            }

            show_records(records_delay);

            var i = setInterval(function() {

                show_records(records_delay);

                counter++;
                if (counter === records_length - 1) {
                    clearInterval(i);
                }

                // console.log('counter = ' + counter);

            }, records_interval);

            $('#live_sales .item .info .close').on('click', function() {
                var item = $(this).closest('.item');
                item.addClass('opened').removeClass('open');
                setTimeout(function() {
                    item.remove();
                }, 500);
            });


        }
    });
}

function kirim_wa() {
    var checkout = config.checkout;
    var pesanan = '';
    var i_pesanan = 0;
    checkout.keranjang.forEach(function(item) {
        i_pesanan++;
        if (i_pesanan > 1) {
            pesanan += '\n\n';
        }
        if (checkout.keranjang.length > 1) {
            pesanan += i_pesanan + '. ';
        }
        pesanan += '*' + item.name + '*\n';

        if (checkout.keranjang.length > 1) {
            pesanan += '    ';
        }
        pesanan += config.text['price'] + ' : ' + (item.price_normal ? '~' + format_currency(item.price_normal) + '~ ' : '') + format_currency(item.price) + '\n';

        if (checkout.keranjang.length > 1) {
            pesanan += '    ';
        }
        pesanan += config.text['sum'] + ' ( ' + item.qty + ' ) : ' + format_currency(item.price * item.qty);
        if (item.note) {
            pesanan += '\n';
            if (checkout.keranjang.length > 1) {
                pesanan += '    ';
            }
            pesanan += '💬 _' + item.note + '_';
        }
    });


    var output = config.text['checkout_hello'] + ' :';
    output += '\n\n';
    output += pesanan;
    output += '\n\n————————————————\n\n';
    output += config.text['checkout_subtotal'] + ' : ' + format_currency(checkout.subtotal) + '\n';
    if (checkout.ongkir) {
        output += config.text['checkout_shipping_cost'] + ' : ' + format_currency(checkout.ongkir) + '\n';
    }
    output += '\n' + config.text['checkout_total'] + ' : *' + format_currency(checkout.total) + '*';
    output += '\n\n————————————————';
    output += '\n\n';
    output += '*' + config.text['checkout_shipping'] + '* :\n';
    output += checkout.pengiriman.name + '\n';
    output += checkout.pengiriman.title + '\n\n';
    output += '*' + config.text['checkout_payment'] + '* :\n';
    output += checkout.pembayaran.name + '\n';
    output += checkout.pembayaran.info + '\n\n';
    output += '*' + config.text['buyer'] + '* :\n';
    output += checkout.penerima.nama + ' ( ' + checkout.penerima.whatsapp + ' )\n';
    output += checkout.penerima.alamat + '\n';
    output += checkout.penerima.lokasi + '\n';
    if (checkout.penerima.catatan) {
        output += '\n💬 _' + checkout.penerima.catatan + '_';
    }
    output += '\n\n';
    output += 'via. ' + config.home_url;

    delete localStorage['cart'];

    var url_wa = 'https://web.whatsapp.com/send';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        url_wa = 'https://api.whatsapp.com/send';
    }
    var confirm_url = url_wa + '?phone=' + config.country_code + parseInt(config.whatsapp_number) + '&text=' + encodeURIComponent(output);
    if (confirm('Buka WhatsApp?')) {
        if (config.live_sales.status == 'on' && config.live_sales.url_add && config.live_sales.url_sync && config.live_sales.url_get) {
            live_sales_add(confirm_url, pesanan);
        } else {
            window.location.href = confirm_url;
        }
        $('#loading').fadeIn(1000);
    } else {
        return false;
    }
}

function live_sales_add(confirm_url, pesanan) {
    var now = new Date(),
        timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000); // indonesia date

    timestamp = timestamp.toISOString().replaceAll('T', ' ').replaceAll('Z', '');
    timestamp = timestamp.split('.')[0];

    var live_sales_add = config.live_sales.url_add;

    var data_inject =
        '?timestamp=' + timestamp +
        '&pesanan=' + encodeURIComponent(pesanan) +
        '&penerima=' + encodeURIComponent(config.checkout.penerima.nama + '\n\n' + config.checkout.penerima.alamat + (config.checkout.penerima.catatan ? '\n\n💬 ' + config.checkout.penerima.catatan : '')) +
        '&kecamatan=' + config.checkout.penerima.lokasi.split(', ')[0] +
        '&kota=' + config.checkout.penerima.lokasi.split(', ')[1] +
        '&whatsapp=' + config.checkout.penerima.whatsapp +
        '&pengiriman=' + config.checkout.pengiriman.name +
        '&pembayaran=' + config.checkout.pembayaran.name +
        '&total=' + format_currency(config.checkout.total);

    $.ajax({
        url: live_sales_add + data_inject,
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log('ID Pesanan : ' + data['row']);
            live_sales_sync(confirm_url);
        }
    });
}

function live_sales_sync(confirm_url) {
    var now = new Date(),
        timestamp = new Date(now.getTime() - now.getTimezoneOffset() * 60000); // indonesia date

    timestamp = timestamp.toISOString().replaceAll('T', ' ').replaceAll('Z', '');
    timestamp = timestamp.split('.')[0];

    var live_sales_sync = config.live_sales.url_sync;

    var checkout = config.checkout;
    var pesanan = window.location.hostname + '|' + encodeURIComponent(config.checkout.penerima.nama) + '|';
    var i_pesanan = 0;
    checkout.keranjang.every(function(item) {
        i_pesanan++;
        if (i_pesanan == 1) {
            pesanan += item.id;
        }
    });
    if (checkout.keranjang.length > 1) {
        pesanan += '|' + parseInt(checkout.keranjang.length - 1);
    }
    var data_inject =
        '?timestamp=' + timestamp +
        '&pesanan=' + pesanan;

    $.ajax({
        url: live_sales_sync + data_inject,
        method: "GET",
        dataType: "json",
        success: function(data) {
            console.log('ID live_sales : ' + data['row']);
            window.location.href = confirm_url;
        }
    });
}

function global_js() {

    sync_cart();

    $('[type=tel]').on('keyup', function() {
        var input = $(this);
        var value = input.val().replace(/[^0-9+\s]/g, "");

        value = value.replace(' ', '');

        input.val(value);

    });
    $('.page_body a:has(img)').each(function() {
        var id = $(this).closest('.post').attr('id');
        $(this).attr('data-lightbox', id);
    });
    $('[data-text]').each(function() {
        var data_text = $(this).attr('data-text');
        $(this).text(config.text[data_text]);
    });
    $('[data-placeholder]').each(function() {
        var data_placeholder = $(this).attr('data-placeholder');
        $(this).attr('placeholder', config.text[data_placeholder]);
    });
    $('a').each(function() {
        var url1 = $(this).attr('href'),
            url2 = $(this).attr('href') + '?m=1',
            url3 = $(this).attr('href') + '&m=1';
        if (url1 == window.location || url2 == window.location || url3 == window.location) {
            $(this).addClass('current');
        }
    });
    var header_height = $('header').outerHeight();
    $('body').css('padding-top', header_height + 15);
    var menu_header = $('#menu_bar #Header1').outerHeight(),
        menu_footer = $('#menu_bar #LinkList2').outerHeight();
    $('#menu_bar #LinkList1 ul').attr('style', 'height:calc(100vh - ' + Number(menu_header + menu_footer) + 'px);overflow:auto;');
    $('#Label1 nav').clone().appendTo('.search_form form');
    $(window).click(function() {
        $('.search_form nav').removeClass('open');
        $('#menu_bar').removeClass('open');
    });
    $(document).on('click', '.search_form form', function(e) {
        e.stopPropagation();
        $('.search_form nav').addClass('open');
        $('#menu_bar').removeClass('open');
    });
    $('#LinkList2 nav ul li a').each(function() {
        var href = $(this).attr('href'),
            title = $(this).attr('title');
        $(this).attr('title', title);
        if (href.indexOf("facebook") > -1 || href.indexOf("fb.me") > -1 || href.indexOf("fb.com") > -1) {
            $(this).html('<svg xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M320,85.333h64c5.891,0,10.667-4.776,10.667-10.667v-64C394.667,4.776,389.891,0,384,0h-64c-64.772,0.071-117.263,52.561-117.333,117.333V192H128c-5.891,0-10.667,4.776-10.667,10.667v64c0,5.891,4.776,10.667,10.667,10.667h74.667v224c0,5.891,4.776,10.667,10.667,10.667h64c5.891,0,10.667-4.776,10.667-10.667v-224h74.667c4.589-0.003,8.662-2.942,10.112-7.296l21.333-64c1.862-5.589-1.16-11.629-6.749-13.491c-1.084-0.361-2.22-0.546-3.363-0.547h-96v-74.667C288,99.66,302.327,85.333,320,85.333z"/></svg>');
        }
        if (href.indexOf("instagram") > -1 || href.indexOf("instagr.am") > -1) {
            $(this).html('<svg xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192c88.352,0,160-71.648,160-160V160C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112V160C48,98.24,98.24,48,160,48h192c61.76,0,112,50.24,112,112V352z"/><path d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z M256,336c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80C336,300.096,300.096,336,256,336z"/><circle cx="393.6" cy="118.4" r="17.056"/></svg>');
        }
        if (href.indexOf("twitter") > -1 || href.indexOf("t.co") > -1) {
            $(this).html('<svg xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568C480.224,136.96,497.728,118.496,512,97.248z"/></svg>');
        }
        if (href.indexOf("youtube") > -1 || href.indexOf("youtu.be") > -1) {
            $(this).html('<svg xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M490.24,113.92c-13.888-24.704-28.96-29.248-59.648-30.976C399.936,80.864,322.848,80,256.064,80c-66.912,0-144.032,0.864-174.656,2.912c-30.624,1.76-45.728,6.272-59.744,31.008C7.36,138.592,0,181.088,0,255.904C0,255.968,0,256,0,256c0,0.064,0,0.096,0,0.096v0.064c0,74.496,7.36,117.312,21.664,141.728c14.016,24.704,29.088,29.184,59.712,31.264C112.032,430.944,189.152,432,256.064,432c66.784,0,143.872-1.056,174.56-2.816c30.688-2.08,45.76-6.56,59.648-31.264C504.704,373.504,512,330.688,512,256.192c0,0,0-0.096,0-0.16c0,0,0-0.064,0-0.096C512,181.088,504.704,138.592,490.24,113.92z M192,352V160l160,96L192,352z"/></svg>');
        }
        if (href.indexOf("whatsapp") > -1 || href.indexOf("wa.me") > -1) {
            $(this).html('<svg viewBox="0 0 512 512" xmlns="//www.w3.org/2000/svg"><path d="m435.921875 74.351562c-48.097656-47.917968-112.082031-74.3242182-180.179687-74.351562-67.945313 0-132.03125 26.382812-180.445313 74.289062-48.5 47.988282-75.234375 111.761719-75.296875 179.339844v.078125.046875c.0078125 40.902344 10.753906 82.164063 31.152344 119.828125l-30.453125 138.417969 140.011719-31.847656c35.460937 17.871094 75.027343 27.292968 114.933593 27.308594h.101563c67.933594 0 132.019531-26.386719 180.441406-74.296876 48.542969-48.027343 75.289062-111.71875 75.320312-179.339843.019532-67.144531-26.820312-130.882813-75.585937-179.472657zm-180.179687 393.148438h-.089844c-35.832032-.015625-71.335938-9.011719-102.667969-26.023438l-6.621094-3.59375-93.101562 21.175782 20.222656-91.90625-3.898437-6.722656c-19.382813-33.425782-29.625-70.324219-29.625-106.71875.074218-117.800782 96.863281-213.75 215.773437-213.75 57.445313.023437 111.421875 22.292968 151.984375 62.699218 41.175781 41.03125 63.84375 94.710938 63.824219 151.152344-.046875 117.828125-96.855469 213.6875-215.800781 213.6875zm0 0"/><path d="m186.152344 141.863281h-11.210938c-3.902344 0-10.238281 1.460938-15.597656 7.292969-5.363281 5.835938-20.476562 19.941406-20.476562 48.628906s20.964843 56.40625 23.886718 60.300782c2.925782 3.890624 40.46875 64.640624 99.929688 88.011718 49.417968 19.421875 59.476562 15.558594 70.199218 14.585938 10.726563-.96875 34.613282-14.101563 39.488282-27.714844s4.875-25.285156 3.414062-27.722656c-1.464844-2.429688-5.367187-3.886719-11.214844-6.800782-5.851562-2.917968-34.523437-17.261718-39.886718-19.210937-5.363282-1.941406-9.261719-2.914063-13.164063 2.925781-3.902343 5.828125-15.390625 19.3125-18.804687 23.203125-3.410156 3.894531-6.824219 4.382813-12.675782 1.464844-5.851562-2.925781-24.5-9.191406-46.847656-29.050781-17.394531-15.457032-29.464844-35.167969-32.878906-41.003906-3.410156-5.832032-.363281-8.988282 2.570312-11.898438 2.628907-2.609375 6.179688-6.179688 9.105469-9.582031 2.921875-3.40625 3.753907-5.835938 5.707031-9.726563 1.949219-3.890625.972657-7.296875-.488281-10.210937-1.464843-2.917969-12.691406-31.75-17.894531-43.28125h.003906c-4.382812-9.710938-8.996094-10.039063-13.164062-10.210938zm0 0"/></svg>');
        }
        if (href.indexOf("telegram") > -1 || href.indexOf("t.me") > -1) {
            $(this).html('<svg viewBox="0 0 24 24" xmlns="//www.w3.org/2000/svg"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z"/></svg>');
        }
    });
    $('#LinkList2 nav').clone().prependTo('footer .wrapper');

    $.each(config.shipping, function(key1, val1) {
        if (config.shipping[key1]['status'] == 'on') {
            $('#cart_shipping ul').append('<li data-cost="' + config.shipping[key1]['cost'] + '"><span>' + key1 + '</span><h4>' + config.shipping[key1]['title'] + '</h4><small>' + config.shipping[key1]['description'] + '</small></li>');
        }
    });
    $.each(config.payment, function(key1, val1) {
        if (config.payment[key1]['status'] == 'on') {
            $('#cart_payment select').append('<option value="' + key1 + '|' + config.payment[key1]['info'] + '">' + key1 + ' ( ' + config.payment[key1]['info'] + ' )</option>');
        }
    });
    $(document).on('click', '.js-load', function() {
        convert_post();
        lazyload();
    });

    $('#banner .widget a[href*="youtu.be"]').each(function() {
        $(this).attr('data-pop', '#pop-iframe');
        $(this).append('<svg class="youtube_play" viewBox="0 -77 512.00213 512" xmlns="//www.w3.org/2000/svg"><path d="m501.453125 56.09375c-5.902344-21.933594-23.195313-39.222656-45.125-45.128906-40.066406-10.964844-200.332031-10.964844-200.332031-10.964844s-160.261719 0-200.328125 10.546875c-21.507813 5.902344-39.222657 23.617187-45.125 45.546875-10.542969 40.0625-10.542969 123.148438-10.542969 123.148438s0 83.503906 10.542969 123.148437c5.90625 21.929687 23.195312 39.222656 45.128906 45.128906 40.484375 10.964844 200.328125 10.964844 200.328125 10.964844s160.261719 0 200.328125-10.546875c21.933594-5.902344 39.222656-23.195312 45.128906-45.125 10.542969-40.066406 10.542969-123.148438 10.542969-123.148438s.421875-83.507812-10.546875-123.570312zm0 0" fill="#f00" filter="url(#youtube_shadow)"/><path d="m204.96875 256 133.269531-76.757812-133.269531-76.757813zm0 0" fill="#fff"/><defs><filter id="youtube_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dx="2" dy="2" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>');
    });


    $(document).on('submit', '#help form', function(e) {
        e.preventDefault();
        var msg = $('input', this).val();

        var url_wa = '//web.whatsapp.com/send';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            url_wa = '//api.whatsapp.com/send';
        }
        var link = url_wa + '?lang=' + config['language_code'] + '&phone=' + config['country_code'] + config['whatsapp_number'] + '&text=' + config.text['hello_ask'] + '%0A%0A💬 ' + msg + '%0A%0Avia. ' + config['canonical_url'];

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(link, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

        popupWindow.focus();
        $('#help form input').val('');
    });
    $(document).on('click', '.toggle_btn', function(e) {
        e.preventDefault();
        $(this).toggleClass('on');
    });
    $(document).on('click', '.popup', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');

        var w = 960,
            h = 540,
            left = Number((screen.width / 2) - (w / 2)),
            tops = Number((screen.height / 2) - (h / 2)),
            popupWindow = window.open(href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

        popupWindow.focus();
    });
    $(document).on('click', '#menu_bar', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', '.menu_toggle', function(e) {
        e.stopPropagation();
        $('#menu_bar').toggleClass('open');
        $('.search_form nav').removeClass('open');
    });
    $(window).on('scroll', function() {
        var header = $('header');
        var headerTop = header.offset().top;
        if (headerTop > 0) {
            $(header).addClass('onscroll');
        } else {
            $(header).removeClass('onscroll');
        }
    });

    if (config['canonical_url'] == config['checkout_url'].replace('?m=1', '').replace('&m=1', '')) {
        $('body').addClass('checkout_page');
        $('#cart_widget, .post, .page_title, #featured-label, #help').hide();
        $('#checkout').show();
        window.onload = function() {
            $('.cart_finish').trigger('click');
        }
    }
    $(document).on('input', '.titleCase', function() {
        var str = $(this).val();
        str = str.split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        str = str.join(' ');
        $(this).val(str);
    });

    $('#cart_form [name]').on('change', function() {
        var name = $(this).attr('name');
        config.checkout.penerima[name] = $(this).val();
        // console.clear();
        // console.log(config.checkout);
    });
    $(document).on('click', '.cart_finish', function() {
        $('#checkout #cart_form').trigger('submit');
    });

    let cart = [];

    $('#loading').fadeOut(100);
    $(window).on('beforeunload', function() {
        $('#loading').fadeIn(1000).delay(1000).fadeOut(1000);
    });


    /* POP ========================================================= */
    $('.pop').each(function() {
        var width = $(this).attr('data-width');
        if (width) {
            $('.pop_wrap', this).css('width', width);
        }
    });
    $(window).click(function() {
        $('.pop').each(function() {
            $(this).removeClass('open');
            $('body').css('overflow', 'auto');

            if ($(this).attr('id') == 'pop-iframe') {
                $(this).find('.pop_iframe').html('');
            }
        });
    });
    $(document).on('click', '[data-pop]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).attr('data-pop');
        if ($(id).html()) {
            $(id).addClass('open');
            $('body').css('overflow', 'hidden');
        } else {
            alert(id + ' belum dibuat!');
        }
        if (id == '#pop-share') {
            var href = $(this).attr('href'),
                title = $(this).attr('title');
            $(id + ' .pop_title').text(title);
            $(id + ' .pop_content a[href*="_SHARELINK_"]').each(function() {
                var replace_href = $(this).attr('href').replace('_SHARELINK_', href);
                $(this).attr('href', replace_href);
            });
        }
        if (id == '#pop-iframe') {
            var href = $(this).attr('href'),
                title = $(this).attr('title');

            var youtube_id = href.replace('//youtu.be/', '');

            $(id + ' .pop_title').text(title);

            $(id + ' .pop_content .pop_iframe').html('<iframe src="//www.youtube.com/embed/' + youtube_id + '?autoplay=1&rel=0" allowfullscreen></iframe>')
        }
    });
    $(document).on('click', '.pop_wrap', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', '.pop_close', function(e) {
        e.stopPropagation();
        $(this).closest('.pop').removeClass('open');
        $('body').css('overflow', 'auto');

        if ($(this).closest('.pop').attr('id') == 'pop-iframe') {
            $(this).closest('.pop').find('.pop_iframe').html('');
        }
    });
    $(document).on('click', '.pop_content a[href]', function() {
        $(this).closest('.pop').removeClass('open');
    });
    /* POP ========================================================= */
    $('#cart_shipping ul li').on('click', function() {
        $('#cart_shipping').attr('data-active', true);
        $('#cart_shipping ul li').removeClass('active');
        $(this).addClass('active');

        var cost = $(this).attr('data-cost'),
            title = $('span', this).text();

        $('.cart_total_shipping').attr('data-cost', cost).text(format_currency(cost));

        config.checkout.pengiriman['name'] = $('span', this).text();
        config.checkout.pengiriman['title'] = $('h4', this).text();
        config.checkout.pengiriman['info'] = $('small', this).text();
        config.checkout.pengiriman['cost'] = parseInt($(this).attr('data-cost'));

        config.checkout['ongkir'] = parseInt($(this).attr('data-cost'));
        config.checkout['subtotal'] = parseInt($('td.cart_subtotal').attr('data-price'));
        config.checkout['berat'] = parseInt($('td.cart_weighttotalcount').attr('data-weight'));
        config.checkout['total'] = parseInt($('td.cart_subtotal').attr('data-price')) + parseInt($(this).attr('data-cost'));

        // console.clear();
        // console.log(config.checkout);

        cart_total_update();

    });
    $('#cart_payment select').append('<option hidden="hidden" selected="selected" value="">-- ' + config.text['payment_select'] + ' --</option>');
    $('#cart_payment select').on('change', function() {
        $(this).closest('#cart_payment').attr('data-active', true);
        var value = $(this).val().split('|');
        config.checkout.pembayaran['name'] = value[0];
        config.checkout.pembayaran['info'] = value[1];

        // console.clear();
        // console.log(config.checkout);
    });

    $('#checkout #cart_form [name][required]').each(function() {
        $('<b class="required">' + config.text['required'] + '</b>').insertAfter(this);
        $(this).on('change', function() {
            if ($(this).val()) {
                $(this).next('.required').removeClass('open');
            }
        });
    });
    $(document).on('keydown', '#checkout #cart_form [name]', function(e) {
        if (e.which == 13) {
            if ($(this).prop('tagName') != 'TEXTAREA') {
                $(this).blur();
                $('#checkout #cart_form').trigger('submit');
                return false;
            }
        }
    });
    $(document).on('submit', '#checkout #cart_form', function(e) {
        e.preventDefault();
        var nama = $('[name=nama]', this).val(),
            whatsapp = $('[name=whatsapp]', this).val(),
            alamat = $('[name=alamat]', this).val(),
            catatan = $('[name=catatan]', this).val();

        var checkField = 1;
        $('[name][required]', this).each(function() {
            if ($(this).val() == '') {
                var $this = $(this);
                $this.addClass('focus');
                setTimeout(function() {
                    $this.removeClass('focus');
                }, 1000);
                $this.focus().next('.required').addClass('open');
                checkField = 0;
                return false;
            }
        });
        if (checkField) {
            if ($('#cart_shipping').attr('data-active') == undefined) {
                $(document).blur();
                var header_height = $('header').outerHeight();
                $("html, body").stop().animate({
                    scrollTop: $('#cart_shipping').offset().top - 15 - header_height
                }, 400);
                $('#cart_shipping').addClass('focus');
                setTimeout(function() {
                    $('#cart_shipping').removeClass('focus');
                }, 1000);
                return false
            } else if ($('#cart_payment').attr('data-active') == undefined) {
                $(document).blur();
                var header_height = $('header').outerHeight();
                $("html, body").stop().animate({
                    scrollTop: $('#cart_payment').offset().top - 15 - header_height
                }, 400);
                $('#cart_payment').addClass('focus');
                $('#cart_payment select').focus();
                setTimeout(function() {
                    $('#cart_payment').removeClass('focus');
                }, 1000);
                return false
            } else {
                if ($('#cart_form [name=whatsapp]').val().length < 6) {
                    $("html, body").stop().animate({
                        scrollTop: 0
                    }, 400);
                    setTimeout(function() {
                        $('#cart_form [name=whatsapp]').focus();
                        $('#cart_form [name=whatsapp]')
                            .next('.required')
                            .html(config.text['valid_whatsapp'] + '.<br/><small>( ' + config.text['example'] + ' : ' + config.text['example_whatsapp'] + ' )</small>')
                            .addClass('open');
                    }, 400);
                    return false;
                } else {
                    kirim_wa();
                }
            }
        } else {
            return false;
        }
    });

    /* CART ========================================================= */
    $(document).on('change', '.qty input', function() {
        if ($(this).val() <= 0) {
            $(this).val(0);
        }
    });
    $(document).on('click', '.qty button', function() {
        var qty = '';
        $this = $(this);
        if ($this.hasClass('min')) {
            qty = $this.next();
            var qtyMin = Number(qty.val()) - 1;
            if (qty.val() <= 1) {
                qty.val(0);
            } else {
                qty.val(qtyMin);
            }
        }
        if ($this.hasClass('plus')) {
            qty = $this.prev();
            var qtyPlus = Number(qty.val()) + 1;
            qty.val(qtyPlus);
        }

        $this.closest('.qty').addClass('loading');
        setTimeout(function() {
            $this.closest('.qty').removeClass('loading');
            qty.trigger('change');
        }, 400);
    });

    $(document).on('click', '.prod_note', function(e) {
        e.stopPropagation();
        var id = $(this).closest('.prod').attr('id');
        $('#cart_widget').trigger('click');
        setTimeout(function() {
            $('#pop-cart .item[data-id="' + id + '"] .cart_note').focus().addClass('focus');
            setTimeout(function() {
                $('#pop-cart .item[data-id="' + id + '"] .cart_note').removeClass('focus');
            }, 1000);
        }, 100);
    });
    $(document).on('click', '.prod_add', function(e) {
        e.preventDefault();
        var $prod = $(this).closest('.prod');
        var $this = $(this);

        $this.addClass('loading');
        setTimeout(function() {
            $this.removeClass('loading');
            $prod.find('.prod_qty').val(1).trigger('change');
            $prod.find('.prod_add').hide();
            $prod.find('.qty').fadeIn();
            $prod.find('.prod_note').fadeIn();
        }, 400);
    });
    $(document).on('change', '.prod_qty', function(e) {
        e.preventDefault();
        $(this).blur();
        var $prod = $(this).closest('.prod');
        var $this = $(this);

        if ($(this).val() <= 0) {
            $prod.find('.qty').hide();
            $prod.find('.prod_note').hide();
            $prod.find('.prod_add').fadeIn();
        }

        $this.addClass('loading');
        setTimeout(function() {
            $this.removeClass('loading');

            var prod_id = $prod.attr('id'),
                prod_url = $prod.find('.prod_url').attr('href'),
                prod_img = $prod.find('.prod_img img:first').attr('src').replace('w300-h300-c', 'w100-h100-c'),
                prod_name = $prod.find('.prod_name').text(),
                prod_note = '',
                prod_price = parseInt($prod.find('.prod_price').attr('data-price')),
                prod_price_normal = parseInt($prod.find('.prod_price_normal').attr('data-price')),
                prod_weight = parseInt($prod.attr('data-weight')),
                prod_qty = parseInt($prod.find('.prod_qty').val());

            if (!prod_weight) {
                prod_weight = 0;
            }

            var lanjut = true;

            var cart = JSON.parse(localStorage.getItem('cart'));

            if (cart == null) {
                cart = [];
            }

            for (var i in cart) {
                if (cart[i].id == prod_id) {
                    cart[i].qty = prod_qty;
                    cart_save(cart);
                    cart_show();
                    cart_total_update();
                    lanjut = false;
                }
            }

            if (lanjut) {

                // Buat Obyek JavaScript
                var item = {
                    id: prod_id,
                    url: prod_url,
                    img: prod_img,
                    name: prod_name,
                    note: prod_note,
                    price: prod_price,
                    price_normal: prod_price_normal,
                    weight: prod_weight,
                    qty: prod_qty
                };
                cart.push(item);
                cart_save(cart);
                cart_show();
                cart_total_update();

            }

        }, 400);
    });

    $(document).on('change', '.cart_note', function() {
        var note_update = $(this).val();
        var index = $(this).closest('.item').attr('data-index');

        var cart = JSON.parse(localStorage.getItem('cart'));
        for (var i in cart) {
            if (i == index) {
                cart[i].note = note_update;
                cart_save(cart);
                cart_show();
                return;
            }
        }
    });
    $(document).on('change', '.cart_qty', function() {
        var $this = $(this),
            qty_update = $(this).val(),
            id = $(this).closest('.item').attr('data-id'),
            index = $(this).closest('.item').attr('data-index'),
            name = $(this).closest('.item').find('.center b').text();

        if (qty_update <= 0) {
            $this.closest('.item').addClass('loading');

            var cart = JSON.parse(localStorage.getItem('cart'));
            cart.splice(index, 1); /* Hapus Item di Keranjang */
            cart_save(cart);
            cart_show();
            cart_total_update();
        } else {
            var cart = JSON.parse(localStorage.getItem('cart'));
            for (var i in cart) {
                if (i == index) {
                    cart[i].qty = qty_update;
                    cart_save(cart);
                    cart_show();
                    cart_total_update();
                    return;
                }
            }
        }
        var $prod = $('.prod#' + id);
        $prod.find('.prod_qty').val(qty_update).trigger('change');
    });

    if (config.view == 'notpage' || config.view == 'post') {
        convert_post();
    }

    if (config.view == 'post') {
        $('.prod_desc a.more').trigger('click');
        $('.prod_wrap .prod_url').attr('style', 'cursor:default');
    }
}

function lokasi_js() {
    if (config.lokasi.status == 200 && $('[name="lokasi"]').length) {
        $('[name="lokasi"]').attr('list', 'list_lokasi');
        $('<datalist id="list_lokasi"></div>').appendTo('body');
        $('<input type="hidden" name="lokasi_id">').insertAfter('[name="lokasi"]');
        $.each(config.lokasi.result, function(key, value) {
            var nama = config.lokasi.result[key]['nama'];
            var kecamatan = nama[0];
            var kota = nama[1];
            $('#list_lokasi').append('<option value="' + nama + '"></option>');
        });
    }

    $('[name="lokasi"]').on('focus', function() {
        $(this).select();
    });

    $('[name="lokasi"]').on('change', function(e) {

        e.preventDefault();

        var $this = $(this);

        var check = false;
        var lokasi_id = '';
        $.each(config.lokasi.result, function(key, value) {
            var nama = config.lokasi.result[key]['nama'];
            if ($this.val().toString() === nama.toString()) {
                check = true;
                lokasi_id = key + ',' + config.lokasi.result[key]['kota_id'];
            }
        });

        if (!check && $(this).val().length > 0) {
            alert('Pilih Lokasi dari Saran Pencarian..');
            $(this).val('').focus();
        } else {
            $(this).next('[name="lokasi_id"]').val(lokasi_id).trigger('change');
            $(this).blur();
        }
    });
}

function lazyload() {
    $('[data-src]').each(function() {
        var element = $(this);
        var url = element.attr('data-src');
        element.attr('src', url).on('load', function() {
            element.removeAttr('data-src').removeAttr('loading');
        });
    });

    $('[data-bg]').each(function() {
        var data_bg = $(this).attr('data-bg');
        $(this).css('background-image', 'url(' + data_bg + ')').removeAttr('data-bg');
    });
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': '%1 / %2',
        'fadeDuration': 200,
        'alwaysShowNavOnTouchDevices': true
    });
}

function lightbox_js() {
    /*!
     * Lightbox v2.11.3
     * by Lokesh Dhakar
     *
     * More info:
     * //lokeshdhakar.com/projects/lightbox2/
     *
     * Copyright Lokesh Dhakar
     * Released under the MIT license
     * //github.com/lokesh/lightbox2/blob/master/LICENSE
     *
     * @preserve
     */
    ! function(a, b) { "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.lightbox = b(a.jQuery) }(this, function(a) {
        function b(b) { this.album = [], this.currentImageIndex = void 0, this.init(), this.options = a.extend({}, this.constructor.defaults), this.option(b) }
        return b.defaults = { albumLabel: "Image %1 of %2", alwaysShowNavOnTouchDevices: !1, fadeDuration: 600, fitImagesInViewport: !0, imageFadeDuration: 600, positionFromTop: 50, resizeDuration: 700, showImageNumberLabel: !0, wrapAround: !1, disableScrolling: !1, sanitizeTitle: !1 }, b.prototype.option = function(b) { a.extend(this.options, b) }, b.prototype.imageCountLabel = function(a, b) { return this.options.albumLabel.replace(/%1/g, a).replace(/%2/g, b) }, b.prototype.init = function() {
            var b = this;
            a(document).ready(function() { b.enable(), b.build() })
        }, b.prototype.enable = function() {
            var b = this;
            a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(c) { return b.start(a(c.currentTarget)), !1 })
        }, b.prototype.build = function() {
            if (!(a("#lightbox").length > 0)) {
                var b = this;
                a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(a("body")), this.$lightbox = a("#lightbox"), this.$overlay = a("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = { top: parseInt(this.$container.css("padding-top"), 10), right: parseInt(this.$container.css("padding-right"), 10), bottom: parseInt(this.$container.css("padding-bottom"), 10), left: parseInt(this.$container.css("padding-left"), 10) }, this.imageBorderWidth = { top: parseInt(this.$image.css("border-top-width"), 10), right: parseInt(this.$image.css("border-right-width"), 10), bottom: parseInt(this.$image.css("border-bottom-width"), 10), left: parseInt(this.$image.css("border-left-width"), 10) }, this.$overlay.hide().on("click", function() { return b.end(), !1 }), this.$lightbox.hide().on("click", function(c) { "lightbox" === a(c.target).attr("id") && b.end() }), this.$outerContainer.on("click", function(c) { return "lightbox" === a(c.target).attr("id") && b.end(), !1 }), this.$lightbox.find(".lb-prev").on("click", function() { return 0 === b.currentImageIndex ? b.changeImage(b.album.length - 1) : b.changeImage(b.currentImageIndex - 1), !1 }), this.$lightbox.find(".lb-next").on("click", function() { return b.currentImageIndex === b.album.length - 1 ? b.changeImage(0) : b.changeImage(b.currentImageIndex + 1), !1 }), this.$nav.on("mousedown", function(a) { 3 === a.which && (b.$nav.css("pointer-events", "none"), b.$lightbox.one("contextmenu", function() { setTimeout(function() { this.$nav.css("pointer-events", "auto") }.bind(b), 0) })) }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() { return b.end(), !1 })
            }
        }, b.prototype.start = function(b) {
            function c(a) { d.album.push({ alt: a.attr("data-alt"), link: a.attr("href"), title: a.attr("data-title") || a.attr("title") }) }
            var d = this,
                e = a(window);
            e.on("resize", a.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
            var f, g = 0,
                h = b.attr("data-lightbox");
            if (h) { f = a(b.prop("tagName") + '[data-lightbox="' + h + '"]'); for (var i = 0; i < f.length; i = ++i) c(a(f[i])), f[i] === b[0] && (g = i) } else if ("lightbox" === b.attr("rel")) c(b);
            else { f = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]'); for (var j = 0; j < f.length; j = ++j) c(a(f[j])), f[j] === b[0] && (g = j) }
            var k = e.scrollTop() + this.options.positionFromTop,
                l = e.scrollLeft();
            this.$lightbox.css({ top: k + "px", left: l + "px" }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && a("body").addClass("lb-disable-scrolling"), this.changeImage(g)
        }, b.prototype.changeImage = function(b) {
            var c = this,
                d = this.album[b].link,
                e = d.split(".").slice(-1)[0],
                f = this.$lightbox.find(".lb-image");
            this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), a(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
            var g = new Image;
            g.onload = function() {
                var h, i, j, k, l, m;
                f.attr({ alt: c.album[b].alt, src: d }), a(g), f.width(g.width), f.height(g.height), m = a(window).width(), l = a(window).height(), k = m - c.containerPadding.left - c.containerPadding.right - c.imageBorderWidth.left - c.imageBorderWidth.right - 20, j = l - c.containerPadding.top - c.containerPadding.bottom - c.imageBorderWidth.top - c.imageBorderWidth.bottom - c.options.positionFromTop - 70, "svg" === e && (f.width(k), f.height(j)), c.options.fitImagesInViewport ? (c.options.maxWidth && c.options.maxWidth < k && (k = c.options.maxWidth), c.options.maxHeight && c.options.maxHeight < j && (j = c.options.maxHeight)) : (k = c.options.maxWidth || g.width || k, j = c.options.maxHeight || g.height || j), (g.width > k || g.height > j) && (g.width / k > g.height / j ? (i = k, h = parseInt(g.height / (g.width / i), 10), f.width(i), f.height(h)) : (h = j, i = parseInt(g.width / (g.height / h), 10), f.width(i), f.height(h))), c.sizeContainer(f.width(), f.height())
            }, g.src = this.album[b].link, this.currentImageIndex = b
        }, b.prototype.sizeOverlay = function() {
            var b = this;
            setTimeout(function() { b.$overlay.width(a(document).width()).height(a(document).height()) }, 0)
        }, b.prototype.sizeContainer = function(a, b) {
            function c() { d.$lightbox.find(".lb-dataContainer").width(g), d.$lightbox.find(".lb-prevLink").height(h), d.$lightbox.find(".lb-nextLink").height(h), d.$overlay.focus(), d.showImage() }
            var d = this,
                e = this.$outerContainer.outerWidth(),
                f = this.$outerContainer.outerHeight(),
                g = a + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
                h = b + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;
            e !== g || f !== h ? this.$outerContainer.animate({ width: g, height: h }, this.options.resizeDuration, "swing", function() { c() }) : c()
        }, b.prototype.showImage = function() { this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav() }, b.prototype.updateNav = function() { var a = !1; try { document.createEvent("TouchEvent"), a = !!this.options.alwaysShowNavOnTouchDevices } catch (a) {} this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (a && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), a && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), a && this.$lightbox.find(".lb-next").css("opacity", "1")))) }, b.prototype.updateDetails = function() {
            var a = this;
            if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
                var b = this.$lightbox.find(".lb-caption");
                this.options.sanitizeTitle ? b.text(this.album[this.currentImageIndex].title) : b.html(this.album[this.currentImageIndex].title), b.fadeIn("fast")
            }
            if (this.album.length > 1 && this.options.showImageNumberLabel) {
                var c = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
                this.$lightbox.find(".lb-number").text(c).fadeIn("fast")
            } else this.$lightbox.find(".lb-number").hide();
            this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() { return a.sizeOverlay() })
        }, b.prototype.preloadNeighboringImages = function() {
            if (this.album.length > this.currentImageIndex + 1) {
                (new Image).src = this.album[this.currentImageIndex + 1].link
            }
            if (this.currentImageIndex > 0) {
                (new Image).src = this.album[this.currentImageIndex - 1].link
            }
        }, b.prototype.enableKeyboardNav = function() { this.$lightbox.on("keyup.keyboard", a.proxy(this.keyboardAction, this)), this.$overlay.on("keyup.keyboard", a.proxy(this.keyboardAction, this)) }, b.prototype.disableKeyboardNav = function() { this.$lightbox.off(".keyboard"), this.$overlay.off(".keyboard") }, b.prototype.keyboardAction = function(a) {
            var b = a.keyCode;
            27 === b ? (a.stopPropagation(), this.end()) : 37 === b ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === b && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
        }, b.prototype.end = function() { this.disableKeyboardNav(), a(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && a("body").removeClass("lb-disable-scrolling") }, new b
    });
}

function convert_post() {
    $('.loop article[data-load=false]').each(function() {
        $(this).attr('data-load', true);

        var prod_id = $('.prod', this).attr('id'),
            prod_url = $('.post-title a', this).attr('href'),
            prod_name = $('.post-title a', this).text(),
            prod_desc = $('.data_desc', this).text(),
            prod_stock = $('.data_stock', this).text(),
            prod_weight = parseInt($('.data_weight', this).text().replaceAll('.', '').replaceAll(',', '')),
            prod_price = parseInt($('.data_price', this).text().replaceAll('.', '').replaceAll(',', '')),
            prod_price_normal = parseInt($('.data_price_normal', this).text().replaceAll('.', '').replaceAll(',', ''));

        $('.prod', this).append('\
        <div class="prod_grid">\
            <div class="left">\
                <div class="prod_img"></div>\
            </div>\
            <div class="right">\
                <div class="prod_wrap">\
                    <h3>\
                        <a href="' + prod_url + '" title="' + prod_name + '" data-pop="#pop-share">\
                            <svg viewBox="0 0 512 512.00004" xmlns="//www.w3.org/2000/svg"><path d="m511.824219 255.863281-233.335938-255.863281v153.265625h-27.105469c-67.144531 0-130.273437 26.148437-177.753906 73.628906-47.480468 47.480469-73.628906 110.609375-73.628906 177.757813v107.347656l44.78125-49.066406c59.902344-65.628906 144.933594-103.59375 233.707031-104.457032v153.253907zm-481.820313 179.003907v-30.214844c0-59.132813 23.027344-114.730469 64.839844-156.542969s97.40625-64.839844 156.539062-64.839844h57.105469v-105.84375l162.734375 178.4375-162.734375 178.441407v-105.84375h-26.917969c-94.703124 0-185.773437 38.652343-251.566406 106.40625zm0 0"/></svg>\
                        </a>\
                        <a class="prod_url" href="' + prod_url + '">\
                            <b class="prod_name">' + prod_name + '</b>\
                        </a>\
                    </h3>\
                    <p class="prod_desc">' + prod_desc + '</p>\
                    <div class="prod_act">\
                        <div class="left">\
                            <div class="wrap">\
                                <h4>\
                                    <b class="prod_price" data-price="' + prod_price + '">' + format_currency(prod_price) + '</b>\
                                </h4>\
                            </div>\
                        </div>\
                        <div class="center">\
                            <div class="wrap">\
                                <svg class="prod_note" viewBox="0 -1 401.52289 401" xmlns="//www.w3.org/2000/svg"><path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/></svg>\
                            </div>\
                        </div>\
                        <div class="right">\
                            <div class="wrap">\
                                <div class="prod_addQty">\
                                    <div class="qty" style="display: none;">\
                                        <button class="min">-</button>\
                                        <input class="prod_qty" type="number" name="qty" value="0">\
                                        <button class="plus">+</button>\
                                    </div>\
                                    <button class="prod_add" style="display: none;">' + config.text['add'] + '</button>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ');
        $('.data_img img', this).each(function() {
            var w = $(this).attr('width'),
                h = $(this).attr('height'),
                gallery = $(this).attr('src').replace('w' + w + '-h' + h, 's0').replace('s' + h, 's0'),
                gallery_resize = gallery.replace('s0', 'w300-h300-c');
            $(this).closest('article').find('.prod_img').append('<a href="' + gallery + '" data-lightbox="lb-' + prod_id + '" data-title="' + prod_name + ' - ' + format_currency(prod_price) + '"><img alt="' + prod_name + '" data-src="' + gallery_resize + '"/></a>');
        });

        $('[itemprop="offers"]', this).append('<meta content="' + prod_price + '" itemprop="price"/>');


        $('.prod_desc', this).each(function() {
            var maxLength = 80;
            var myStr = $(this).text();
            if ($.trim(myStr).length > maxLength) {
                var newStr = myStr.substring(0, maxLength);
                var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                $(this).empty().html(newStr);
                $(this).append('<a class="more">\u2026 ' + config.text['more'] + '</a>');
                $(this).append('<span style="display:none;">' + removedStr + '</span>');
                $('a.more', this).on('click', function(e) {
                    e.preventDefault();
                    $(this).hide().next('span').show();
                });
            }
        });
        if (prod_price_normal) {
            $('.prod h4', this).prepend('<s class="prod_price_normal" data-price="' + prod_price_normal + '">' + format_currency(prod_price_normal) + '</s>');
            $('.prod_img', this).append('<label class="prod_promo">PROMO</label>');
        }

        if (prod_weight) {
            $('.prod', this).attr('data-weight', prod_weight);
        }
        if (prod_stock == 'off') {
            $('.prod h4', this).html('<span class="prod_empty">' + config.text['sold'] + '</span>');
            $('.prod_add', this).attr('disabled', 'disabled');
            $('.prod_img label.prod_promo', this).remove();
            $('[itemprop="offers"]', this).append('<meta content="https://schema.org/OutOfStock" itemprop="availability"/>');
        } else {
            $('[itemprop="offers"]', this).append('<meta content="https://schema.org/InStock" itemprop="availability"/>');
        }
    });

    sync_cart();

    $('.prod').each(function() {
        var $prod = $(this);
        $('.prod_qty', this).each(function() {
            if ($(this).val() <= 0) {
                $(this).closest('.qty').hide();
                $prod.find('.prod_note').hide();
                $prod.find('.prod_add').fadeIn();
            } else {
                $(this).closest('.qty').fadeIn();
                $prod.find('.prod_note').fadeIn();
                $prod.find('.prod_add').hide();
            }
        });
    });
}

function sync_cart() {
    cart_show();
    cart_total_update();
}

function cart_show() {

    var cart = JSON.parse(localStorage.getItem('cart'));

    /* Jika Keranjang Kosong */
    if (!localStorage['cart'] || cart.length == 0) {
        $('.cart_list').empty();
        $('#checkout .ready').hide();
        $('#checkout .empty').show();
        $('#pop-cart, #cart_widget').removeClass('open');
        $('body').css('overflow', 'auto');
        return false;
    }

    /* Jika Keranjang Ada */
    $('.cart_list').empty();
    $('#checkout .empty').hide();
    $('#checkout .ready').show();
    $('#cart_widget').addClass('open');
    var cart_subtotal = 0,
        cart_weighttotalcount = 0,
        cart_qtycount = 0;

    for (var i in cart) {
        var item = cart[i];
        if (item.qty == 0) {
            cart.splice(i, 1); /* Hapus Item di Keranjang */
            cart_save(cart);
            cart_show();
            cart_total_update();
            return;
        } else {
            var cart_amount = item.qty * item.price,
                cart_subtotal = cart_subtotal + cart_amount,
                cart_weighttotalcount = cart_weighttotalcount + item.weight * Number(item.qty),
                cart_qtycount = cart_qtycount + Number(item.qty);

            var cart_weight = '',
                cart_weighttotal = '';
            if (item.weight) {
                cart_weight = ' ( ' + format_weight(item.weight) + ' )';
                cart_weighttotal = ' ( ' + format_weight(item.weight * item.qty) + ' )';
            }
            var cart_row =
                '<div class="item" data-id="' + item.id + '" data-index="' + i + '">\
                    <div class="left">\
                        <a href="' + item.url + '"><img class="wrap" src="' + item.img + '"/></a>\
                    </div>\
                    <div class="center">\
                        <div class="wrap">\
                            <a href="' + item.url + '"><b>' + decodeURIComponent(item.name) + '</b></a>\
                            <small>' + (item.price_normal ? '<s>' + format_currency(item.price_normal) + '</s> ' : '') + format_currency(item.price) + '</small>\
                            <input class="cart_note" type="text" value="' + decodeURIComponent(item.note) + '" placeholder="' + config.text['note_add'] + '">\
                        </div>\
                    </div>\
                    <div class="right">\
                        <div class="wrap">\
                            <div class="qty">\
                                <button class="min">-</button>\
                                <input class="cart_qty" type="number" value="' + item.qty + '"></td>\
                                <button class="plus">+</button>\
                            </div>\
                            <b>' + format_currency(cart_amount) + '</b>\
                            ' + (item.weight ? '<br/><small>/ ' + format_weight(item.weight * item.qty) + '</small>' : '') + '\
                        </div>\
                    </div>\
                </div>';
            $('.cart_list').prepend(cart_row);


            var $prod = $('.prod#' + item.id);
            $prod.find('.prod_qty').val(item.qty);
        }
    }
    $('.cart_qtycount').html(cart_qtycount);
    $('.cart_subtotal').html(format_currency(cart_subtotal));
    $('.cart_subtotal').attr('data-price', cart_subtotal);
    if (cart_weighttotalcount) {
        $('.cart_weighttotalcount').html(format_weight(cart_weighttotalcount));
        $('.cart_weighttotalcount').attr('data-weight', cart_weighttotalcount);
        $('.cart_weighttotalcount').closest('tr').show();
    } else {
        $('.cart_weighttotalcount').closest('tr').hide();
    }


    config.checkout.keranjang = cart;

    // console.clear();
    // console.log(config.checkout);

}

function cart_save(cart) {
    /* Simpan Keranjang */
    if (window.localStorage) {
        localStorage.cart = JSON.stringify(cart);
    }
}

function cart_total_update() {
    $('#cart_details').addClass('loading');
    setTimeout(function() {
        $('#cart_details').removeClass('loading');
        var subtotal = Number($('.cart_subtotal').attr('data-price')),
            shippingtotal = Number($('.cart_total_shipping').attr('data-cost')),
            weighttotal = Number($('.cart_weighttotalcount').attr('data-weight'));
        if (shippingtotal > 0) {
            $('#cart_details .cart_total').text(format_currency(subtotal + shippingtotal));
            $('#cart_details .cart_total_shipping').closest('tr').fadeIn();
            $('#cart_details .cart_total').closest('tr').fadeIn();
        } else {
            $('#cart_details .cart_total_shipping').closest('tr').hide();
            $('#cart_details .cart_total').closest('tr').hide();
        }
        $('#cart_details tr:visible').each(function() {
            var title = $('td:first', this).text(),
                amount = $('td:last', this).text(),
                classss = $('td:last', this).attr('class');
        });
    }, 400);
}

function format_currency(number) {
    const formatter = new Intl.NumberFormat(config['language_code'], {
        style: 'currency',
        currency: config['currency_code'],
        minimumFractionDigits: 0
    });
    return formatter.format(number);
}

function format_weight(angka) {
    if (angka <= 0) {
        return "-";
    } else if (angka < 1000) {
        return angka + " Gr";
    } else {
        return angka / 1000 + " Kg";
    }
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