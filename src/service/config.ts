export const config: ApiConfig = {
  baseUrl: "https://api.hh.ru/vacancies",
  defaultParams: {
    industry: 7,
    professional_role: 96,
    per_page: 5,
  },
};

export const linkTg = "https://t.me/nneversky";

interface ApiConfig {
  baseUrl: string;
  defaultParams: {
    industry: number;
    professional_role: number;
    per_page: number;
    [key: string]: string | number;
  };
}
