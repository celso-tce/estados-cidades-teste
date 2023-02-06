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
