/** Caminho absoluto a partir da raiz pública do Vite/Vercel. */
export function asset(path: string) {
  return `/${path.replace(/^\/+/, "")}`;
}
