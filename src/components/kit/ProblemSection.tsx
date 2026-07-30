export function ProblemSection() {
  return (
    <section className="border-t border-border bg-surface-2">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20">
        <h2 className="max-w-[22ch] text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Chegar à Bélgica já é difícil. Procurar emprego sem direção deixa tudo ainda mais
          complicado.
        </h2>

        <div className="max-w-[62ch] space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Talvez você já tenha aberto dezenas de sites, entrado em grupos, perguntado para
            conhecidos e continuado sem saber por onde começar.
          </p>
          <p>
            Qual serviço de emprego atende a sua região? Onde estão as vagas? Como deve ser o
            currículo? O que escrever para uma empresa? O francês é obrigatório? Quais documentos
            podem ser pedidos?
          </p>
          <p>
            Quando essas informações ficam espalhadas, você perde tempo e acaba adiando candidaturas
            que poderia começar hoje.
          </p>
          <p className="border-l-2 border-belgium-yellow pl-5 text-lg font-semibold text-foreground">
            Este kit foi criado para transformar suas dúvidas em um plano claro.
          </p>
        </div>
      </div>
    </section>
  );
}
