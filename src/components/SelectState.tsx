import React from 'react';
import { State } from "../lib/types";

type SelectStateProps = {
  states: State[] | undefined; // undefined = não carregado
  stateSelected: State | undefined; // undefined = não selecionado
  setStateSelected: (state: State | undefined) => void;
  disabled?: boolean;
};

const SelectState: React.FC<SelectStateProps> = ({
  states,
  stateSelected,
  setStateSelected,
  disabled,
}) => {
  return (
    <select
      name="stateId"
      className="text-slate-700 px-4 py-2"
      disabled={disabled || states === undefined}
      value={stateSelected?.id ?? ''}
      onChange={(ev) => {
        const value = ev.currentTarget.value;

        if (value === '')
          setStateSelected(undefined);
        else
          setStateSelected(states?.find((state) => state.id === +value));
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
