import { createFileRoute } from "@tanstack/react-router";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
  SellerDetails,
} from "@/components/legal/LegalPageLayout";
import { legalConfig } from "@/config/legalConfig";
import { absoluteUrl } from "@/config/siteConfig";

const title = "Política de privacidade | Kit Emprego Bélgica 2026";
const description =
  "Como os dados pessoais podem ser tratados na compra do Kit Emprego Bélgica 2026: finalidades, compartilhamento, conservação e direitos.";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        property: "og:title",
        content: "Política de privacidade | Kit Emprego Bélgica 2026",
      },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/privacidade") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/privacidade") }],
  }),
});

function PrivacidadePage() {
  const email = legalConfig.seller.email;

  return (
    <LegalPageLayout title="Política de privacidade">
      <LegalSection title="1. Responsável pelo tratamento">
        <SellerDetails />
      </LegalSection>

      <LegalSection title="2. Dados que poderão ser coletados">
        <p>Durante uma futura compra, poderão ser tratados:</p>
        <LegalList
          items={[
            "Nome.",
            "E-mail.",
            "Telefone, quando solicitado.",
            "Endereço de faturamento, quando necessário.",
            "País.",
            "Informações relacionadas à transação.",
            "Mensagens enviadas ao suporte.",
            "Dados técnicos básicos necessários ao funcionamento e à segurança do site.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Dados de pagamento">
        <LegalList
          items={[
            "O pagamento será processado por um provedor externo.",
            "O site não armazena números completos de cartão.",
            "Informações sensíveis de pagamento são tratadas pelo processador de pagamentos.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Finalidades">
        <LegalList
          items={[
            "Processar o pagamento.",
            "Entregar o produto.",
            "Confirmar a compra.",
            "Atender solicitações de suporte.",
            "Prevenir fraude.",
            "Cumprir obrigações fiscais, contábeis ou legais.",
            "Defender direitos em caso de disputa.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Compartilhamento">
        <p>Os dados podem ser compartilhados apenas quando necessário com:</p>
        <LegalList
          items={[
            "Processador de pagamento.",
            "Provedor de hospedagem.",
            "Ferramenta de entrega do produto.",
            "Prestadores técnicos.",
            "Autoridades públicas, quando legalmente exigido.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Conservação">
        <p>
          Os dados são mantidos somente pelo tempo necessário às finalidades descritas. Alguns dados
          de transação podem precisar ser preservados por obrigações legais e contábeis.
        </p>
      </LegalSection>

      <LegalSection title="7. Direitos do titular">
        <p>Quando aplicável, o usuário pode:</p>
        <LegalList
          items={[
            "Solicitar acesso.",
            "Solicitar correção.",
            "Solicitar eliminação.",
            "Solicitar limitação do tratamento.",
            "Solicitar portabilidade.",
            "Apresentar oposição.",
            "Fazer uma reclamação à autoridade competente.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Segurança">
        <p>
          São adotadas medidas razoáveis para proteger os dados tratados. Nenhum sistema, porém,
          pode garantir segurança absoluta.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies e analytics">
        <LegalList
          items={[
            "Atualmente o site não utiliza cookies publicitários.",
            "Atualmente o site não utiliza Google Analytics nem Meta Pixel.",
            "Esta política será atualizada caso ferramentas de marketing ou analytics sejam adicionadas.",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Venda de dados">
        <p>Dados pessoais não são vendidos a anunciantes.</p>
      </LegalSection>

      <LegalSection title="11. Contato">
        {email ? (
          <p>
            Para exercer seus direitos, escreva para{" "}
            <a
              href={`mailto:${email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {email}
            </a>
            .
          </p>
        ) : (
          <p>O canal oficial de contato será publicado nesta página.</p>
        )}
      </LegalSection>
    </LegalPageLayout>
  );
}
