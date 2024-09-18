import { Button } from "@/components/ui/button";
import Link from "next/link";

const BUTTONS = [
  { text: "Ver funcionalidades", href: "#", variant: "default" as const },
  { text: "Agendar demo", href: "#", variant: "outline" as const },
];

export default function CallToAction() {
  return (
    <section id="cta">
      <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h2 className="font-mono text-[14px] font-medium tracking-tight text-primary">
            Sttok
          </h2>

          <h4 className="mx-auto mb-2 max-w-3xl text-balance text-[42px] font-medium tracking-tighter">
            Software de Gestión de Sociedades
          </h4>
        </div>

        <div className="space-y-4 text-center">
          <p className="mx-auto max-w-[700px] text-balance text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Conoce cómo Sttok puede ayudarte en la gestión societaria según tus
            necesidades y ahorra tiempo y evita errores con el software líder en
            gestión de sociedades.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            {BUTTONS.map((button, index) => (
              <Button key={index} variant={button.variant} asChild>
                <Link href={button.href} prefetch={false}>
                  {button.text}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
