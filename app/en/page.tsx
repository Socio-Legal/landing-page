// Home en inglés: reutiliza el mismo componente de la landing española. El
// contenido sale en inglés porque el layout raíz monta la instancia i18n "en"
// (middleware fija x-locale=en en /en/*). La metadata la aporta app/en/layout.
import LandingPage from "@/app/(landing)/page";
import JsonLd from "@/components/shared/json-ld";
import { softwareApplicationJsonLd } from "@/lib/structured-data";

// La ficha de producto va aquí y no en app/en/layout.tsx porque ese layout
// envuelve TODAS las rutas /en/*, y estos datos son solo de la home.
export default function EnHomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd("en")} />
      <LandingPage />
    </>
  );
}
