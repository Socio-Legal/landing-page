import { addCollection, type IconifyJSON } from "@iconify/react";

import COLECCIONES from "@/lib/iconos.json";

/**
 * Los iconos de Iconify que usa la web, incluidos en el bundle (9 KB). Sin
 * esto, <Icon> los pedía en cada página a api.iconify.design: tres peticiones
 * de alta prioridad (67 KB, sobre todo las banderas emojione-v1) que
 * competían con la carga de la página (Lighthouse, nov-2026).
 *
 * Para añadir uno: incorpora sus datos de https://api.iconify.design/<set>.json?icons=<nombre>
 * a lib/iconos.json y regístralo aquí importando este módulo.
 */
for (const coleccion of COLECCIONES as unknown as IconifyJSON[]) addCollection(coleccion);

