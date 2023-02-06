import React from 'react';
import { City } from "../lib/types";

type SelectCityProps = {
  cities: City[] | undefined; // undefined = lista carregando
  cityId: number | undefined; // undefined = não selecionado
  setCityId: (cityId: number | undefined) => void;
};

const SelectCity: React.FC<SelectCityProps> = ({ cities, cityId, setCityId }) => {
  return (
    <select
      name="cityId"
      className="text-slate-700 px-4 py-2"
      disabled={cities === undefined}
      value={cityId}
      onChange={(ev) => {
        const value = ev.currentTarget.value;

        if (value === '')
          setCityId(undefined);
        else
          setCityId(+value);
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
