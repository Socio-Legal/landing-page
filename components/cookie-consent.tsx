"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Trans, useTranslation } from "react-i18next";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  closeConsentSettings,
  deleteCookies,
  getConsentState,
  getServerConsentState,
  openConsentSettings,
  saveConsent,
  subscribeConsent,
  type ConsentCategories,
} from "@/lib/cookie-consent";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";
import { localizedHref } from "@/lib/localized-href";
import { useLocale } from "@/lib/use-locale";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ALL: ConsentCategories = { analytics: true, advertising: true };
const NONE: ConsentCategories = { analytics: false, advertising: false };

/** Cookies de cada categoría. Los textos están en cookie-consent.json. */
const CATEGORIES = [
  {
    key: "necessary",
    cookies: [
      { name: "sttok_consent", id: "sttok_consent", provider: "Sttok" },
      { name: "theme", id: "theme", provider: "Sttok" },
      { name: "Calendly", id: "calendly", provider: "Calendly" },
    ],
  },
  {
    key: "analytics",
    cookies: [
      { name: "_ga", id: "_ga", provider: "Google" },
      { name: "_ga_<id>", id: "_ga_id", provider: "Google" },
    ],
  },
  {
    key: "advertising",
    cookies: [{ name: "_gcl_au", id: "_gcl_au", provider: "Google" }],
  },
] as const;

const isAnalyticsCookie = (name: string) =>
  name === "_ga" || name.startsWith("_ga_");
const isAdvertisingCookie = (name: string) => name.startsWith("_gcl_");
/** Restos de los gestores anteriores (Cookiebot y CookieYes): ya no se usan. */
const isLegacyConsentCookie = (name: string) =>
  name === "cookieyes-consent" || name.startsWith("CookieConsent");

/**
 * Banner de consentimiento propio (art. 22.2 LSSI y Guía de cookies de la
 * AEPD), y Google Analytics y Google Ads condicionados a él.
 *
 * El layout raíz fija antes que nada el Consent Mode de Google en «denied».
 * Aquí se traslada a Google cada decisión. Analytics solo se monta con las
 * analíticas aceptadas y la etiqueta de Ads con la publicidad aceptada. Si se
 * revoca una, se borran sus cookies y se recarga la página para descargarla.
 */
export function CookieConsent({ gaId }: { gaId: string }) {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentState,
    getServerConsentState,
  );
  const record = state?.record ?? null;
  const analytics = Boolean(record?.analytics);
  const advertising = Boolean(record?.advertising);
  const hydrated = state !== null;
  const gaLoaded = useRef(false);
  const adsLoaded = useRef(false);

  useEffect(() => deleteCookies(isLegacyConsentCookie), []);

  useEffect(() => {
    if (!hydrated) return;
    window.gtag?.("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: advertising ? "granted" : "denied",
      ad_user_data: advertising ? "granted" : "denied",
      ad_personalization: advertising ? "granted" : "denied",
    });
    const revoked =
      (!analytics && gaLoaded.current) || (!advertising && adsLoaded.current);
    if (!advertising) deleteCookies(isAdvertisingCookie);
    if (!analytics) deleteCookies(isAnalyticsCookie);
    if (revoked) window.location.reload();
    gaLoaded.current = analytics;
    adsLoaded.current = advertising;
  }, [hydrated, analytics, advertising]);

  if (!state) return null;

  return (
    <>
      {analytics && <GoogleAnalytics gaId={gaId} />}
      {advertising && <GoogleAdsTag loadGtag={!analytics} />}
      {!record && <ConsentBanner />}
      <ConsentSettings
        open={state.settingsOpen}
        current={record ?? NONE}
      />
    </>
  );
}

/**
 * Etiqueta de Google Ads. Con las analíticas aceptadas, gtag.js ya lo carga
 * Google Analytics y basta con configurar Ads; si no, se carga con el ID de
 * Ads, para no enviar nada a Analytics.
 */
