/**
 * Catálogo completo de funcionalidades de Sttok, para /funcionalidades.
 *
 * Orden: los módulos y, dentro de cada uno, las funcionalidades, de más a
 * menos importante para una sociedad con muchos socios o un grupo. `href`
 * apunta a la ficha propia de la funcionalidad cuando existe.
 */
export type Funcionalidad = {
  titulo: string;
  descripcion: string;
  href?: string;
};

export type Modulo = {
  id: string;
  titulo: string;
  resumen: string;
  /** Página del módulo, si la tiene. */
  href?: string;
  /** Nota corta junto al módulo, p. ej. si tiene coste adicional. */
  nota?: string;
  funcionalidades: Funcionalidad[];
};

const F = "/funcionalidades";

export const CATALOGO: Modulo[] = [
  {
    id: "socios",
    titulo: "Socios y libro registro",
    resumen: "El registro oficial de quién es socio, con qué y desde cuándo.",
    href: "/libro-de-socios",
    funcionalidades: [
      { titulo: "Libro de socios oficial", descripcion: "Libro registro de socios o de acciones nominativas, exportable en formato legalizable." },
      { titulo: "Numeración por rangos", descripcion: "Cada participación o acción con su número. Las transmisiones se anotan sobre rangos concretos." },
      { titulo: "Transmisiones", descripcion: "Compraventa, herencia, donación, endoso, split, renumeración, reclasificación y canje de títulos." },
      { titulo: "Ampliaciones y reducciones de capital", descripcion: "Cada operación con su escritura, sus nuevos rangos y su efecto en el capital." },
      { titulo: "Cargas sobre participaciones", descripcion: "Prenda, usufructo y nuda propiedad, cotitularidad y opción, como posiciones separadas." },
      { titulo: "Certificados de titularidad y de valor", descripcion: "Titularidad, valor, IRPF y patrimonio, generados desde el libro con los datos del día.", href: `${F}/certificados-de-titularidad-y-valor` },
      { titulo: "Lectura de escrituras con IA", descripcion: "Alta de operaciones y del histórico de una sociedad a partir de sus escrituras.", href: `${F}/lectura-de-escrituras-con-ia` },
      { titulo: "Ficha del socio", descripcion: "Posición, derechos de voto, cargas, transacciones, documentos y notas de cada socio." },
      { titulo: "Clases de acciones", descripcion: "Clases y tramos con su numeración y sus derechos." },
      { titulo: "Reparto de dividendos", descripcion: "Cada reparto registrado por socio, con sus retenciones." },
      { titulo: "Categorías de socios", descripcion: "Las que se derivan de las cargas y etiquetas libres para agrupar socios." },
      { titulo: "Representantes", descripcion: "Quién representa a cada socio persona jurídica o a cada cotitularidad." },
      { titulo: "Autocartera", descripcion: "Las acciones propias de la sociedad, separadas del capital con voto." },
      { titulo: "Acreedores y notas convertibles", descripcion: "Cada nota convertible con la ficha de su acreedor." },
      { titulo: "Portal del accionista", descripcion: "Cada socio entra con su usuario y ve su posición, sus certificados y sus juntas.", href: `${F}/portal-del-accionista` },
      { titulo: "Equity Story", descripcion: "La evolución del capital de la sociedad contada operación a operación." },
    ],
  },
  {
    id: "juntas",
    titulo: "Junta general",
    resumen: "La junta de socios o de accionistas, de la convocatoria al acta certificada.",
    href: "/juntas-consejos",
    funcionalidades: [
      { titulo: "Preparar la junta", descripcion: "Orden del día, documentación y plazos, en un recorrido de cinco pasos." },
      { titulo: "Convocatoria", descripcion: "Vista previa, envío a cada socio y recordatorios antes de la fecha." },
      { titulo: "Asistencia y quórum", descripcion: "Quién asiste, quién delega y quién falta, con el quórum calculado en todo momento." },
      { titulo: "Delegación de voto con firma", descripcion: "El socio elige representante e instrucciones y firma la delegación.", href: `${F}/voto-electronico-en-juntas` },
      { titulo: "Voto anticipado", descripcion: "El socio vota cada punto antes de la junta y puede cambiarlo hasta el cierre del plazo.", href: `${F}/voto-electronico-en-juntas` },
      { titulo: "Votación en vivo", descripcion: "Se abre y se cierra la votación de cada punto durante la sesión.", href: `${F}/voto-electronico-en-juntas` },
      { titulo: "Mayorías y derecho de separación", descripcion: "Las mayorías reforzadas se derivan de cada punto, y se avisa del derecho de separación." },
      { titulo: "Proyección en la sala", descripcion: "El resultado de cada votación, en pantalla para los asistentes." },
      { titulo: "Acta automática", descripcion: "El acta se compone con la asistencia y los resultados. También admite acta notarial." },
      { titulo: "Certificación de acuerdos", descripcion: "El certificado de cada acuerdo, preparado para firmar." },
      { titulo: "Juntas presenciales, telemáticas o híbridas", descripcion: "La videollamada la pone la sociedad con su herramienta; Sttok lleva todo lo demás." },
      { titulo: "Vista del socio", descripcion: "Cada socio ve su convocatoria, delega o vota desde su acceso.", href: `${F}/portal-del-accionista` },
    ],
  },
  {
    id: "consejo",
    titulo: "Consejo y cargos",
    resumen: "El órgano de administración, sus reuniones y quién puede firmar en nombre de la sociedad.",
    href: "/soluciones/secretaria-del-consejo",
    funcionalidades: [
      { titulo: "Órgano de administración", descripcion: "Consejo de administración, administrador único o administradores, con su composición." },
      { titulo: "Convocar el consejo", descripcion: "Fecha, orden del día, convocados y revisión, con envío opcional por correo y cita de calendario.", href: `${F}/consejo-de-administracion` },
      { titulo: "Orden del día", descripcion: "Cada punto para debatir o para acordar, con ponente, tiempo y documentación." },
      { titulo: "Calendario del consejo", descripcion: "Las reuniones del año reservadas, con la respuesta de cada consejero." },
      { titulo: "Acta y certificación", descripcion: "El acta del consejo y el certificado de cada acuerdo." },
      { titulo: "Consejo por escrito y sin sesión", descripcion: "Acuerdos adoptados por escrito, sin reunión." },
      { titulo: "Vista del consejero", descripcion: "Cada consejero ve sus convocatorias y la documentación de cada reunión." },
      { titulo: "Cargos con vigencia", descripcion: "Consejeros, presidente y secretario con su fecha de nombramiento y de caducidad." },
      { titulo: "Apoderados y poderes", descripcion: "Cada poder con su alcance, su cuantía y su inscripción." },
      { titulo: "Comités", descripcion: "Comisiones del consejo con su composición y sus reuniones." },
      { titulo: "Auditores", descripcion: "El auditor de cada ejercicio, con su nombramiento." },
      { titulo: "Elección de consejeros", descripcion: "Compromisos de apoyo sobre acciones numeradas y cartas de apoyo firmadas." },
    ],
  },
  {
    id: "grupos",
    titulo: "Grupos de sociedades",
    resumen: "Todas las sociedades del grupo y quién controla cada una.",
    href: "/soluciones/grupos-de-sociedades",
    funcionalidades: [
      { titulo: "Todas las sociedades en una portada", descripcion: "Lo pendiente de cada sociedad del grupo, ordenado por plazo." },
      { titulo: "Diagrama del grupo", descripcion: "Participadas y cadena de control a cualquier fecha.", href: `${F}/diagrama-del-grupo` },
      { titulo: "Titular real", descripcion: "Quién supera el 25 % del capital o de los votos al final de la cadena.", href: `${F}/titular-real` },
      { titulo: "Participadas", descripcion: "Cada participada por relación, nivel y país, en tarjetas o en tabla." },
      { titulo: "Comparar fechas", descripcion: "Qué ha cambiado en el grupo entre dos cierres." },
      { titulo: "Sociedades que son socias de otras", descripcion: "Una sociedad del grupo puede figurar como socia de otra, con su posición." },
      { titulo: "Trabajos en varias sociedades", descripcion: "Consejos, formulación de cuentas, libros, juntas y depósitos lanzados para varias sociedades a la vez." },
      { titulo: "Permisos por sociedad", descripcion: "Cada persona ve y gestiona solo las sociedades que le corresponden." },
      { titulo: "Colecciones de sociedades", descripcion: "Grupos de sociedades guardados y compartidos para trabajar con ellos." },
      { titulo: "Cuentas depositadas", descripcion: "Petición de las cuentas depositadas en el Registro Mercantil, con coste por sociedad." },
    ],
  },
  {
    id: "documentos",
    titulo: "Documentos, firma y comunicaciones",
    resumen: "Lo que se firma y se envía, guardado por sociedad.",
    funcionalidades: [
      { titulo: "Libros de actas", descripcion: "Un libro por órgano y ejercicio, con su legalización.", href: `${F}/libro-de-actas` },
      { titulo: "Firma electrónica", descripcion: "Sobres de firma con recordatorios, reenvío y plazos. Incluida en los planes Avanzado y Pro." },
      { titulo: "Comunicaciones certificadas", descripcion: "Cada convocatoria y cada aviso, con su estado y su certificado de envío." },
      { titulo: "Repositorio de documentos", descripcion: "Todo lo que generan los módulos, por sociedad y por carpetas." },
      { titulo: "Documentos por aportar", descripcion: "Lo que falta para completar el expediente de cada operación." },
      { titulo: "Legalización del libro registro", descripcion: "Un asistente para preparar el libro y presentarlo en el Registro Mercantil." },
      { titulo: "Reglas de la sociedad", descripcion: "Estatutos y pactos ordenados por tema, con la mayoría que exige cada acuerdo." },
      { titulo: "Calendario societario", descripcion: "Las obligaciones de cada sociedad con su fecha, derivadas de la ley y los estatutos." },
      { titulo: "Sttok AI", descripcion: "Preguntas sobre el registro en lenguaje natural, con la fuente enlazada en cada respuesta." },
      { titulo: "Remitente propio", descripcion: "Las comunicaciones salen con la firma de correo y el logo de la sociedad." },
    ],
  },
  {
    id: "incentivos",
    titulo: "Planes de incentivos",
    resumen: "Los planes de empleados y directivos, conectados al libro.",
    href: "/planes-de-incentivos",
    funcionalidades: [
      { titulo: "Phantom shares y stock options", descripcion: "Cada plan con su instrumento, sus condiciones y su precio de ejercicio." },
      { titulo: "Restricted shares", descripcion: "Acciones sujetas a condiciones de permanencia." },
      { titulo: "Pool del plan", descripcion: "El total de unidades del plan, aprobado y movido por acuerdo de junta." },
      { titulo: "Asignaciones", descripcion: "Las unidades concedidas a cada beneficiario, plan por plan." },
      { titulo: "Vesting y cliff", descripcion: "El calendario de consolidación de cada asignación, calculado a día de hoy." },
      { titulo: "Tender offers", descripcion: "Ventanas de compra sobre los derechos consolidados, con precio, topes, retención y neto para cada beneficiario.", href: `${F}/liquidez-planes-de-incentivos` },
      { titulo: "Carta de invitación", descripcion: "La carta de cada asignación y su estado: aceptada o pendiente." },
      { titulo: "Portal del beneficiario", descripcion: "Cada empleado ve sus unidades, su calendario y sus documentos.", href: `${F}/portal-del-beneficiario` },
      { titulo: "Expediente de cada asignación", descripcion: "Carta, condiciones, certificados y contrato de compraventa en un solo sitio." },
      { titulo: "Estimación de valor", descripcion: "Lo que valdrían las unidades consolidadas, con aviso de que es una estimación." },
    ],
  },
  {
    id: "simulador",
    titulo: "Simulador de operaciones",
    resumen: "El efecto de una operación antes de firmarla.",
    href: "/simulador",
    funcionalidades: [
      { titulo: "Ampliación de capital", descripcion: "Con su efecto en cada socio, incluidos el pool y la conversión de notas." },
      { titulo: "Reducción de capital", descripcion: "Quién queda con qué porcentaje después de reducir." },
      { titulo: "Compraventa", descripcion: "La posición de comprador y vendedor tras la operación." },
      { titulo: "Nota convertible", descripcion: "La conversión y su dilución sobre el libro real." },
      { titulo: "Operaciones encadenadas", descripcion: "Varias operaciones seguidas sobre el mismo escenario." },
      { titulo: "Cascada de liquidación", descripcion: "Qué recibe cada socio en una venta, con las preferencias de cada clase." },
      { titulo: "Borradores de documentos", descripcion: "La operación simulada sale con sus borradores en Word." },
      { titulo: "Asistente en lenguaje natural", descripcion: "Se describe la operación con palabras y el simulador la monta." },
    ],
  },
  {
    id: "secundario",
    titulo: "Mercado secundario",
    resumen: "Compraventas entre socios con su registro en el libro.",
    href: "/mercado-secundario",
    nota: "Módulo con coste adicional",
    funcionalidades: [
      { titulo: "Ofertas de venta", descripcion: "Un socio publica cuántas acciones vende, a qué precio y en qué plazo." },
      { titulo: "Ofertas de compra", descripcion: "La sociedad o un socio lanza una oferta de compra a varios socios a la vez." },
      { titulo: "Libro de ofertas", descripcion: "Precio medio, volumen y estado de cada oferta." },
      { titulo: "Participantes autorizados", descripcion: "La sociedad decide quién puede comprar y vender." },
      { titulo: "Seguimiento de cada operación", descripcion: "Estado de cada oferta y su histórico." },
      { titulo: "Registro en el libro", descripcion: "Cada operación ejecutada se anota en el libro con su documentación." },
    ],
  },
  {
    id: "plataforma",
    titulo: "Accesos y seguridad",
    resumen: "Quién entra, qué ve y dónde están los datos.",
    funcionalidades: [
      { titulo: "Usuarios y permisos", descripcion: "Acceso completo o limitado por secciones, y permisos por sociedad." },
      { titulo: "Roles", descripcion: "Administrador, consejero, socio, beneficiario o solo consulta, cada uno con su vista." },
      { titulo: "Inicio de sesión con Google y Microsoft", descripcion: "Acceso con la cuenta corporativa de la empresa." },
      { titulo: "Integraciones y API", descripcion: "Conexión con otras herramientas de la empresa." },
      { titulo: "Idiomas", descripcion: "Cada usuario elige su idioma: castellano, catalán, inglés o francés." },
      { titulo: "Personalización", descripcion: "Color de marca de la sociedad y opción de marca blanca." },
      { titulo: "ISO 27001 y RGPD", descripcion: "Certificación ISO 27001 y cumplimiento del RGPD." },
      { titulo: "Datos en la Unión Europea", descripcion: "Datos cifrados y alojados en la Unión Europea." },
    ],
  },
];
