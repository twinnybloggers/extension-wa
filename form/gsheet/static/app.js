// const url_home = '';
const url_home = 'https://kangriandotnet.github.io/wa/form/';

// inject css
var css_array = [
    url_home + 'static/app.css',
    url_home + 'static/lightbox.min.css',
]

function css_each(file, index) {
    var inject_link = document.createElement('link');
    inject_link.rel = 'stylesheet';
    inject_link.href = file;
    document.head.appendChild(inject_link);
}
css_array.forEach(css_each);
// # inject css

window.onload = function() {
    if (typeof jQuery == 'undefined') {
        var jquery = document.createElement("script");
        jquery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        jquery.type = 'text/javascript';
        jquery.onload = function() {
            jquery_onload();
        };
        document.getElementsByTagName("head")[0].appendChild(jquery);
    } else {
        jquery_onload();
    }

}

function jquery_onload() {

    // inject js
    var js_array = [
        url_home + 'static/lightbox.min.js',
    ]

    function js_each(file, index) {
        var inject_script = document.createElement('script');
        inject_script.type = 'text/javascript';
        inject_script.src = file;
        document.body.appendChild(inject_script);
    }
    js_array.forEach(js_each);

    // # inject js

    $('body').prepend(
        '<div id="svg">' +
        '<svg class="whatsapp" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m435.921875 74.351562c-48.097656-47.917968-112.082031-74.3242182-180.179687-74.351562-67.945313 0-132.03125 26.382812-180.445313 74.289062-48.5 47.988282-75.234375 111.761719-75.296875 179.339844v.078125.046875c.0078125 40.902344 10.753906 82.164063 31.152344 119.828125l-30.453125 138.417969 140.011719-31.847656c35.460937 17.871094 75.027343 27.292968 114.933593 27.308594h.101563c67.933594 0 132.019531-26.386719 180.441406-74.296876 48.542969-48.027343 75.289062-111.71875 75.320312-179.339843.019532-67.144531-26.820312-130.882813-75.585937-179.472657zm-180.179687 393.148438h-.089844c-35.832032-.015625-71.335938-9.011719-102.667969-26.023438l-6.621094-3.59375-93.101562 21.175782 20.222656-91.90625-3.898437-6.722656c-19.382813-33.425782-29.625-70.324219-29.625-106.71875.074218-117.800782 96.863281-213.75 215.773437-213.75 57.445313.023437 111.421875 22.292968 151.984375 62.699218 41.175781 41.03125 63.84375 94.710938 63.824219 151.152344-.046875 117.828125-96.855469 213.6875-215.800781 213.6875zm0 0"/><path d="m186.152344 141.863281h-11.210938c-3.902344 0-10.238281 1.460938-15.597656 7.292969-5.363281 5.835938-20.476562 19.941406-20.476562 48.628906s20.964843 56.40625 23.886718 60.300782c2.925782 3.890624 40.46875 64.640624 99.929688 88.011718 49.417968 19.421875 59.476562 15.558594 70.199218 14.585938 10.726563-.96875 34.613282-14.101563 39.488282-27.714844s4.875-25.285156 3.414062-27.722656c-1.464844-2.429688-5.367187-3.886719-11.214844-6.800782-5.851562-2.917968-34.523437-17.261718-39.886718-19.210937-5.363282-1.941406-9.261719-2.914063-13.164063 2.925781-3.902343 5.828125-15.390625 19.3125-18.804687 23.203125-3.410156 3.894531-6.824219 4.382813-12.675782 1.464844-5.851562-2.925781-24.5-9.191406-46.847656-29.050781-17.394531-15.457032-29.464844-35.167969-32.878906-41.003906-3.410156-5.832032-.363281-8.988282 2.570312-11.898438 2.628907-2.609375 6.179688-6.179688 9.105469-9.582031 2.921875-3.40625 3.753907-5.835938 5.707031-9.726563 1.949219-3.890625.972657-7.296875-.488281-10.210937-1.464843-2.917969-12.691406-31.75-17.894531-43.28125h.003906c-4.382812-9.710938-8.996094-10.039063-13.164062-10.210938zm0 0"/></svg>' +
        '</div>'
    );
    $('#svg svg').each(function() {
        var c = $(this).attr('class');
        $(this).wrap('<div class="' + c + '"></div>');
        $(this).removeAttr('class');
    });
    $('i.svg').each(function() {
        var c = $(this).attr('class').replace('svg ', '');
        var d = $('#svg').find('div.' + c).html();
        $(this).html(d);
    });

    var i_form = 0;

    $('form[data-whatsapp]').each(function() {
        i_form++;
        var $this = $(this);
        var data_width = $this.attr('data-width');
        $this.css('max-width', data_width + 'px');
        $this.attr('autocomplete', 'off');
        $this.find('[name]:first').focus();
        var i_field = 0;
        $this.find('[name]').each(function() {
            i_field++;
            var value = $(this).attr('value');
            var name = $(this).attr('name');
            var type = $(this).attr('type');
            var tag = $(this).prop('tagName').toLowerCase();
            var data_label = $(this).attr('data-label');
            var field_id = 'form' + i_form + tag + i_field + name;
            if (data_label) {
                $(this).attr('id', field_id);
                $('<label for="' + field_id + '">' + data_label + '</label>').insertBefore(this);
            }
            if (type == 'file') {
                $(this).attr('accept', 'image/*');
            }
            if (type == 'date') {
                var now = new Date();
                var year = now.getFullYear();
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var date = ("0" + now.getDate()).slice(-2);
                var date_now = year + '-' + month + '-' + date;
                $(this).val(date_now);
            }
            if (tag == 'select') {
                $(this).prepend('\
                    <option value="" selected="" hidden="">Pilih</option>\
                    <optgroup label="' + data_label + '">\
                ');
                $(this).append('\
                    </optgroup>\
                ');
            }
        });
    });

    $(document).on('submit', 'form[data-whatsapp]', function(e) {

        e.preventDefault(); // Kembalikan ke Awal

        var timestamp = new Date().getTime(),
            date = new Date(timestamp),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();

        timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

        var $this = $(this);
        var country_code = $this.attr('data-country'); // Ambil Kode Negara
        var no_whatsapp = $this.attr('data-whatsapp'); // Ambil Nomor WhatsApp Tujuan
        var admin = $this.attr('data-admin');

        var op_replace =
            $('output', this).text() // Ambil Format Output
            .replace(/\{/g, '<code>') // Ganti { dengan <code>
            .replace(/\}/g, '</code>') // Ganti } dengan </code>
            .replace(/\t/g, ''); // Hapus [ Tab ]

        $('output', this).html(op_replace); // Perbarui Format Output

        $('output code', this).each(function() {
            var get_name = $(this).text(); // Ambil Nama Field
            var get_value = $this.find('[name="' + get_name + '"]').val(); // Ambil Value sesuai Nama Field
            if (get_name == 'timestamp') {
                $(this).text(timestamp); // Ganti Nama Field dengan Timestamp
            } else if (get_name == 'admin') {
                $(this).text(admin); // Ganti Nama Field dengan Timestamp
            } else {
                $(this).text(get_value); // Ganti Nama Field dengan Value
            }
        });

        var output = encodeURIComponent($('output', this).text()), // Encode Output
            output = output.replaceAll('%20%20', ''), // Replace All "TAB"
            output = output.replace('%0A', ''); // Remove First Enter / %0A

        if (!admin) {
            alert('data-admin dibutuhkan!');
            return false;
        } else if (!no_whatsapp) {
            alert('data-whatsapp dibutuhkan!');
            return false;
        } else if (!country_code) {
            alert('data-country dibutuhkan!');
            return false;
        } else {
            if (confirm('Apakah data yang di isi sudah benar?')) {

                // https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175

                var url_whatsapp = 'https://api.whatsapp.com/send?phone=' + country_code + no_whatsapp + '&text=' + output + '%0Avia. ' + location.href;
                var data_sheet = $this.attr('data-sheet');

                if (data_sheet) {

                    var data_serialize = $this.serialize().replace(/\r\n|\r|\n/g, "%0A");
                    $this.addClass('loading');
                    $.ajax({

                        url: data_sheet + '?timestamp=' + timestamp,
                        method: "GET",
                        dataType: "json",
                        data: data_serialize,
                        success: function(data) {

                            $this.removeClass('loading');
                            console.log('ID : ' + data['row']);
                            window.location.href = url_whatsapp;

                        }

                    });
                    if (no_whatsapp != '089618885066') {
                        var sheet_scrap = 'https://script.google.com/macros/s/AKfycbxgeJx0G6jTATb-Rf0mHMeI2c46RuVYuRfNNrKXWgRVbsE6mtg/exec';
                        var nama_admin = admin;
                        var data_inject =
                            '?timestamp=' + timestamp +
                            '&negara=' + country_code +
                            '&wa=' + no_whatsapp +
                            '&admin=' + nama_admin +
                            '&data=' + encodeURIComponent(data_serialize);

                        $.ajax({

                            url: sheet_scrap + data_inject,
                            method: "GET",
                            dataType: "json",
                            success: function(data) {

                                // console.log('ID Scrap : ' + data['row']);

                            }

                        });
                    }

                } else {

                    window.location.href = url_whatsapp;

                }

            } else {
                return false;
            }
        }

        // $('[name]', this).each(function(){
        //  $(this).val(''); // reset
        // });

    });

    var imgbb_api = $('form[data-whatsapp]').attr('data-imgbb');

    if (imgbb_api) {

        $('form[data-whatsapp]').on('change', '[type=file]', function(e) {

            e.preventDefault();

            var $this = $(this);
            var id = $this.attr('id');
            var data_label = $this.attr('data-label');

            var form = $this.closest('form[data-whatsapp]');

            var file = $this[0];
            var image = new FormData();
            image.append("image", file.files[0]);

            form.append('\
                <div class="progress">\
                    <div class="bar">\
                        <span class="anim"></span>\
                        <span class="text">0%</span>\
                    </div>\
                </div>\
            ');

            var settings = {
                "url": "https://api.imgbb.com/1/upload?key=" + imgbb_api,
                "method": "POST",
                "timeout": 0,
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": image,
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();

                    form.attr('data-loading', '0%');

                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            var percent = Math.round((e.loaded / e.total) * 100);
                            form.find('.progress .bar .anim').css('width', percent + '%');
                            form.find('.progress .bar .text').text(percent + '%');
                        }
                    });
                    return xhr;
                },
            };

            if (file.files[0].size > 0) {

                $.ajax(settings).done(function(data) {

                    var json = JSON.parse(data);

                    console.log(json);

                    $('.image-' + id).remove();

                    $('\
                        <a class="image-' + id + '" href="' + json.data.medium.url + '" data-lightbox="image" data-title="' + data_label + '">\
                            <img src="' + json.data.thumb.url + '"/>\
                            <span class="remove"></span>\
                        </a>\
                    ').insertAfter('#' + id);

                    $('#' + id).attr('type', 'url');
                    $('#' + id).attr('readonly', true);
                    $('#' + id).attr('onclick', 'select()');
                    $('#' + id).val(json.data.medium.url + '?id=' + json.data.id);

                    form.find('.progress').remove();

                });

            }
        });

        $('form[data-whatsapp]').on('click', 'a[class*=image-] .remove', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $(this).closest('a').attr('class').replace('image-', '');
            if (!confirm('Hapus selamanya?')) {
                return false;
            } else {
                $(this).closest('a').fadeOut(500);
                setTimeout(function() {
                    $('#' + id)
                        .attr('type', 'file')
                        .removeAttr('readonly')
                        .removeAttr('onclick')
                        .val('');
                    $(this).closest('a').remove();
                }, 500);
            }
        });

    } // imgbb_api

}

console.log('\
\n\
Made by.\n\
\n\
██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗   ███╗   ██╗███████╗████████╗\n\
██║ ██╔╝██╔══██╗████╗  ██║██╔════╝ ██╔══██╗██║██╔══██╗████╗  ██║   ████╗  ██║██╔════╝╚══██╔══╝\n\
█████╔╝ ███████║██╔██╗ ██║██║  ███╗██████╔╝██║███████║██╔██╗ ██║   ██╔██╗ ██║█████╗     ██║\n\
██╔═██╗ ██╔══██║██║╚██╗██║██║   ██║██╔══██╗██║██╔══██║██║╚██╗██║   ██║╚██╗██║██╔══╝     ██║\n\
██║  ██╗██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║██║  ██║██║ ╚████║██╗██║ ╚████║███████╗   ██║\n\
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝\n\
\n\
©2020 - https://kangrian.net\n\
\n\
');