function GoogleAdsTag({ loadGtag }: { loadGtag: boolean }) {
  return (
    <>
      {loadGtag && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
      )}
      <Script id="google-ads-config" strategy="afterInteractive">
        {`${loadGtag ? "gtag('js', new Date());" : ""}gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}

/** Primera capa: no bloquea la página y rechazar cuesta lo mismo que aceptar. */
function ConsentBanner() {
  const { t } = useTranslation("cookie-consent");
  const locale = useLocale();
  const titleId = useId();
  const textId = useId();

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={textId}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-background p-4 shadow-lg sm:p-5">
        <h2 id={titleId} className="text-sm font-semibold">
          {t("banner.title")}
        </h2>
        <p id={textId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
          <Trans
            t={t}
            i18nKey="banner.text"
            components={{
              link: (
                <Link
                  href={localizedHref("/privacidad", locale)}
                  className="underline underline-offset-2 hover:text-foreground"
                />
              ),
            }}
          />
        </p>
        {/* Tres botones del mismo ancho (el del más largo) y estilo:
            ninguno destaca sobre los demás. */}
        <div className="mt-4 grid grid-flow-col auto-cols-fr gap-2 sm:ml-auto sm:w-fit">
          <Button onClick={() => saveConsent(NONE)}>{t("banner.reject")}</Button>
          <Button onClick={openConsentSettings}>{t("banner.configure")}</Button>
          <Button onClick={() => saveConsent(ALL)}>{t("banner.accept")}</Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Segunda capa, en un <dialog> nativo modal: atrapa el foco, Escape lo
 * cierra sin guardar nada y al cerrarse devuelve el foco a quien lo abrió.
 */
function ConsentSettings({
  open,
  current,
}: {
  open: boolean;
  current: ConsentCategories;
}) {
  const { t } = useTranslation("cookie-consent");
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [choice, setChoice] = useState(current);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // Cada apertura parte de la decisión guardada (o de todo desmarcado).
      setChoice(current);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, current]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={closeConsentSettings}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/50"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <h2 id={titleId} className="text-lg font-semibold">
            {t("settings.title")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("settings.intro")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("settings.close")}
          onClick={closeConsentSettings}
          className="shrink-0"
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>

      <div className="divide-y divide-border">
        {CATEGORIES.map(({ key, cookies }) => {
          const inputId = `cookie-consent-${key}`;
          return (
            <section key={key} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold">
                  {key === "necessary" ? (
                    t(`categories.${key}.title`)
                  ) : (
                    <label htmlFor={inputId}>{t(`categories.${key}.title`)}</label>
                  )}
                </h3>
                {key === "necessary" ? (
                  <span className="text-xs font-medium text-muted-foreground">
                    {t("settings.alwaysActive")}
                  </span>
                ) : (
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={choice[key]}
                    onChange={(e) =>
                      setChoice({ ...choice, [key]: e.target.checked })
                    }
                    aria-describedby={`${inputId}-description`}
                    className="h-4 w-4 cursor-pointer accent-primary"
                  />
                )}
              </div>
              <p
                id={`${inputId}-description`}
                className="mt-1 text-sm leading-relaxed text-muted-foreground"
              >
                {t(`categories.${key}.description`)}
              </p>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  {t("settings.showCookies", { count: cookies.length })}
                </summary>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-muted-foreground">
                      <tr>
                        <th className="py-1 pr-3 font-medium">{t("settings.columns.name")}</th>
                        <th className="py-1 pr-3 font-medium">{t("settings.columns.provider")}</th>
                        <th className="py-1 pr-3 font-medium">{t("settings.columns.purpose")}</th>
                        <th className="py-1 font-medium">{t("settings.columns.duration")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookies.map((c) => (
                        <tr key={c.id} className="border-t border-border align-top">
                          <td className="py-1.5 pr-3 font-mono">{c.name}</td>
                          <td className="py-1.5 pr-3">{c.provider}</td>
                          <td className="py-1.5 pr-3">{t(`cookies.${c.id}.purpose`)}</td>
                          <td className="py-1.5 whitespace-nowrap">{t(`cookies.${c.id}.duration`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </section>
          );
        })}
      </div>

      <div className="border-t border-border p-5">
        <div className="grid gap-2 sm:ml-auto sm:w-fit sm:grid-flow-col sm:auto-cols-fr">
          <Button onClick={() => saveConsent(NONE)}>{t("settings.rejectAll")}</Button>
          <Button onClick={() => saveConsent(choice)}>{t("settings.save")}</Button>
          <Button onClick={() => saveConsent(ALL)}>{t("settings.acceptAll")}</Button>
        </div>
      </div>
    </dialog>
  );
}

/** «Configurar cookies» del pie: reabre la segunda capa para cambiar o retirar el consentimiento. */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </button>
  );
}
