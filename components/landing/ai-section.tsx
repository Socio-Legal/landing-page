"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Shield,
  Lock,
  CheckCircle2,
  FileText,
  Users,
  FileSignature,
  Calculator,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { routes } from "@/config/routes";
import { trackMeetingClick } from "@/lib/analytics";

interface Guardrail {
  title: string;
  description: string;
}

interface Example {
  prompt: string;
  result: string;
  icon: string;
}

const GuardrailIcons = [Globe2, Lock, Shield, CheckCircle2];

const ExampleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  FileText,
  FileSignature,
  Calculator,
};

const AiSection: FC = () => {
  const { t } = useTranslation("home-ai-section");

  const guardrailsData = t("guardrails", { returnObjects: true }) as Guardrail[];
  const guardrails: Guardrail[] = Array.isArray(guardrailsData) ? guardrailsData : [];

  const examplesData = t("examples", { returnObjects: true }) as Example[];
  const examples: Example[] = Array.isArray(examplesData) ? examplesData : [];

  return (
    <section id="ai" className="border-t border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-medium uppercase tracking-widest text-brand mb-3">
            {t("header.slogan")}
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground text-balance sm:text-4xl mb-4">
            {t("header.title")}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground text-balance">
            {t("header.description")}
          </p>
        </div>

        {/* Examples grid: 4 prompt/result cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 max-w-5xl mx-auto">
          {examples.map((example, i) => {
            const Icon = ExampleIcons[example.icon] || Sparkles;
            return (
              <div
                key={i}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                {/* Prompt block */}
                <div className="border-b border-border bg-muted/40 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10">
                      <Icon className="h-4 w-4 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1.5">
                        Pregunta a Sttok AI
                      </p>
                      <p className="text-sm text-foreground leading-snug">
                        {example.prompt}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Result block */}
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-widest text-brand mb-1.5">
                    Respuesta
                  </p>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {example.result}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guardrails strip */}
        <div className="rounded-lg border border-border bg-backgroundbrand p-6 md:p-8 max-w-5xl mx-auto">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Confianza por defecto
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {guardrails.map((g, i) => {
              const Icon = GuardrailIcons[i] || Shield;
              return (
                <div key={i} className="flex flex-col items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{g.title}</p>
                  <p className="text-xs leading-snug text-muted-foreground">
                    {g.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href={routes.APP_CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMeetingClick("ai-section")}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
          >
            Ver Sttok AI en acción en una demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AiSection;
