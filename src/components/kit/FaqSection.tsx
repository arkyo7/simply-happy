import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "O kit garante que eu vou conseguir emprego?",
    a: "Não. Nenhum material pode garantir uma contratação. O kit oferece informações, modelos e um plano para ajudar você a procurar oportunidades com mais organização.",
  },
  {
    q: "O guia serve somente para quem mora em Bruxelas?",
    a: "Não. O material apresenta serviços e caminhos relacionados às diferentes regiões da Bélgica, incluindo Bruxelas, Flandres, Valônia e a comunidade germanófona.",
  },
  {
    q: "Preciso falar francês para usar o material?",
    a: "Não. O guia está em português. O idioma exigido para trabalhar depende da região, da empresa e da vaga.",
  },
  {
    q: "Como vou receber o produto?",
    a: "Após a confirmação do pagamento, você receberá acesso ao arquivo digital pelo processo configurado no checkout.",
  },
  {
    q: "Posso ler no celular?",
    a: "Sim. O produto é entregue em PDF e pode ser aberto no celular, tablet ou computador.",
  },
  {
    q: "O conteúdo está atualizado?",
    a: "Sim. Esta versão foi preparada com informações atualizadas para 2026.",
  },
  {
    q: "O produto é físico?",
    a: "Não. O Kit Emprego Bélgica 2026 é um produto totalmente digital.",
  },
  {
    q: "Serve para estudantes?",
    a: "O guia possui uma seção dedicada ao trabalho estudantil, mas cada pessoa deve verificar as regras aplicáveis à sua situação.",
  },
];

export function FaqSection() {
  return (
    <section id="duvidas" className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-[760px] px-4 pb-16 pt-20 text-center sm:px-6 md:pb-20 md:pt-28">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Perguntas frequentes
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          Respostas diretas para as dúvidas mais comuns antes da compra.
        </p>

        <Accordion type="single" collapsible className="mt-12 text-left">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-[15px] font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
