import { CalendarioDemo } from "@/components/demo/calendario-demo";

export default function Page() {
  return (
    <section id="demo">
      <div className="container mx-auto px-4 pb-16 pt-16 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Demo
          </p>
          <h1 className="mx-auto mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-balance text-foreground sm:text-5xl">
            Una demo de 30 minutos con un experto societario
          </h1>
          <p className="mx-auto mt-6 text-base leading-relaxed text-muted-foreground">
            Elige el día y la hora. Te enseñamos Sttok con los casos de tu
            sociedad: libro de socios, juntas y consejos, comunicaciones y
            firma, planes de incentivos y simulador de operaciones.
          </p>
        </div>
        <CalendarioDemo />
      </div>
    </section>
  );
}
