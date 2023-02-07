export type State = {
  id: number;
  uf: string;
  name: string;
};

export type City = {
  id: number;
  name: string;
  stateId: number;
};

export type ViaCepPayload = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
