import { createFileRoute } from "@tanstack/react-router";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout";
import { legalConfig } from "@/config/legalConfig";
import { absoluteUrl } from "@/config/siteConfig";

const title = "Política de reembolso | Kit Emprego Bélgica 2026";
const description =
  "Regras de reembolso e desistência para o produto digital Kit Emprego Bélgica 2026, com direitos do consumidor preservados.";

export const Route = createFileRoute("/reembolso")({
  component: ReembolsoPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        property: "og:title",
        content: "Política de reembolso | Kit Emprego Bélgica 2026",
      },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/reembolso") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/reembolso") }],
  }),
});

function ReembolsoPage() {
  const email = legalConfig.seller.email;

  return (
    <LegalPageLayout title="Política de reembolso">
      <LegalSection title="1. Natureza digital do produto">
        <LegalList
          items={[
            `O ${legalConfig.product.name} é um produto digital.`,
            "Não existe envio físico.",
            "A entrega ocorre eletronicamente.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Direito de desistência">
        <LegalList
          items={[
            "Compras online podem possuir um período legal de desistência, quando aplicável.",
            "Para conteúdo digital fornecido imediatamente existem regras específicas.",
            "O início imediato do acesso ou download pode depender do consentimento expresso do consumidor.",
            "O consumidor poderá precisar reconhecer que o início da execução pode resultar na perda do direito de desistência.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Consentimento no checkout">
        <p>
          Durante a futura integração do checkout deverá existir uma forma clara de o
          comprador:
        </p>
        <LegalList
          items={[
            "Solicitar acesso imediato ao produto.",
            "Concordar com o início da entrega antes do fim do período de desistência.",
            "Reconhecer a consequência desse consentimento.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Situações analisáveis">
        <LegalList
          items={[
            "Cobrança duplicada.",
            "Pagamento confirmado sem entrega.",
            "Arquivo corrompido.",
            "Link inválido.",
            "Impossibilidade técnica causada pelo sistema de entrega.",
            "Produto significativamente diferente da descrição.",
            "Transação não reconhecida, sujeita à investigação.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Problemas de compatibilidade">
        <p>
          O produto é entregue em PDF e o comprador deve possuir um dispositivo
          compatível. O suporte poderá ajudar quando existir um problema real no arquivo.
        </p>
      </LegalSection>

      <LegalSection title="6. Solicitação">
        <p>Uma solicitação deve incluir:</p>
        <LegalList
          items={[
            "Nome utilizado na compra.",
            "E-mail utilizado na compra.",
            "Data aproximada da compra.",
            "Comprovante ou identificador da transação.",
            "Descrição do problema.",
          ]}
        />
        {email ? (
          <p>
            Envie a solicitação para{" "}
            <a
              href={`mailto:${email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {email}
            </a>
            .
          </p>
        ) : (
          <p>O canal oficial para solicitações será publicado nesta página.</p>
        )}
      </LegalSection>

      <LegalSection title="7. Prazo de análise">
        <p>
          As solicitações serão analisadas em prazo razoável, considerando a natureza do
          caso e as informações fornecidas.
        </p>
      </LegalSection>

      <LegalSection title="8. Direitos preservados">
        <p>
          Esta política não elimina direitos obrigatórios do consumidor. Cada caso será
          tratado conforme a legislação aplicável.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
