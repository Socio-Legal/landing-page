let footer = $(document.currentScript);
let footerRoot = footer.attr('data-footerRoot');
if (footerRoot === undefined) {
    footerRoot = './';
}

let appFooter = `
    <div class="container">
        <div class="row g-3 align-items-center justify-content-md-between py-4 py-md-5">
            <div class="col-md-3">
                <div class="footer-logo">
                    <a href="${footerRoot}index.html" class="logo-link">
                        <img class="logo-light logo-img" src="${footerRoot}images/logo.png" srcset="${footerRoot}images/logo2x.png 2x" alt="logo">
                        <img class="logo-dark logo-img" src="${footerRoot}images/logo-dark.png" srcset="${footerRoot}images/logo-dark2x.png 2x" alt="logo-dark">
                    </a>
                </div><!-- .footer-logo -->
            </div><!-- .col -->
            <div class="col-md-9 d-flex justify-content-md-end">
                <ul class="link-inline gx-4">
                    <li><a href="${footerRoot}index.html#feature">¿Cómo funciona?</a></li>
                    <li><a href="${footerRoot}index.html#service">Servicio</a></li>
                    <li><a href="https://ayuda.sttok.com">Ayuda y soporte</a></li>
                    <li><a id="sbContact" class="contactUs" href="javascript:void(0);" onclick="window.Beacon('open')">Contactar</a></li>
                    <li><a href="${footerRoot}faq/faq.html">FAQ</a></li>
                </ul><!-- .footer-nav -->
            </div><!-- .col -->
        </div>
        <hr class="hr border-light mb-0 mt-n1">
        <div class="row g-3 align-items-center justify-content-md-between py-4">
                <div class="text-base">Copyright © Sttok - Todos los derechos reservados | <a href="${footerRoot}aviso-legal.html">Aviso legal y CGC</a> | <a href="${footerRoot}privacidad.html">Privacidad y Cookies</a></div>
            <div class="col-md-8">
            </div><!-- .col -->
        </div><!-- .row -->
    </div><!-- .container -->
`;

document.getElementById('appFooter').innerHTML = appFooter;