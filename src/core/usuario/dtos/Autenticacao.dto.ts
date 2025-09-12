export type TokensAutenticacao = {
  accessToken: string;
  refreshToken: string;
};

export type PropsAutenticacao = {
  nome: string;
  email: string;
  senha?: string;
  provedor: "interno" | "google";
  provedorId?: string;
};
