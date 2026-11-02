/**
 * Registro del consentimiento de cookies (art. 22.2 LSSI, art. 7.1 RGPD).
 *
 * La decisión del visitante se guarda en una cookie propia y técnica
 * (exenta de consentimiento: solo recuerda esa decisión) con las categorías
 * elegidas, la fecha y la versión de la configuración. Se vuelve a preguntar
 * si cambia CONSENT_VERSION o si la decisión tiene más de CONSENT_MAX_AGE_DAYS.
 *
 * Solo se usa en cliente. El estado vive en un pequeño almacén con
 * suscripción para que el banner, el panel y Google Analytics lean lo mismo
 * vía useSyncExternalStore.
 */

/** Súbelo al añadir una cookie o una categoría: invalida las decisiones previas. */
export const CONSENT_VERSION = 1;

export const CONSENT_COOKIE = "sttok_consent";

/**
 * 13 meses. La Guía de cookies de la AEPD admite renovar el consentimiento
 * con una periodicidad de hasta 24 meses; 13 es el plazo prudente habitual
 * (el de la CNIL) y se aplica igual a aceptaciones y rechazos.
 */
export const CONSENT_MAX_AGE_DAYS = 395;

const DAY_MS = 24 * 60 * 60 * 1000;

export type ConsentCategories = {
  analytics: boolean;
  advertising: boolean;
};

export type ConsentRecord = ConsentCategories & {
  version: number;
  /** Fecha de la decisión, ISO 8601. */
  date: string;
};

function parse(raw: string): ConsentRecord | null {
  try {
    const data = JSON.parse(decodeURIComponent(raw));
    const record: ConsentRecord = {
      version: Number(data.v),
      analytics: data.a === 1,
      advertising: data.ad === 1,
      date: String(data.d),
    };
    const time = Date.parse(record.date);
    if (record.version !== CONSENT_VERSION || Number.isNaN(time)) return null;
    if (Date.now() - time > CONSENT_MAX_AGE_DAYS * DAY_MS) return null;
    return record;
  } catch {
    return null;
  }
}

function readCookie(): ConsentRecord | null {
  const prefix = `${CONSENT_COOKIE}=`;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(prefix))
    ?.slice(prefix.length);
  return raw ? parse(raw) : null;
}

function writeCookie(record: ConsentRecord) {
  const value = encodeURIComponent(
    JSON.stringify({
      v: record.version,
      a: record.analytics ? 1 : 0,
      ad: record.advertising ? 1 : 0,
      d: record.date,
    }),
  );
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  }; Path=/; SameSite=Lax${secure}`;
}

/**
 * Borra las cookies cuyo nombre cumpla `match`. Google las crea en el
 * dominio raíz (.sttok.com), así que se prueba con cada dominio padre.
 */
export function deleteCookies(match: (name: string) => boolean) {
  const names = document.cookie
    .split("; ")
    .map((c) => c.split("=")[0])
    .filter((name) => name && match(name));
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
    }
  }
}

// --- Almacén ---------------------------------------------------------------

export type State = {
  /** null: sin decisión válida, hay que preguntar. */
  record: ConsentRecord | null;
  /** Segunda capa (Configurar) abierta. */
  settingsOpen: boolean;
};

let state: State | null = null;
const listeners = new Set<() => void>();

function emit(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentState(): State {
  if (!state) state = { record: readCookie(), settingsOpen: false };
  return state;
}

/**
 * En el servidor (y en la hidratación) no se conoce la decisión: null hace
 * que no se pinte nada y el banner aparezca solo tras hidratar, sin
 * diferencias entre el HTML del servidor y el primer render del cliente.
 */
export function getServerConsentState(): State | null {
  return null;
}

export function saveConsent(categories: ConsentCategories) {
  const record: ConsentRecord = {
    ...categories,
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
  };
  writeCookie(record);
  emit({ record, settingsOpen: false });
}

export function openConsentSettings() {
  emit({ ...getConsentState(), settingsOpen: true });
}

export function closeConsentSettings() {
  if (!getConsentState().settingsOpen) return;
  emit({ ...getConsentState(), settingsOpen: false });
}
