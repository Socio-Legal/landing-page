"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  FileText,
  BarChart3,
  Calculator,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { routes } from "@/config/routes";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const AI_CAPABILITIES = [
  { icon: ListChecks, label: "Listados automáticos de socios y participaciones" },
  { icon: FileText, label: "Generación de documentos y actas en segundos" },
  { icon: BarChart3, label: "Informes de captable y dilución" },
  { icon: Calculator, label: "Cálculos de operaciones: rondas, conversiones" },
  { icon: LayoutDashboard, label: "Dashboards ejecutivos bajo demanda" },
  { icon: Sparkles, label: "Respuestas a preguntas legales sobre tu sociedad" },
];

const AiSection: FC = () => {
  const { t } = useTranslation("common");

  return (
    <section id="ai" className="border-t border-border bg-backgroundbrand">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-brand" />
              Sttok AI
            </div>

            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl">
              Inteligencia artificial integrada en tu gestión societaria
            </h2>

            <p className="text-base leading-relaxed text-muted-foreground text-balance">
              Una capa de IA sobre toda la plataforma que genera listados, documentos, informes y cálculos de operaciones —todo en pocos segundos, sin exportar datos ni cambiar de herramienta.
            </p>

            <Link
              href={routes.APP_CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              Ver Sttok AI en acción
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: capability grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AI_CAPABILITIES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Icon className="h-4 w-4 text-brand" />
                </div>
                <p className="text-sm leading-snug text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;
