export function formatBRL(value: number | null) {
  return value === null
    ? "Sob consulta"
    : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

