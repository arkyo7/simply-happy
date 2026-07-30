const items = [
  "Não garante contratação.",
  "Não substitui orientação jurídica ou migratória.",
  "Não cria documentos falsos.",
  "Não envia candidaturas pela pessoa.",
  "Não substitui cursos de idiomas.",
];

export function TransparencySection() {
  return (
    <section className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-[820px] px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Este material não é uma promessa de emprego.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          O kit oferece informação, modelos, organização e direcionamento. A contratação depende
          das vagas disponíveis, da situação legal, das qualificações, dos idiomas, das
          candidaturas e das decisões de cada empregador.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
          {items.map((i) => (
            <li key={i} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-belgium-red" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
