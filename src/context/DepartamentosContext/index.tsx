import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import { useApi } from "../../hooks/api";

const DepartamentosContext = createContext({} as Record<string, any>);

export default function DepartamentosProvider({ children }: PropsWithChildren) {
  const departamentoApi = useApi("departamento");

  const [departamentos, setDepartamentos] = useState([] as any[]);
  const [currentDepartamento, setCurrentDepartamento] = useState(
    null as null | Record<string, any>
  );

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCurrentDepartamento(null);
  }, []);

  const novoDepartamento = useCallback(() => {
    setCurrentDepartamento(null);
    handleShowModal();
  }, [handleShowModal]);

  const editarDepartamento = useCallback(
    (departamento: any) => {
      setCurrentDepartamento(departamento);
      handleShowModal();
    },
    [handleShowModal]
  );

  const loadDepartamentos = useCallback(() => {
    departamentoApi.all().then((data) => {
      setDepartamentos(data);
    });
  }, [departamentoApi]);

  const salvarDepartamento = useCallback(
    async (event: SubmitEvent) => {
      event.preventDefault();
      const data = Object.fromEntries(
        new FormData(event.target as HTMLFormElement).entries()
      ) as Record<string, any>;

      // FIXME: deve ser tratado no backend
      data.auditoria = { dataRegistro: new Date() };

      try {
        await departamentoApi.createOrUpdateOne(data);
        handleCloseModal();
        loadDepartamentos();
      } catch (err) {
        console.error(err);
        alert("Erro ao salvar departamento");
      }

      event.preventDefault();
    },
    [departamentoApi, handleCloseModal, loadDepartamentos]
  );

  const excluirDepartamento = useCallback(
    async (id: string) => {
      try {
        await departamentoApi.delete(id);
        loadDepartamentos();
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir departamento");
      }
    },
    [departamentoApi, loadDepartamentos]
  );

  useEffect(() => {
    loadDepartamentos();
  }, [loadDepartamentos]);

  return (
    <DepartamentosContext.Provider
      value={{
        departamentos,
        setDepartamentos,
        novoDepartamento,
        editarDepartamento,
        salvarDepartamento,
        loadDepartamentos,
        excluirDepartamento,
        showModal,
        handleCloseModal,
        currentDepartamento,
      }}
    >
      {children}
    </DepartamentosContext.Provider>
  );
}

export function useDepartamentos() {
  return useContext(DepartamentosContext);
}
