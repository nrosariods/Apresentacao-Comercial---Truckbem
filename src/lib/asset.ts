export function asset(path: string) {
  return `public/${path.replace(/^\//, "")}`;
}
