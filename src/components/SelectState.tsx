import React from 'react';
import { State } from "../lib/types";

type SelectStateProps = {
  states: State[] | undefined; // undefined = não carregado
  stateId: number | undefined; // undefined = não selecionado
  setStateId: (stateId: number | undefined) => void;
};

const SelectState: React.FC<SelectStateProps> = ({ states, stateId, setStateId }) => {
  return (
    <select
      name="stateId"
      className="text-slate-700 px-4 py-2"
      disabled={states === undefined}
      value={stateId ?? ''}
      onChange={(ev) => {
        const value = ev.currentTarget.value;

        if (value === '')
          setStateId(undefined);
        else
          setStateId(+value);
      }}
    >
      <option value=""></option>
      {states && states.map((state) => (
        <option key={state.id} value={state.id}>{state.name} ({state.id})</option>
      ))}
    </select>
  );
};

export default React.memo(SelectState);
