import React from "react";
import { loadCitiesForState, loadStates, loadUfFromCep } from "../lib/loaders";
import { City, State } from "../lib/types";

export function useLocation() {
  const [states, setStates] = React.useState<State[]>();
  const [cities, setCities] = React.useState<City[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [stateSelected, setStateSelected] = React.useState<State>();
  const [citySelected, setCitySelected] = React.useState<City>();

  React.useEffect(() => {
    setIsLoading(true);

    loadStates()
      .then(setStates)
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (states === undefined || stateSelected === undefined) {
      return;
    }

    setCities(undefined);
    setCitySelected(undefined);

    loadCitiesForState(stateSelected.id)
      .then(setCities);
  }, [states, stateSelected]);

  const loadForCep = React.useCallback((cep: string) => {
    if (states === undefined) {
      return;
    }

    setIsLoading(true);
    setStateSelected(undefined);
    setCitySelected(undefined);
    setCities(undefined);

    loadUfFromCep(cep)
      .then((uf) => {
        const state = states.find((state) => state.uf === uf);
        setStateSelected(state);
      })
      .finally(() => setIsLoading(false));
  }, [states]);

  return {
    states,
    cities,
    stateSelected,
    setStateSelected,
    citySelected,
    setCitySelected,
    isLoading,
    loadForCep,
  };
}
