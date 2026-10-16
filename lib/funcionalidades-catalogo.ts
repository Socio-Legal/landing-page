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
  /** Traducción para las páginas de módulo en /en. */
  en?: { titulo: string; descripcion: string };
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
  en?: { titulo: string; resumen: string };
};

const F = "/funcionalidades";

export const CATALOGO: Modulo[] = [
  {
    id: "socios",
    titulo: "Socios y libro registro",
    resumen: "El registro oficial de quién es socio, con qué y desde cuándo.",
    en: { titulo: "Shareholders and register", resumen: "The official record of who owns what, and since when." },
    href: "/libro-de-socios",
    funcionalidades: [
      { titulo: "Libro de socios oficial", descripcion: "Libro registro de socios o de acciones nominativas, exportable en formato legalizable.", href: `${F}/libro-registro-oficial`, en: { titulo: "Official shareholder register", descripcion: "Register of partners or of registered shares, exportable in a format ready for legalisation." } },
      { titulo: "Numeración por rangos", descripcion: "Cada participación o acción con su número. Las transmisiones se anotan sobre rangos concretos.", href: `${F}/numeracion-por-rangos`, en: { titulo: "Numbered share ranges", descripcion: "Every share has its number. Transfers are recorded against specific ranges." } },
      { titulo: "Transmisiones", descripcion: "Compraventa, herencia, donación, endoso, split, renumeración, reclasificación y canje de títulos.", href: `${F}/transmisiones`, en: { titulo: "Transfers", descripcion: "Sale, inheritance, gift, endorsement, split, renumbering, reclassification and exchange of certificates." } },
      { titulo: "Ampliaciones y reducciones de capital", descripcion: "Cada operación con su escritura, sus nuevos rangos y su efecto en el capital.", href: `${F}/ampliaciones-y-reducciones-de-capital`, en: { titulo: "Capital increases and reductions", descripcion: "Each transaction with its deed, its new ranges and its effect on the share capital." } },
      { titulo: "Cargas sobre participaciones", descripcion: "Prenda, usufructo y nuda propiedad, cotitularidad y opción, como posiciones separadas.", href: `${F}/cargas-sobre-participaciones`, en: { titulo: "Encumbrances on shares", descripcion: "Pledge, usufruct and bare ownership, co-ownership and options, kept as separate positions." } },
      { titulo: "Certificados de titularidad y de valor", descripcion: "Titularidad, valor, IRPF y patrimonio, generados desde el libro con los datos del día.", href: `${F}/certificados-de-titularidad-y-valor`, en: { titulo: "Ownership and value certificates", descripcion: "Ownership, value, income tax and wealth tax certificates, generated from the register with today's data." } },
      { titulo: "Lectura de escrituras con IA", descripcion: "Alta de operaciones y del histórico de una sociedad a partir de sus escrituras.", href: `${F}/lectura-de-escrituras-con-ia`, en: { titulo: "AI reading of deeds", descripcion: "Recording transactions and a company's history from its deeds." } },
      { titulo: "Ficha del socio", descripcion: "Posición, derechos de voto, cargas, transacciones, documentos y notas de cada socio.", href: `${F}/ficha-del-socio`, en: { titulo: "Shareholder record", descripcion: "Each shareholder's position, voting rights, encumbrances, transactions, documents and notes." } },
      { titulo: "Clases de acciones", descripcion: "Clases y tramos con su numeración y sus derechos.", href: `${F}/clases-de-acciones`, en: { titulo: "Share classes", descripcion: "Classes and tranches with their numbering and their rights." } },
      { titulo: "Reparto de dividendos", descripcion: "Cada reparto registrado por socio, con sus retenciones.", href: `${F}/reparto-de-dividendos`, en: { titulo: "Dividend distributions", descripcion: "Each distribution recorded per shareholder, with its withholdings." } },
      { titulo: "Categorías de socios", descripcion: "Las que se derivan de las cargas y etiquetas libres para agrupar socios.", href: `${F}/categorias-de-socios`, en: { titulo: "Shareholder categories", descripcion: "Categories derived from encumbrances and free tags to group shareholders." } },
      { titulo: "Representantes", descripcion: "Quién representa a cada socio persona jurídica o a cada cotitularidad.", href: `${F}/representantes`, en: { titulo: "Representatives", descripcion: "Who represents each corporate shareholder or each co-ownership." } },
      { titulo: "Autocartera", descripcion: "Las acciones propias de la sociedad, separadas del capital con voto.", href: `${F}/autocartera`, en: { titulo: "Treasury shares", descripcion: "The company's own shares, kept apart from the voting capital." } },
      { titulo: "Acreedores y notas convertibles", descripcion: "Cada nota convertible con la ficha de su acreedor.", href: `${F}/acreedores-y-notas-convertibles`, en: { titulo: "Creditors and convertible notes", descripcion: "Each convertible note with its creditor's record." } },
      { titulo: "Portal del accionista", descripcion: "Cada socio entra con su usuario y ve su posición, sus certificados y sus juntas.", href: `${F}/portal-del-accionista`, en: { titulo: "Shareholder portal", descripcion: "Each shareholder logs in and sees their position, their certificates and their meetings." } },
      { titulo: "Equity Story", descripcion: "La evolución del capital de la sociedad contada operación a operación.", href: `${F}/equity-story`, en: { titulo: "Equity Story", descripcion: "The evolution of the company's capital, transaction by transaction." } },
    ],
  },
  {
    id: "juntas",
    titulo: "Junta general",
    resumen: "La junta de socios o de accionistas, de la convocatoria al acta certificada.",
    en: { titulo: "General meeting", resumen: "The meeting of partners or shareholders, from the notice to the certified minutes." },
    href: "/juntas-consejos",
    funcionalidades: [
      { titulo: "Preparar la junta", descripcion: "Orden del día, documentación y plazos, en un recorrido de cinco pasos.", en: { titulo: "Preparing the meeting", descripcion: "Agenda, documents and deadlines, in a five-step flow." } },
      { titulo: "Convocatoria", descripcion: "Vista previa, envío a cada socio y recordatorios antes de la fecha.", en: { titulo: "Notice of meeting", descripcion: "Preview, delivery to each shareholder and reminders before the date." } },
      { titulo: "Asistencia y quórum", descripcion: "Quién asiste, quién delega y quién falta, con el quórum calculado en todo momento.", en: { titulo: "Attendance and quorum", descripcion: "Who attends, who appoints a proxy and who is missing, with the quorum calculated at all times." } },
      { titulo: "Delegación de voto con firma", descripcion: "El socio elige representante e instrucciones y firma la delegación.", href: `${F}/voto-electronico-en-juntas`, en: { titulo: "Signed proxy voting", descripcion: "The shareholder chooses a proxy and instructions and signs the proxy." } },
      { titulo: "Voto anticipado", descripcion: "El socio vota cada punto antes de la junta y puede cambiarlo hasta el cierre del plazo.", href: `${F}/voto-electronico-en-juntas`, en: { titulo: "Early voting", descripcion: "The shareholder votes on each item before the meeting and can change it until the deadline." } },
      { titulo: "Votación en vivo", descripcion: "Se abre y se cierra la votación de cada punto durante la sesión.", href: `${F}/voto-electronico-en-juntas`, en: { titulo: "Live voting", descripcion: "Voting on each item is opened and closed during the session." } },
      { titulo: "Mayorías y derecho de separación", descripcion: "Las mayorías reforzadas se derivan de cada punto, y se avisa del derecho de separación.", en: { titulo: "Majorities and withdrawal rights", descripcion: "Enhanced majorities are derived from each item, with a warning when a resolution triggers withdrawal rights." } },
      { titulo: "Proyección en la sala", descripcion: "El resultado de cada votación, en pantalla para los asistentes.", en: { titulo: "Projection in the room", descripcion: "The result of each vote, on screen for attendees." } },
      { titulo: "Acta automática", descripcion: "El acta se compone con la asistencia y los resultados. También admite acta notarial.", en: { titulo: "Automatic minutes", descripcion: "The minutes are drafted from attendance and results. Notarial minutes are also supported." } },
      { titulo: "Certificación de acuerdos", descripcion: "El certificado de cada acuerdo, preparado para firmar.", en: { titulo: "Certification of resolutions", descripcion: "The certificate for each resolution, ready to sign." } },
      { titulo: "Juntas presenciales, telemáticas o híbridas", descripcion: "La videollamada la pone la sociedad con su herramienta; Sttok lleva todo lo demás.", en: { titulo: "In-person, remote or hybrid meetings", descripcion: "The company provides the video call with its own tool; Sttok handles everything else." } },
      { titulo: "Vista del socio", descripcion: "Cada socio ve su convocatoria, delega o vota desde su acceso.", href: `${F}/portal-del-accionista`, en: { titulo: "Shareholder view", descripcion: "Each shareholder sees their notice, appoints a proxy or votes from their own access." } },
    ],
  },
  {
    id: "consejo",
    titulo: "Consejo y cargos",
    resumen: "El órgano de administración, sus reuniones y quién puede firmar en nombre de la sociedad.",
    en: { titulo: "Board and officers", resumen: "The governing body, its meetings and who can sign on behalf of the company." },
    href: "/soluciones/secretaria-del-consejo",
    funcionalidades: [
      { titulo: "Órgano de administración", descripcion: "Consejo de administración, administrador único o administradores, con su composición.", en: { titulo: "Governing body", descripcion: "Board of directors, sole director or joint directors, with their composition." } },
      { titulo: "Convocar el consejo", descripcion: "Fecha, orden del día, convocados y revisión, con envío opcional por correo y cita de calendario.", href: `${F}/consejo-de-administracion`, en: { titulo: "Calling a board meeting", descripcion: "Date, agenda, attendees and review, with optional email delivery and a calendar invitation." } },
      { titulo: "Orden del día", descripcion: "Cada punto para debatir o para acordar, con ponente, tiempo y documentación.", en: { titulo: "Agenda", descripcion: "Each item for discussion or for resolution, with presenter, time and documents." } },
      { titulo: "Calendario del consejo", descripcion: "Las reuniones del año reservadas, con la respuesta de cada consejero.", en: { titulo: "Board calendar", descripcion: "The year's meetings booked, with each director's response." } },
      { titulo: "Acta y certificación", descripcion: "El acta del consejo y el certificado de cada acuerdo.", en: { titulo: "Minutes and certification", descripcion: "The board minutes and the certificate for each resolution." } },
      { titulo: "Consejo por escrito y sin sesión", descripcion: "Acuerdos adoptados por escrito, sin reunión.", en: { titulo: "Written resolutions without a meeting", descripcion: "Resolutions adopted in writing, without a meeting." } },
      { titulo: "Vista del consejero", descripcion: "Cada consejero ve sus convocatorias y la documentación de cada reunión.", en: { titulo: "Director view", descripcion: "Each director sees their notices and the documents for each meeting." } },
      { titulo: "Cargos con vigencia", descripcion: "Consejeros, presidente y secretario con su fecha de nombramiento y de caducidad.", en: { titulo: "Officers and terms", descripcion: "Directors, chair and secretary with their appointment and expiry dates." } },
      { titulo: "Apoderados y poderes", descripcion: "Cada poder con su alcance, su cuantía y su inscripción.", href: `${F}/apoderados-y-poderes`, en: { titulo: "Powers of attorney", descripcion: "Each power with its scope, its limit and its registration." } },
      { titulo: "Comités", descripcion: "Comisiones del consejo con su composición y sus reuniones.", en: { titulo: "Committees", descripcion: "Board committees with their members and their meetings." } },
      { titulo: "Auditores", descripcion: "El auditor de cada ejercicio, con su nombramiento.", en: { titulo: "Auditors", descripcion: "The auditor for each financial year, with their appointment." } },
      { titulo: "Elección de consejeros", descripcion: "Compromisos de apoyo sobre acciones numeradas y cartas de apoyo firmadas.", en: { titulo: "Election of directors", descripcion: "Support commitments on numbered shares and signed letters of support." } },
    ],
  },
  {
    id: "grupos",
    titulo: "Grupos de sociedades",
    resumen: "Todas las sociedades del grupo y quién controla cada una.",
    en: { titulo: "Company groups", resumen: "Every company in the group and who controls each one." },
    href: "/soluciones/grupos-de-sociedades",
    funcionalidades: [
      { titulo: "Todas las sociedades en una portada", descripcion: "Lo pendiente de cada sociedad del grupo, ordenado por plazo.", en: { titulo: "All companies on one screen", descripcion: "What is pending in each company of the group, sorted by deadline." } },
      { titulo: "Diagrama del grupo", descripcion: "Participadas y cadena de control a cualquier fecha.", href: `${F}/diagrama-del-grupo`, en: { titulo: "Group chart", descripcion: "Subsidiaries and the chain of control on any date." } },
      { titulo: "Titular real", descripcion: "Quién supera el 25 % del capital o de los votos al final de la cadena.", href: `${F}/titular-real`, en: { titulo: "Beneficial owner", descripcion: "Who holds more than 25% of the capital or the votes at the end of the chain." } },
      { titulo: "Participadas", descripcion: "Cada participada por relación, nivel y país, en tarjetas o en tabla.", en: { titulo: "Subsidiaries and investees", descripcion: "Each investee by relationship, level and country, as cards or a table." } },
      { titulo: "Comparar fechas", descripcion: "Qué ha cambiado en el grupo entre dos cierres.", en: { titulo: "Compare dates", descripcion: "What has changed in the group between two year-ends." } },
      { titulo: "Sociedades que son socias de otras", descripcion: "Una sociedad del grupo puede figurar como socia de otra, con su posición.", en: { titulo: "Companies that hold shares in others", descripcion: "A group company can be a shareholder of another, with its position." } },
      { titulo: "Trabajos en varias sociedades", descripcion: "Consejos, formulación de cuentas, libros, juntas y depósitos lanzados para varias sociedades a la vez.", en: { titulo: "Work across several companies", descripcion: "Board meetings, accounts, registers, general meetings and filings launched for several companies at once." } },
      { titulo: "Permisos por sociedad", descripcion: "Cada persona ve y gestiona solo las sociedades que le corresponden.", en: { titulo: "Permissions per company", descripcion: "Each person sees and manages only the companies they are responsible for." } },
      { titulo: "Colecciones de sociedades", descripcion: "Grupos de sociedades guardados y compartidos para trabajar con ellos.", en: { titulo: "Company collections", descripcion: "Saved and shared groups of companies to work with." } },
      { titulo: "Cuentas depositadas", descripcion: "Petición de las cuentas depositadas en el Registro Mercantil, con coste por sociedad.", en: { titulo: "Filed accounts", descripcion: "Requesting the accounts filed with the Companies Registry, at a cost per company." } },
    ],
  },
  {
    id: "documentos",
    titulo: "Documentos, firma y comunicaciones",
    resumen: "Lo que se firma y se envía, guardado por sociedad.",
    en: { titulo: "Documents, signature and communications", resumen: "What is signed and sent, filed by company." },
    funcionalidades: [
      { titulo: "Libros de actas", descripcion: "Un libro por órgano y ejercicio, con su legalización.", href: `${F}/libro-de-actas`, en: { titulo: "Minute books", descripcion: "One book per governing body and financial year, with its legalisation." } },
      { titulo: "Firma electrónica", descripcion: "Sobres de firma con recordatorios, reenvío y plazos. Incluida en los planes Avanzado y Pro.", href: `${F}/firma-electronica`, en: { titulo: "Electronic signature", descripcion: "Signature envelopes with reminders, resending and deadlines. Included in the Advanced and Pro plans." } },
      { titulo: "Comunicaciones certificadas", descripcion: "Cada convocatoria y cada aviso, con su estado y su certificado de envío.", href: `${F}/comunicaciones-a-socios`, en: { titulo: "Certified communications", descripcion: "Every notice and every message, with its status and proof of delivery." } },
      { titulo: "Repositorio de documentos", descripcion: "Todo lo que generan los módulos, por sociedad y por carpetas.", en: { titulo: "Document repository", descripcion: "Everything the modules generate, by company and by folder." } },
      { titulo: "Documentos por aportar", descripcion: "Lo que falta para completar el expediente de cada operación.", en: { titulo: "Missing documents", descripcion: "What is still needed to complete each transaction file." } },
      { titulo: "Legalización del libro registro", descripcion: "Un asistente para preparar el libro y presentarlo en el Registro Mercantil.", en: { titulo: "Legalising the share register", descripcion: "A wizard to prepare the register and file it with the Companies Registry." } },
      { titulo: "Reglas de la sociedad", descripcion: "Estatutos y pactos ordenados por tema, con la mayoría que exige cada acuerdo.", href: `${F}/reglas-de-la-sociedad`, en: { titulo: "Company rules", descripcion: "Articles of association and shareholder agreements organised by topic, with the majority each resolution requires." } },
      { titulo: "Calendario societario", descripcion: "Las obligaciones de cada sociedad con su fecha, derivadas de la ley y los estatutos.", en: { titulo: "Corporate calendar", descripcion: "Each company's obligations with their dates, derived from the law and the articles." } },
      { titulo: "Sttok AI", descripcion: "Preguntas sobre el registro en lenguaje natural, con la fuente enlazada en cada respuesta.", en: { titulo: "Sttok AI", descripcion: "Questions about the register in plain language, with the source linked in every answer." } },
      { titulo: "Remitente propio", descripcion: "Las comunicaciones salen con la firma de correo y el logo de la sociedad.", href: `${F}/comunicaciones-a-socios`, en: { titulo: "Own sender identity", descripcion: "Communications go out with the company's email signature and logo." } },
    ],
  },
  {
    id: "incentivos",
    titulo: "Planes de incentivos",
    resumen: "Los planes de empleados y directivos, conectados al libro.",
    en: { titulo: "Incentive plans", resumen: "Employee and management plans, connected to the register." },
    href: "/planes-de-incentivos",
    funcionalidades: [
      { titulo: "Phantom shares y stock options", descripcion: "Cada plan con su instrumento, sus condiciones y su precio de ejercicio.", en: { titulo: "Phantom shares and stock options", descripcion: "Each plan with its instrument, its conditions and its exercise price." } },
      { titulo: "Restricted shares", descripcion: "Acciones sujetas a condiciones de permanencia.", en: { titulo: "Restricted shares", descripcion: "Shares subject to retention conditions." } },
      { titulo: "Pool del plan", descripcion: "El total de unidades del plan, aprobado y movido por acuerdo de junta.", en: { titulo: "Plan pool", descripcion: "The plan's total units, approved and adjusted by shareholder resolution." } },
      { titulo: "Asignaciones", descripcion: "Las unidades concedidas a cada beneficiario, plan por plan.", en: { titulo: "Grants", descripcion: "The units granted to each beneficiary, plan by plan." } },
      { titulo: "Vesting y cliff", descripcion: "El calendario de consolidación de cada asignación, calculado a día de hoy.", en: { titulo: "Vesting and cliff", descripcion: "The vesting schedule for each grant, calculated as of today." } },
      { titulo: "Tender offers", descripcion: "Ventanas de compra sobre los derechos consolidados, con precio, topes, retención y neto para cada beneficiario.", href: `${F}/liquidez-planes-de-incentivos`, en: { titulo: "Tender offers", descripcion: "Purchase windows on vested rights, with price, caps, withholding and net amount for each beneficiary." } },
      { titulo: "Carta de invitación", descripcion: "La carta de cada asignación y su estado: aceptada o pendiente.", en: { titulo: "Invitation letter", descripcion: "The letter for each grant and its status: accepted or pending." } },
      { titulo: "Portal del beneficiario", descripcion: "Cada empleado ve sus unidades, su calendario y sus documentos.", href: `${F}/portal-del-beneficiario`, en: { titulo: "Beneficiary portal", descripcion: "Each employee sees their units, their schedule and their documents." } },
      { titulo: "Expediente de cada asignación", descripcion: "Carta, condiciones, certificados y contrato de compraventa en un solo sitio.", en: { titulo: "Grant file", descripcion: "Letter, conditions, certificates and sale agreement in one place." } },
      { titulo: "Estimación de valor", descripcion: "Lo que valdrían las unidades consolidadas, con aviso de que es una estimación.", en: { titulo: "Value estimate", descripcion: "What vested units would be worth, flagged as an estimate." } },
    ],
  },
  {
    id: "simulador",
    titulo: "Simulador de operaciones",
    resumen: "El efecto de una operación antes de firmarla.",
    en: { titulo: "Transaction simulator", resumen: "The effect of a transaction before it is signed." },
    href: "/simulador",
    funcionalidades: [
      { titulo: "Ampliación de capital", descripcion: "Con su efecto en cada socio, incluidos el pool y la conversión de notas.", en: { titulo: "Capital increase", descripcion: "With its effect on each shareholder, including the pool and note conversion." } },
      { titulo: "Reducción de capital", descripcion: "Quién queda con qué porcentaje después de reducir.", en: { titulo: "Capital reduction", descripcion: "Who ends up with what percentage after the reduction." } },
      { titulo: "Compraventa", descripcion: "La posición de comprador y vendedor tras la operación.", en: { titulo: "Share sale", descripcion: "The buyer's and seller's positions after the transaction." } },
      { titulo: "Nota convertible", descripcion: "La conversión y su dilución sobre el libro real.", en: { titulo: "Convertible note", descripcion: "Conversion and its dilution on the actual register." } },
      { titulo: "Operaciones encadenadas", descripcion: "Varias operaciones seguidas sobre el mismo escenario.", en: { titulo: "Chained transactions", descripcion: "Several transactions in a row on the same scenario." } },
      { titulo: "Cascada de liquidación", descripcion: "Qué recibe cada socio en una venta, con las preferencias de cada clase.", en: { titulo: "Liquidation waterfall", descripcion: "What each shareholder receives in a sale, with the preferences of each class." } },
      { titulo: "Borradores de documentos", descripcion: "La operación simulada sale con sus borradores en Word.", en: { titulo: "Draft documents", descripcion: "The simulated transaction comes with its drafts in Word." } },
      { titulo: "Asistente en lenguaje natural", descripcion: "Se describe la operación con palabras y el simulador la monta.", en: { titulo: "Plain-language assistant", descripcion: "Describe the transaction in words and the simulator builds it." } },
    ],
  },
  {
    id: "secundario",
    titulo: "Mercado secundario",
    resumen: "Compraventas entre socios con su registro en el libro.",
    en: { titulo: "Secondary market", resumen: "Sales between shareholders, recorded in the register." },
    href: "/mercado-secundario",
    nota: "Módulo con coste adicional",
    funcionalidades: [
      { titulo: "Ofertas de venta", descripcion: "Un socio publica cuántas acciones vende, a qué precio y en qué plazo.", en: { titulo: "Sell offers", descripcion: "A shareholder publishes how many shares they are selling, at what price and by when." } },
      { titulo: "Ofertas de compra", descripcion: "La sociedad o un socio lanza una oferta de compra a varios socios a la vez.", en: { titulo: "Buy offers", descripcion: "The company or a shareholder makes a purchase offer to several shareholders at once." } },
      { titulo: "Libro de ofertas", descripcion: "Precio medio, volumen y estado de cada oferta.", en: { titulo: "Order book", descripcion: "Average price, volume and status of each offer." } },
      { titulo: "Participantes autorizados", descripcion: "La sociedad decide quién puede comprar y vender.", en: { titulo: "Authorised participants", descripcion: "The company decides who can buy and sell." } },
      { titulo: "Seguimiento de cada operación", descripcion: "Estado de cada oferta y su histórico.", en: { titulo: "Transaction tracking", descripcion: "The status of each offer and its history." } },
      { titulo: "Registro en el libro", descripcion: "Cada operación ejecutada se anota en el libro con su documentación.", en: { titulo: "Recorded in the register", descripcion: "Each completed transaction is entered in the register with its documents." } },
    ],
  },
  {
    id: "plataforma",
    titulo: "Accesos y seguridad",
    resumen: "Quién entra, qué ve y dónde están los datos.",
    en: { titulo: "Access and security", resumen: "Who logs in, what they see and where the data is." },
    funcionalidades: [
      { titulo: "Usuarios y permisos", descripcion: "Acceso completo o limitado por secciones, y permisos por sociedad.", en: { titulo: "Users and permissions", descripcion: "Full access or access limited by section, and permissions per company." } },
      { titulo: "Roles", descripcion: "Administrador, consejero, socio, beneficiario o solo consulta, cada uno con su vista.", en: { titulo: "Roles", descripcion: "Administrator, director, shareholder, beneficiary or read-only, each with its own view." } },
      { titulo: "Inicio de sesión con Google y Microsoft", descripcion: "Acceso con la cuenta corporativa de la empresa.", en: { titulo: "Sign-in with Google and Microsoft", descripcion: "Access with the company's corporate account." } },
      { titulo: "Integraciones y API", descripcion: "Conexión con otras herramientas de la empresa.", en: { titulo: "Integrations and API", descripcion: "Connection with the company's other tools." } },
      { titulo: "Idiomas", descripcion: "Cada usuario elige su idioma: castellano, catalán, inglés o francés.", en: { titulo: "Languages", descripcion: "Each user chooses their language: Spanish, Catalan, English or French." } },
      { titulo: "Personalización", descripcion: "Color de marca de la sociedad y opción de marca blanca.", en: { titulo: "Customisation", descripcion: "The company's brand colour and a white-label option." } },
      { titulo: "ISO 27001 y RGPD", descripcion: "Certificación ISO 27001 y cumplimiento del RGPD.", en: { titulo: "ISO 27001 and GDPR", descripcion: "ISO 27001 certification and GDPR compliance." } },
      { titulo: "Datos en la Unión Europea", descripcion: "Datos cifrados y alojados en la Unión Europea.", en: { titulo: "Data in the European Union", descripcion: "Data encrypted and hosted in the European Union." } },
    ],
  },
];

/** Página de cada módulo en inglés; las que no tienen versión inglesa, sin enlace. */
export const HREF_EN: Record<string, string> = {
  socios: "/en/partners-book",
  juntas: "/en/shareholder-meetings",
  incentivos: "/en/incentive-plans",
  simulador: "/en/operation-drafts",
  secundario: "/en/secondary-market",
};

/** Textos del catálogo en el idioma de la página; el castellano es el original. */
export const enIngles = (m: Modulo, en: boolean) => ({
  titulo: (en && m.en?.titulo) || m.titulo,
  resumen: (en && m.en?.resumen) || m.resumen,
  href: en ? HREF_EN[m.id] : m.href,
  total: m.funcionalidades.length,
  funcionalidades: m.funcionalidades.map((f) => ({
    titulo: (en && f.en?.titulo) || f.titulo,
    descripcion: (en && f.en?.descripcion) || f.descripcion,
    // Las fichas de /funcionalidades solo existen en castellano.
    href: en ? undefined : f.href,
  })),
});
