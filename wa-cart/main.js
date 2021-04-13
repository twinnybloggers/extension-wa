if (typeof jQuery == 'undefined') {
    var jquery_library = document.createElement('script');
    jquery_library.src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
    jquery_library.type = 'text/javascript';
    jquery_library.async = 'true';
    document.head.appendChild(jquery_library);
    jquery_library.onload = function() {
        main_js();
    };
} else {
    main_js();
}

function main_js() {

    $(document).ready(function() {
        var campur_js = document.createElement('script');
        campur_js.type = 'text/javascript';
        campur_js.src = 'https://kangrian.net/dev/wa-cart/campur.js';
        document.head.appendChild(campur_js);
        campur_js.onload = function() {
            campur();
        };
    });
}