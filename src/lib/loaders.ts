import CITIES from "../assets/cities.json";
import STATES from "../assets/states.json";
import { City, State, ViaCepPayload } from "./types";

export async function loadStates(): Promise<State[]> {
  /*await new Promise((resolve) => {
    setTimeout(resolve, 100 + Math.ceil(Math.random() * 1000));
  });*/

  return STATES.map((state) => ({
    id: state.id,
    name: state.name,
    uf: state.uf,
  }));
}

export async function loadCitiesForState(stateId: number): Promise<City[]> {
  /*await new Promise((resolve) => {
    setTimeout(resolve, 100 + Math.ceil(Math.random() * 1000));
  });*/

  return CITIES.filter((city) => city.stateId === stateId).map((city) => ({
    id: city.id,
    name: city.name,
    stateId: city.stateId,
  }));
}

export async function loadViaCep(cep: string): Promise<ViaCepPayload> {
  /*await new Promise((resolve) => {
    setTimeout(resolve, 100 + Math.ceil(Math.random() * 1000));
  });*/

  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json());
}
