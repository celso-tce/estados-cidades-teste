import React from 'react';
import { loadUfFromCep } from "../lib/loaders";

type CepLoaderProps = {
  onLoadUf: (uf: string) => void;
  loadButtonEnabled: boolean; // caso true, ativa o botão de carregar cep
};

const CepLoader: React.FC<CepLoaderProps> = ({ onLoadUf, loadButtonEnabled }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onLoadCep = React.useCallback((cep: string) => {
    setIsLoading(true);

    loadUfFromCep(cep)
      .then(onLoadUf)
      .finally(() => setIsLoading(false));
  }, [onLoadUf]);

  return (
    <div className="flex space-x-2">
      <input
        ref={inputRef}
        type="text"
        name="cep"
        className="grow text-slate-700 px-4 py-2"
        placeholder="CEP"
      />

      <button
        className="border border-white px-4 py-2"
        disabled={!loadButtonEnabled || isLoading}
        onClick={(ev) => {
          ev.preventDefault();
          if (!inputRef.current)
            return;

          onLoadCep(inputRef.current.value);
        }}
      >
        {isLoading ? 'Carregando...' : 'Carregar'}
      </button>
    </div>
  );
};

export default React.memo(CepLoader);
