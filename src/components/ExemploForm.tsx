import React, { FormEvent } from 'react';
import { useCities } from "../hooks/useCities";
import { useStates } from "../hooks/useStates";
import CepLoader from "./CepLoader";
import SelectCity from "./SelectCity";
import SelectState from "./SelectState";

type ExemploFormProps = {};

const ExemploForm: React.FC<ExemploFormProps> = (props) => {
  const [stateId, setStateId] = React.useState<number>();
  const [cityId, setCityId] = React.useState<number>();

  const states = useStates();
  const cities = useCities(stateId);

  const onSubmitForm = React.useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    alert(`Estado: ${stateId}; Cidade: ${cityId}`);
  }, [stateId, cityId]);

  const onLoadUf = React.useCallback((uf: string) => {
    console.log(uf);
    if (!states)
      return;
    setStateId(states.find((state) => state.uf === uf)?.id);
  }, [states]);

  return (
    <form onSubmit={onSubmitForm}>
      <div className="flex flex-col space-y-4">
        <CepLoader onLoadUf={onLoadUf} loadButtonEnabled={states !== undefined} />
        <SelectState states={states} stateId={stateId} setStateId={setStateId} />
        <SelectCity cities={cities} cityId={cityId} setCityId={setCityId} />

        <button className="border border-white px-4 py-2">Enviar</button>
      </div>
    </form>
  );
};

export default React.memo(ExemploForm);
