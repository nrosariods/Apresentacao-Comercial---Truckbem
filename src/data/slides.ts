/** pin > 1 = slide com progresso interno (fica fixo até o fim). */
export const SLIDES = [
  { id: "abertura", label: "Abertura", tone: "dark", pin: 1 },
  { id: "quem-somos", label: "Quem somos", tone: "light", pin: 1 },
  { id: "solucoes", label: "Soluções", tone: "light", pin: 2.5 },
  { id: "estrutura", label: "Estrutura", tone: "dark", pin: 1 },
  { id: "malha", label: "Malha", tone: "dark", pin: 1 },
  { id: "frota", label: "Frota", tone: "light", pin: 1 },
  { id: "capacidade", label: "Capacidade", tone: "dark", pin: 1 },
  { id: "modelos", label: "Modelos", tone: "dark", pin: 1 },
  { id: "regioes", label: "Anápolis", tone: "dark", pin: 1 },
  { id: "diferenciais", label: "Diferenciais", tone: "light", pin: 2.8 },
  { id: "contato", label: "Contato", tone: "dark", pin: 1 },
] as const;

export type SlideTone = (typeof SLIDES)[number]["tone"];

export const CONTACT = {
  whatsapp: "https://wa.me/5511997809308?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20a%20opera%C3%A7%C3%A3o%20log%C3%ADstica%20da%20minha%20empresa.",
  whatsappLabel: "+55 11 99780-9308",
  email: "administrativo@truckbem.com.br",
  phoneHref: "tel:+5511997809308",
  phoneLabel: "+55 11 99780-9308",
  site: "https://www.truckbem.com/",
  siteLabel: "www.truckbem.com",
};
