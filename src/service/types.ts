export const DictCurrency = {
  USD: "$",
  EUR: "€",
  KZT: "₸",
  RUR: "₽",
};

type AreaDict = {
  [key: string]: number | null;
};

export const DictArea: AreaDict = {
  "all-region": null,
  moscow: 1,
  petersburg: 2,
};

export type CurrencyCode = keyof typeof DictCurrency;
export type DictArea = keyof typeof DictArea;
