export const legalConfig = {
  seller: {
    legalName: "",
    tradeName: "",
    email: "",
    phone: "",
    businessAddress: "",
    enterpriseNumber: "",
    vatNumber: "",
  },

  product: {
    name: "Kit Emprego Bélgica 2026",
    type: "Produto digital em PDF",
    price: "€9,90",
    originalPrice: "€39,90",
    pages: 21,
    format: "PDF",
    delivery: "Acesso digital disponibilizado após a confirmação do pagamento.",
    compatibility: "Pode ser aberto em celular, tablet ou computador com um leitor de PDF.",
  },

  lastUpdated: "30 de julho de 2026",
} as const;

/**
 * Verifica se os dados legais obrigatórios estão preenchidos.
 * Necessário antes de ativar um checkout real.
 */
export function isLegalConfigComplete(): boolean {
  const { legalName, email, phone, businessAddress } = legalConfig.seller;
  return Boolean(legalName.trim() && email.trim() && phone.trim() && businessAddress.trim());
}

export type SellerField = {
  label: string;
  value: string;
};

/** Retorna apenas os dados do vendedor que estão realmente preenchidos. */
export function getVisibleSellerFields(): SellerField[] {
  const s = legalConfig.seller;
  return [
    { label: "Responsável", value: s.legalName },
    { label: "Nome comercial", value: s.tradeName },
    { label: "E-mail", value: s.email },
    { label: "Telefone", value: s.phone },
    { label: "Endereço", value: s.businessAddress },
    { label: "Número de empresa", value: s.enterpriseNumber },
    { label: "Número de IVA", value: s.vatNumber },
  ].filter((f) => f.value.trim().length > 0);
}
