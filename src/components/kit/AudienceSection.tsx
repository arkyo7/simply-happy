import { Check } from "lucide-react";

const items = [
  "Chegou recentemente à Bélgica.",
  "Mora na Bélgica e ainda não sabe onde procurar trabalho.",
  "Precisa organizar ou melhorar seu currículo.",
  "Tem dificuldade para escrever mensagens profissionais.",
  "Quer conhecer sites e agências de emprego.",
  "Precisa de um plano simples para começar.",
  "Quer economizar tempo de pesquisa.",
];

export function AudienceSection() {
  return (
    <section id="para-quem" className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:py-28">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Este kit foi feito para você que…
        </h2>

        <ul className="mt-12 grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-belgium-yellow" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
