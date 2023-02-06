import React from 'react';
import { City } from "../lib/types";

type SelectCityProps = {
  cities: City[] | undefined; // undefined = lista carregando
  citySelected: City | undefined; // undefined = não selecionado
  setCitySelected: (city: City | undefined) => void;
  disabled?: boolean;
};

const SelectCity: React.FC<SelectCityProps> = ({
  cities,
  citySelected,
  setCitySelected,
  disabled,
}) => {
  return (
    <select
      name="cityId"
      className="text-slate-700 px-4 py-2"
      disabled={disabled || cities === undefined}
      value={citySelected?.id ?? ''}
      onChange={(ev) => {
        const value = ev.currentTarget.value;

        if (value === '')
          setCitySelected(undefined);
        else
          setCitySelected(cities?.find((city) => city.id === +value));
      }}
    >
      <option value=""></option>
      {cities && cities.map((city) => (
        <option key={city.id} value={city.id}>{city.name} ({city.id})</option>
      ))}
    </select>
  );
};

export default React.memo(SelectCity);
