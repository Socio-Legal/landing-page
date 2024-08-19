/* eslint-disable react/no-unescaped-entities */
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { StarFilledIcon } from "@radix-ui/react-icons";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <img
        src={img}
        className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Gerard Garcia",
    role: "CEO | Deale",
    img: "https://www.sttok.com/wp-content/uploads/2024/01/descarga.jpg",
    description: (
      <p>
        "Sttok nos permite gestionar de forma efectiva planes de incentivos para
        empleados, libro de socios, simulación de operaciones y juntas de
        accionistas."
      </p>
    ),
  },
  {
    name: "Eric Gracia",
    role: "Abogado | Derecho.com",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-derechocom-bg-300x300.jpg",
    description: (
      <p>
        "Sttok me ha permitido tener toda la documentación mercantil de las
        sociedades que gestiono a mano. Quedan atrás Excels y carpetas donde
        costaba hacer seguimiento. Lo mejor es su usabilidad, muy intuitivo y
        user-friendly."
      </p>
    ),
  },
  {
    name: "Oriol Miralbell",
    role: "CEO y Fundador | Legal Pigeon",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-legal-pigeon-bg-300x300.jpg",
    description: (
      <p>
        "Sttok es una aplicación que ha llegado para facilitar la vida de
        abogados, empresas, inversores y emprendedores. La interfaz de la
        aplicación es sencilla e intuitiva, lo que hace que el proceso de llevar
        un seguimiento de tu sociedad sea mucho más fácil."
      </p>
    ),
  },
  {
    name: "Lucía Bauza",
    role: "Head of Legal & Compliance | Factorial",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-factorial-bg-300x300.jpg",
    description: (
      <p>
        "Para gestionar toda la documentación de planes de incentivos nos ha
        ayudado a digitalizar el proceso de creación, firma y control de los
        beneficiarios."
      </p>
    ),
  },
  {
    name: "Eduardo Manchón",
    role: "CEO | Mailtrack",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-mailtrack-bg-1-300x300.jpg",
    description: (
      <p>
        "Sttok nos sirve para poder tener organizada toda la información sobre
        socios, escrituras y planes de incentivos de nuestra empresa. Nos
        facilita la gestión del captable y la relación con los inversores."
      </p>
    ),
  },
  {
    name: "Amalia Riboldi",
    role: "Head of People & Cultura | Yaba",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-yaba-bg-300x300.jpg",
    description: (
      <p>
        "Sttok definitivamente fue nuestra mejor opción y nos está ayudando con
        la gestión de los Planes de Incentivos y con la transparencia de la
        información societaria con los Socios."
      </p>
    ),
  },
  {
    name: "Toni de Weest",
    role: "Abogado Socio | Broseta",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-broseta-bg-300x300.jpg",
    description: (
      <p>
        "Utilizamos Sttok para gestionar digitalmente libros de socios de forma
        eficiente evitando tareas manuales inecesarias. Así podemos centrarnos
        en aportar valor a nuestros clientes."
      </p>
    ),
  },
  {
    name: "Patricia Manca",
    role: "Socia responsable de NewLaw en PwC Tax & Legal",
    img: "https://www.sttok.com/wp-content/uploads/2024/05/Screenshot_2.png",
    description: (
      <p>
        "Sttok permite la gestión digital de sociedades, libros de socios,
        planes de incentivos, juntas, etc. Sttok ha participado en el programa
        de aceleración de startups de PwC Tax & Legal, el ‘Tax and Legal Tech
        Springboard’ creado con el objetivo de impulsar, en el mercado español,
        soluciones legaltech y taxtech."
      </p>
    ),
  },
  {
    name: "Nacho González",
    role: "CEO y Fundador | Banktrack",
    img: "https://www.sttok.com/wp-content/uploads/2023/07/logo-banktrack-bg-300x300.jpg",
    description: (
      <p>
        "Ahora con Sttok puedes realizar simulaciones de ampliaciones o notas
        convertibles. Además también gestionamos las phantoms de nuestro equipo
        fácilmente. Finalmente como inversor tengo organizadas mis participadas
        y conozco claramente qué es lo que tengo."
      </p>
    ),
  },
];

export function MarqueeDemo() {
  return (
    <section id="testimonials">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            TESTIMONIO DE CLIENTES
          </h3>
          <div className="relative mt-6 max-h-[650px] overflow-hidden">
            <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-3">
              {Array(Math.ceil(testimonials.length / 3))
                .fill(0)
                .map((_, i) => (
                  <Marquee
                    vertical
                    key={i}
                    className={cn({
                      "[--duration:60s]": i === 1,
                      "[--duration:30s]": i === 2,
                      "[--duration:70s]": i === 3,
                    })}
                  >
                    {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                      <TestimonialCard {...card} key={idx} />
                    ))}
                  </Marquee>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20% dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
