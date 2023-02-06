import React from "react";
import { loadStates } from "../lib/loaders";
import { State } from "../lib/types";

export function useStates() {
  const [states, setStates] = React.useState<State[]>();

  React.useEffect(() => {
    loadStates().then(setStates);
  }, []);

  return states;
}
