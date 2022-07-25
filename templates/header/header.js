let header = $(document.currentScript);
let page = header.attr('data-page');
if (page === undefined) {
    page = 'index.html';
}

let appHeader = `
    <div class="header-main header-main-s1 is-sticky is-transparent">
        <div class="container header-container">
            <div class="header-wrap">
                <div class="header-logo">
                    <a href="../../index.html" class="logo-link">
                        <img class="logo-light logo-img" src="../../images/logo.png" srcset="../../images/logo2x.png 2x" alt="Logo Sttok">
                        <img class="logo-dark logo-img" src="../../images/logo-dark.png" srcset="../../images/logo-dark2x.png 2x" alt="Sttok Logo">
                    </a>
                </div>
                <div class="header-toggle">
                    <button class="menu-toggler" data-target="mainNav">
                        <em class="menu-on icon ni ni-menu"></em>
                        <em class="menu-off icon ni ni-cross"></em>
                    </button>
                </div>
                <nav class="header-menu" data-content="mainNav">
                    <ul class="menu-list ml-lg-auto">
                        <li class="menu-item"><a href="${page}#service" onclick="openMenuLink(location.pathname, '${page}', '#service')" class="menu-link nav-link">Servicio</a></li>
                        <li class="menu-item"><a href="${page}#feature" onclick="openMenuLink(location.pathname, '${page}', '#feature')" class="menu-link nav-link">Funcionalidades</a></li>
                        <li class="menu-item"><a href="${page}#users" onclick="openMenuLink(location.pathname, '${page}', '#users')" class="menu-link nav-link">¿Quién nos utiliza?</a></li>
                        <li class="menu-item"><a href="${page}#pricing" onclick="openMenuLink(location.pathname, '${page}', '#pricing')" class="menu-link nav-link">Precios</a></li>
                        <li class="menu-item has-sub">
                            <a href="#" class="menu-link menu-toggle">Partners</a>
                            <div class="menu-sub">
                                <ul class="menu-list">
                                    <li class="menu-item has-sub">
                                        <a href="/partners/abogados.html" class="menu-link">Abogados</a>
                                    </li>
                                    <li class="menu-item has-sub">
                                        <a href="/partners/inversores.html" class="menu-link">Fondos/Inversores</a>
                                    </li>
                                    <li class="menu-item has-sub">
                                        <a href="/partners/aceleradoras.html" class="menu-link">Venture builders</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item faqMenuItem">
                            <a a href="../faq/faq.html" class="menu-link nav-link">FAQ</a>
                        </li>
                    </ul>
                    <ul class="menu-btns">
                        <li>
                            <a href="https://app.sttok.com/" target="_blank" class="btn btn-primary btn-lg">Acceder ahora</a>
                        </li>
                    </ul>
                </nav><!-- .nk-nav-menu -->
            </div><!-- .header-wrap-->
        </div><!-- .container-->
    </div><!-- .header-main-->
`;

document.getElementById('appHeader').innerHTML = appHeader;