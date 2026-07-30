import { createFileRoute } from "@tanstack/react-router";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
  SellerDetails,
} from "@/components/legal/LegalPageLayout";
import { legalConfig } from "@/config/legalConfig";
import { absoluteUrl } from "@/config/siteConfig";

const title = "Termos de uso | Kit Emprego Bélgica 2026";
const description =
  "Termos de uso do produto digital Kit Emprego Bélgica 2026: licença, entrega, natureza informativa e direitos do consumidor.";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Termos de uso | Kit Emprego Bélgica 2026" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/termos") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/termos") }],
  }),
});

function TermosPage() {
  const email = legalConfig.seller.email;

  return (
    <LegalPageLayout title="Termos de uso">
      <LegalSection title="1. Identificação do responsável">
        <SellerDetails />
      </LegalSection>

      <LegalSection title="2. Descrição do produto">
        <p>
          O {legalConfig.product.name} é um produto digital entregue em {legalConfig.product.format}
          , com {legalConfig.product.pages} páginas. Não existe envio de material físico.
        </p>
        <p>
          O material reúne informações, modelos, exemplos e orientações sobre a procura de emprego
          na Bélgica.
        </p>
      </LegalSection>

      <LegalSection title="3. Preço e pagamento">
        <LegalList
          items={[
            `Preço atual: ${legalConfig.product.price}.`,
            "Pagamento único, sem assinatura mensal.",
            "O pagamento será processado por um provedor externo quando o checkout estiver ativo.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Forma de entrega">
        <LegalList
          items={[
            "A entrega é eletrônica.",
            legalConfig.product.delivery,
            "O método exato de entrega será definido durante a integração do checkout.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Licença de uso">
        <p>
          A compra concede uma licença pessoal, limitada, individual e intransferível para uso do
          material para fins pessoais. A compra não transfere direitos autorais.
        </p>
      </LegalSection>

      <LegalSection title="6. Usos proibidos">
        <LegalList
          items={[
            "Compartilhar o arquivo publicamente.",
            "Revender o PDF.",
            "Distribuir cópias.",
            "Disponibilizar o arquivo em grupos.",
            "Reproduzir o conteúdo para criar um produto concorrente.",
            "Remover avisos de propriedade intelectual.",
            "Utilizar o conteúdo para atividades ilegais.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Propriedade intelectual">
        <p>
          Textos, estrutura, design e materiais do produto são protegidos. O conteúdo não pode ser
          copiado ou comercializado sem autorização.
        </p>
      </LegalSection>

      <LegalSection title="8. Natureza informativa">
        <LegalList
          items={[
            "O produto oferece orientação e organização da procura por emprego.",
            "O produto não garante emprego.",
            "O produto não garante entrevista.",
            "O produto não garante contratação.",
            "O produto não substitui orientação jurídica, fiscal ou migratória.",
            "Cada pessoa é responsável por verificar sua situação legal e documental.",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Responsabilidade do comprador">
        <LegalList
          items={[
            "Adaptar seu currículo.",
            "Verificar as informações antes de se candidatar.",
            "Respeitar as regras de imigração e de trabalho.",
            "Confirmar os requisitos de cada vaga.",
            "Não apresentar informações ou documentos falsos.",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Compatibilidade">
        <p>
          O produto é fornecido em PDF. {legalConfig.product.compatibility} O comprador deve
          verificar se consegue abrir arquivos PDF antes da compra.
        </p>
      </LegalSection>

      <LegalSection title="11. Garantia de funcionamento do arquivo">
        <p>Situações como as listadas abaixo devem ser analisadas e corrigidas pelo suporte:</p>
        <LegalList
          items={[
            "Arquivo corrompido.",
            "Link de entrega inválido.",
            "Falha técnica de acesso.",
            "Cobrança duplicada.",
            "Produto diferente do descrito.",
          ]}
        />
      </LegalSection>

      <LegalSection title="12. Direito de desistência e conteúdo digital">
        <LegalList
          items={[
            "Os direitos obrigatórios do consumidor continuam aplicáveis.",
            "Conteúdos digitais podem possuir regras específicas.",
            "O acesso imediato ao produto pode depender de consentimento expresso.",
            "O comprador poderá precisar reconhecer que o início do acesso ou download pode afetar seu direito de desistência.",
            "A implementação desse consentimento será feita no checkout.",
          ]}
        />
      </LegalSection>

      <LegalSection title="13. Alterações do produto">
        <p>
          O material poderá receber atualizações. A compra não garante acesso vitalício a todas as
          futuras versões, salvo se isso for expressamente oferecido.
        </p>
      </LegalSection>

      <LegalSection title="14. Suporte e contato">
        {email ? (
          <p>
            Para suporte, entre em contato pelo e-mail{" "}
            <a
              href={`mailto:${email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {email}
            </a>
            .
          </p>
        ) : (
          <p>O canal oficial de suporte será publicado nesta página.</p>
        )}
      </LegalSection>

      <LegalSection title="15. Legislação e direitos do consumidor">
        <p>
          Os direitos obrigatórios previstos pela legislação aplicável permanecem preservados.
          Nenhuma cláusula destes termos deve eliminar direitos que não possam ser legalmente
          excluídos.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
