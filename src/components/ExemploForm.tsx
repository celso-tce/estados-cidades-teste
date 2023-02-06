import React, { FormEvent } from 'react';
import { useLocation } from "../hooks/useLocation";
import CepLoader from "./CepLoader";
import SelectCity from "./SelectCity";
import SelectState from "./SelectState";

type ExemploFormProps = {};

const ExemploForm: React.FC<ExemploFormProps> = (props) => {
  const location = useLocation();

  const onSubmitForm = React.useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    alert(`Estado: ${location.stateSelected?.name}; Cidade: ${location.citySelected?.name}`);
  }, [location.stateSelected, location.citySelected]);

  return (
    <form onSubmit={onSubmitForm}>
      <div className="flex flex-col space-y-4">
        <CepLoader
          onLoadCep={location.loadForCep}
          loadButtonEnabled={location.states !== undefined}
        />

        <SelectState
          states={location.states}
          stateSelected={location.stateSelected}
          setStateSelected={location.setStateSelected}
          disabled={location.isLoading}
        />

        <SelectCity
          cities={location.cities}
          citySelected={location.citySelected}
          setCitySelected={location.setCitySelected}
        />

        <button className="border border-white px-4 py-2">Enviar</button>
      </div>
    </form>
  );
};

export default React.memo(ExemploForm);
