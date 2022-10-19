import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import { useApi } from "../../hooks/api";
import { useCategorias } from "../CategoriasContext";
import { useDepartamentos } from "../DepartamentosContext";

const PatrimoniosContext = createContext({} as Record<string, any>);

export default function PatrimoniosProvider({ children }: PropsWithChildren) {
  const patrimonioApi = useApi("patrimonio");

  const { departamentos } = useDepartamentos();
  const { categorias } = useCategorias();

  const [patrimonios, setPatrimonios] = useState([] as any[]);
  const [currentPatrimonio, setCurrentPatrimonio] = useState(
    null as null | Record<string, any>
  );

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCurrentPatrimonio(null);
  }, []);

  const novoPatrimonio = useCallback(() => {
    setCurrentPatrimonio(null);
    handleShowModal();
  }, [handleShowModal]);

  const editarPatrimonio = useCallback(
    (patrimonio: any) => {
      setCurrentPatrimonio(patrimonio);
      handleShowModal();
    },
    [handleShowModal]
  );

  const loadPatrimonios = useCallback(() => {
    patrimonioApi.all().then((data) => {
      setPatrimonios(data);
    });
    // Usa "departamentos" e "categorias" como dependencia para
    // carregar novamente os patrimônios, pois na prática eles são dependencias
    // implicitas. Essa não é a melhor forma de resolver essa situação, mas é
    // a mais rápida
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patrimonioApi, departamentos, categorias]);

  const salvarPatrimonio = useCallback(
    async (event: SubmitEvent) => {
      event.preventDefault();
      const data = Object.fromEntries(
        new FormData(event.target as HTMLFormElement).entries()
      ) as Record<string, any>;

      // FIXME: deve ser tratado no backend
      data.auditoria = { dataRegistro: new Date() };

      // Prepara para o backend
      if (data.departamento != null) {
        data.departamento = { id: data.departamento };
      }
      if (data.categorias != null) {
        const categorias = JSON.parse(data.categorias) as string[];
        data.categorias = categorias.map((id) => ({ id }));
      }

      try {
        await patrimonioApi.createOrUpdateOne(data);
        handleCloseModal();
        loadPatrimonios();
      } catch (err) {
        console.error(err);
        alert("Erro ao salvar patrimonio");
      }

      event.preventDefault();
    },
    [patrimonioApi, handleCloseModal, loadPatrimonios]
  );

  const excluirPatrimonio = useCallback(
    async (id: string) => {
      try {
        await patrimonioApi.delete(id);
        loadPatrimonios();
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir patrimonio");
      }
    },
    [patrimonioApi, loadPatrimonios]
  );

  useEffect(() => {
    loadPatrimonios();
  }, [loadPatrimonios]);

  return (
    <PatrimoniosContext.Provider
      value={{
        patrimonios,
        setPatrimonios,
        novoPatrimonio,
        editarPatrimonio,
        salvarPatrimonio,
        loadPatrimonios,
        excluirPatrimonio,
        showModal,
        handleCloseModal,
        currentPatrimonio,
      }}
    >
      {children}
    </PatrimoniosContext.Provider>
  );
}

export function usePatrimonios() {
  return useContext(PatrimoniosContext);
}
