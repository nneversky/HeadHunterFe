export const DictCurrency = {
  USD: "$",
  EUR: "€",
  KZT: "₸",
  RUR: "₽",
};

export type CurrencyCode = keyof typeof DictCurrency;