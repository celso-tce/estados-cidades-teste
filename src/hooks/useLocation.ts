import React from "react";
import { loadCitiesForState, loadStates, loadViaCep } from "../lib/loaders";
import { City, State } from "../lib/types";

export function useLocation() {
  const [states, setStates] = React.useState<State[]>();
  const [cities, setCities] = React.useState<City[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [stateSelected, _setStateSelected] = React.useState<State>();
  const [citySelected, setCitySelected] = React.useState<City>();

  React.useEffect(() => {
    setIsLoading(true);

    loadStates()
      .then(setStates)
      .finally(() => setIsLoading(false));
  }, []);

  const setStateSelected = React.useCallback((stateSelected: State | undefined) => {
    _setStateSelected(stateSelected);

    if (states === undefined)
      return;

    setCities(undefined);
    setCitySelected(undefined);

    if (stateSelected === undefined) {
      return;
    }

    loadCitiesForState(stateSelected.id)
      .then(setCities);
  }, [states]);

  const loadForCep = React.useCallback((cep: string) => {
    if (states === undefined)
      return;

    setIsLoading(true);
    _setStateSelected(undefined);
    setCitySelected(undefined);
    setCities(undefined);

    loadViaCep(cep).then((viaCep) => {
      const state = states.find((state) => state.uf === viaCep.uf);
      if (state === undefined)
        return;

      return loadCitiesForState(state.id).then((cities) => {
        setCities(cities);

        if (cities === undefined)
          return;

        _setStateSelected(state);
        const city = cities.find((city) => {
          return city.name.toLowerCase() === viaCep.localidade.toLowerCase();
        });
        setCitySelected(city);
      });
    }).finally(() => setIsLoading(false));
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
