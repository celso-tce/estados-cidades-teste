import React from "react";
import { loadCitiesForState } from "../lib/loaders";
import { City } from "../lib/types";

export function useCities(stateId: number | undefined) {
  const [cities, setCities] = React.useState<City[]>();

  React.useEffect(() => {
    setCities(undefined);

    if (stateId === undefined)
      return;

    console.log(`Carregando cidades para o estado: ${stateId}`);
    loadCitiesForState(stateId).then(setCities);
  }, [stateId]);

  return cities;
}
