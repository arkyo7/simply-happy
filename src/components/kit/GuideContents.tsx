import { Search, FileText, MessagesSquare, ScrollText, CalendarCheck } from "lucide-react";

const blocks = [
  {
    icon: Search,
    title: "Onde procurar oportunidades",
    text: "Serviços públicos, sites de vagas, agências de trabalho temporário e candidaturas diretamente nas empresas.",
  },
  {
    icon: FileText,
    title: "CV e candidatura",
    text: "Orientações para organizar seu currículo, adaptar suas informações e evitar erros comuns.",
  },
  {
    icon: MessagesSquare,
    title: "Mensagens e entrevistas",
    text: "Exemplos de mensagens profissionais, carta de motivação e preparação para conversar com recrutadores.",
  },
  {
    icon: ScrollText,
    title: "Documentos, contratos e direitos",
    text: "Informações iniciais sobre autorização para trabalhar, contratos, salários e direitos.",
  },
  {
    icon: CalendarCheck,
    title: "Plano de ação",
    text: "Um caminho organizado de 14 dias para sair da leitura e começar a enviar candidaturas.",
  },
];

export function GuideContents() {
  return (
    <section id="conteudo" className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:py-28">
        <div className="max-w-[46ch]">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Tudo o que você precisa para começar, organizado em um único guia.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            O Kit Emprego Bélgica 2026 reúne as principais informações para você organizar sua
            procura por trabalho.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {blocks.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={i === 3 ? "md:col-start-1 lg:col-start-1" : undefined}>
              <Icon className="h-5 w-5 text-belgium-yellow" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
