/*

    “ Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia ” ( HR. Ahmad )

    “ Daripada pusing baca Script dibawah ini, mending fokus belajar / ngulik..
    Biar bisa bermanfaat buat orang lain! :] ”

    -- KangRian.NET

*/

var require_css = [
    'chatwa.css',
];

for (var i in require_css) {

    var url_file = require_css[i];
    var script = document.createElement('link');
    script.rel = 'stylesheet';
    script.type = 'text/css';
    script.href = url_file;

    document.head.appendChild(script);

}

// Encrypt RC4 / Obfuscate
window.onload = function() {

    if (typeof jQuery == 'undefined') {
        var jquery_library = document.createElement('script');
        jquery_library.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        jquery_library.type = 'text/javascript';
        jquery_library.defer = 'true';
        jquery_library.async = 'true';
        jquery_library.onload = function() {
            jquery();
        };
        document.head.appendChild(jquery_library);
    } else {
        jquery();
    }

}

function jquery() {

    var cw = $('#chat-wa');
    var cw_output = $('output', cw).text();
    var cw_translate = cw.attr('data-wa-translate').split('|');
    var cw_hello = cw.attr('data-wa-hello');
    var cw_hello_delay = parseInt(cw.attr('data-wa-hello-delay'));
    var cw_intro = cw.attr('data-wa-intro');
    var cw_intro_delay = parseInt(cw.attr('data-wa-intro-delay'));
    var cw_country = parseInt(cw.attr('data-wa-country'));
    var cw_number = parseInt(cw.attr('data-wa-number'));
    var cw_name = cw.attr('data-wa-name');
    var cw_status = cw.attr('data-wa-status');
    var cw_avatar = cw.attr('data-wa-avatar');
    var cw_position = cw.attr('data-wa-position');
    var cw_opengraph = cw.attr('data-wa-opengraph');
    var cw_profile_website = cw.attr('data-wa-profile-website');
    var cw_profile_facebook = cw.attr('data-wa-profile-facebook');
    var cw_profile_instagram = cw.attr('data-wa-profile-instagram');
    var cw_profile_twitter = cw.attr('data-wa-profile-twitter');

    if (cw_opengraph === 'yes') {
        var cw_og_title = $('head title').text();
        var cw_og_desc = $('head [name="description"]').attr('content');
        var cw_og_img = $('head [rel="image_src"]').attr('href');
        var cw_og_url = window.location.origin + window.location.pathname;

        if (cw_og_img) {
            cw_og_img = '<div class="cw-og-img" style="background-image:url(' + cw_og_img + ')"></div>';
        } else {
            cw_og_img = '';
        }

        cw_opengraph = '\
                <div class="cw-og">\
                    ' + cw_og_img + '\
                    <div class="cw-og-info" title="' + cw_og_desc + '">\
                        <div class="cw-og-title">' + cw_og_title + '</div>\
                        <div class="cw-og-url">' + cw_og_url + '</div>\
                    </div>\
                </div>\
            ';
    } else {
        cw_opengraph = '';
    }

    var datetime = new Date();
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();

    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var cw_stamp = hours + ":" + minutes;

    var cw_html5 = '\
        <!-- CIEEE......... CALON PLAGIAT LAGI INSPECT WIDGET ANE! :V - BELAJAR YANG RAJINNNNN.. JANGAN CUMA NGINTIP².. KAYA YANG "GAK MAMPU" BIKIN AJA!! WKWKWKWK -->\
        <audio style="display:none;" class="cw-audio" controls preload="metadata" volume="1.0">\
            <source src="../_lib/mp3/whatsapp.mp3">\
        </audio>\
        <div class="cw-btn">\
            <div class="cw-btn-avatar" style="background-image:url(' + cw_avatar + ');"></div>\
            <div class="cw-btn-hello">\
                ' + cw_hello + '\
            </div>\
        </div>\
        <div class="cw-box">\
            <div class="cw-lightbox">\
                <div class="cw-lightbox-overlay"></div>\
                <div class="cw-lightbox-wrap">\
                    <div class="cw-lightbox-avatar" style="background-image:url(' + cw_avatar + ');"></div>\
                    <div class="cw-lightbox-link">\
                        <a href="' + (cw_profile_website ? cw_profile_website : 'https://website.com') + '" title="Website" rel="nofollow" target="_blank" class="website">website</a>\
                        <a href="' + (cw_profile_instagram ? cw_profile_instagram : 'https://instagram.com') + '" title="Instagram" rel="nofollow" target="_blank" class="instagram">instagram</a>\
                        <a href="' + (cw_profile_facebook ? cw_profile_facebook : 'https://facebook.com') + '" title="Facebook" rel="nofollow" target="_blank" class="facebook">facebook</a>\
                        <a href="' + (cw_profile_twitter ? cw_profile_twitter : 'https://twitter.com') + '" title="Twitter" rel="nofollow" target="_blank" class="twitter">twitter</a>\
                    </div>\
                </div>\
            </div>\
            <div class="cw-header">\
                <div class="cw-avatar">\
                    <img src="' + cw_avatar + '" title="' + cw_name + '"/>\
                    <div class="cw-indicator" title="Online"></div>\
                </div>\
                <div class="cw-info">\
                    <div class="cw-profile">\
                        <div class="cw-name">\
                            ' + cw_name + '\
                        </div>\
                        <div class="cw-status">\
                            ' + cw_status + '\
                        </div>\
                    </div>\
                </div>\
                <div class="cw-close"></div>\
            </div>\
            <div class="cw-hello">\
                <div class="cw-mimin">\
                    ' + cw_intro + '\
                    <small>' + cw_stamp + '</small>\
                </div>\
                <!-- <br/>\
                <div class="cw-reply">\
                    ' + cw_intro + '\
                    <small>' + cw_stamp + '</small>\
                </div> -->\
            </div>\
            <form class="cw-form-text" autocomplete="off">\
                <input type="text" name="text" placeholder="' + cw_translate[0] + '" required>\
                <button class="cw-send"></button>\
                ' + cw_opengraph + '\
            </form>\
            <form class="cw-form-user" autocomplete="off">\
                <div class="cw-user-wrap">\
                    <input type="hidden" name="text">\
                    <input type="hidden" name="phone" value="' + cw_country + cw_number + '">\
                    <div class="cw-user-title">' + cw_translate[1] + ' :</div>\
                    <input tabindex="1" type="text" name="name" placeholder="' + cw_translate[2] + '" value="' + (localStorage.getItem('cw_name') ? localStorage.getItem('cw_name') : '') + '" required>\
                    <div class="cw-tel">\
                        <input tabindex="3" type="text" name="country" placeholder="+' + cw_country + '" value="+' + cw_country + '" required>\
                        <input tabindex="2" type="tel" name="whatsapp" placeholder="' + cw_translate[3] + '" value="' + (localStorage.getItem('cw_whatsapp') ? localStorage.getItem('cw_whatsapp') : '') + '" required>\
                    </div>\
                    <button class="cw-submit"><b>' + cw_translate[4] + '</b></button>\
                    <center class="cw-back">' + cw_translate[5] + ' <span>' + cw_translate[6] + '</span></center>\
                </div>\
            </form>\
        </div>\
        <!-- CIEEE......... CALON PLAGIAT LAGI INSPECT WIDGET ANE! :V - BELAJAR YANG RAJINNNNN.. JANGAN CUMA NGINTIP².. KAYA YANG "GAK MAMPU" BIKIN AJA!! WKWKWKWK -->\
    ';

    cw.html(cw_html5);

    $('#chat-wa').addClass(cw_position);
    setTimeout(function() {
        $('#chat-wa').addClass('load');
    }, 1);

    if (!sessionStorage.getItem('cw_hello')) {
        setTimeout(function() {
            $('.cw-btn', cw).addClass('hello');
        }, cw_hello_delay);
        sessionStorage.setItem('cw_hello', 1);
    }
    if (sessionStorage.getItem('cw_open')) {
        $('.cw-mimin', cw).addClass('open');
        $('.cw-mimin small', cw).text(sessionStorage.getItem('cw_stamp'));
    }

    $('.cw-btn, .cw-box', cw).click(function(e) {
        e.stopPropagation();
    });

    $('.cw-btn', cw).click(function(e) {

        if (!sessionStorage.getItem('cw_open')) {
            setTimeout(function() {
                $('.cw-mimin', cw).html('<span style="font-size:80%;"><b>' + cw_name + '</b> ' + cw_translate[7] + '</span>');
                $('.cw-mimin', cw).addClass('open');
                setTimeout(function() {
                    $('.cw-mimin', cw).removeClass('hello');
                    setTimeout(function() {

                        $('.cw-audio')[0].play();
                        var title = $('head title').text();
                        $('head title').text('💬 1 - ' + title);
                        setTimeout(function() {
                            $('head title').text(title);
                        }, 4000);
                        setTimeout(function() {
                            $('.cw-mimin', cw).html(cw_intro);

                            if (!sessionStorage.getItem('cw_open')) {
                                $('.cw-mimin', cw).append('<small>' + cw_stamp + '</small>');
                                sessionStorage.setItem('cw_stamp', cw_stamp);
                            }
                            $('.cw-mimin', cw).addClass('open');
                            sessionStorage.setItem('cw_open', 1);
                        }, 500);
                    }, 500);
                }, cw_intro_delay);
            }, 2000);
        } else {

        }

        cw.addClass('open');

        setTimeout(function() {
            $('.cw-form-text [name=text]', cw).focus();
        }, 100);
    });

    $('.cw-avatar, .cw-info', cw).click(function() {
        $('.cw-lightbox', cw).addClass('open');
    });

    $('.cw-lightbox-overlay', cw).click(function() {
        $('.cw-lightbox', cw).removeClass('open');
    });

    $('.cw-close', cw).click(function() {
        cw.removeClass('open');
        $('.cw-form-user', cw).removeClass('open');
        $('.cw-btn', cw).removeClass('hello');
    });

    $(window).click(function() {
        cw.removeClass('open');
        $('.cw-form-user', cw).removeClass('open');
        $('.cw-btn', cw).removeClass('hello');
    });

    $(document).on('keydown', function(e) {

        var code = (e.keyCode || e.which);
        var left = 37;
        var up = 38;
        var right = 39;
        var down = 40;
        var enter = 13;
        var tab = 9;
        var esc = 27;

        if (code == esc) {
            $(cw).removeClass('open');
            $('.cw-form-user', cw).removeClass('open');
        }

    });

    $('.cw-form-text', cw).on('submit', function(e) {
        e.preventDefault();
        var val = $('[name=text]', this).val();
        if (val.length) {
            $('.cw-form-user [name=text]', cw).val(val);
            if (
                localStorage.getItem('cw_name') &&
                localStorage.getItem('cw_country') &&
                localStorage.getItem('cw_whatsapp') &&
                $('[name=name]', cw).val() &&
                $('[name=country]', cw).val() &&
                $('[name=whatsapp]', cw).val()
            ) {
                $('.cw-form-user').trigger('submit');
            } else {
                $('.cw-form-user', cw).addClass('open');
                setTimeout(function() {
                    $('.cw-form-user .cw-submit', cw).trigger('click');
                }, 100);
            }
        }
    });

    $('.cw-form-user [name=name]', cw).on('input', function() {
        var str = $(this).val();
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        str = str.join(' ');
        $(this).val(str);
    });
    $('.cw-form-user [name=whatsapp]', cw).on('keyup', function() {

        var input = $(this);
        var text = input.val().replace(/[^0-9\s]/g, "");

        text = text.replace(' ', '');

        input.val(text);

    });
    $('.cw-form-user', cw).on('submit', function(e) {
        e.preventDefault();
        var text = $('.cw-form-user [name=text]', cw);
        var name = $('.cw-form-user [name=name]', cw);
        var whatsapp = $('.cw-form-user [name=whatsapp]', cw);
        var country = $('.cw-form-user [name=country]', cw);
        if (!confirm(cw_translate[1] + ' ' + name.val() + ' ( +' + parseInt(country.val()) + ' ' + parseInt(whatsapp.val()) + ' ) ?')) {
            $('.cw-form-user', cw).addClass('open');
            setTimeout(function() {
                name.focus();
            }, 100);
            return false;
        } else {
            localStorage.setItem('cw_name', name.val());
            localStorage.setItem('cw_country', parseInt(country.val()));
            localStorage.setItem('cw_whatsapp', whatsapp.val());

            // window.open( + text.val() + '%0A%0A' + name.val() + ' ( ' +  + ' )');

            cw_output = cw_output
                .replaceAll('  ', '')
                .replace('\n', '')
                .replace('[admin]', '*' + cw_name + '*')
                .replace('[name]', '*' + name.val() + '*')
                .replace('[message]', text.val())
                .replace('[whatsapp]', '*+' + parseInt(country.val()) + parseInt(whatsapp.val()) + '*')
                .replace('[url]', window.location.origin + window.location.pathname);

            var encode_cw_output = encodeURIComponent(cw_output);

            var open_url = 'https://api.whatsapp.com/send?phone=' + cw_country + cw_number + '&text=' + encode_cw_output;

            var w = 960;
            var h = 540;

            var left = Number((screen.width / 2) - (w / 2)),
                tops = Number((screen.height / 2) - (h / 2)),
                popupWindow = window.open(open_url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);

            popupWindow.focus();
        }
    });

    $('.cw-form-user .cw-back span', cw).on('click', function() {
        $('.cw-form-user', cw).removeClass('open');
        $('.cw-form-text [name=text]', cw).focus();
    });

}