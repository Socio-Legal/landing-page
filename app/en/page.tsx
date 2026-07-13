// Home en inglés: reutiliza el mismo componente de la landing española. El
// contenido sale en inglés porque el layout raíz monta la instancia i18n "en"
// (middleware fija x-locale=en en /en/*). La metadata la aporta app/en/layout.
export { default } from "@/app/(landing)/page";
