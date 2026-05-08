export interface IViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  erro?: "true";
}

export interface IViaCepService {
  lookup: (cep: string) => Promise<IViaCepResponse>;
}
