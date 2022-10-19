import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import { useApi } from "../../hooks/api";

const CategoriasContext = createContext({} as Record<string, any>);

export default function CategoriasProvider({ children }: PropsWithChildren) {
  const categoriaApi = useApi("categoria");

  const [categorias, setCategorias] = useState([] as any[]);
  const [currentCategoria, setCurrentCategoria] = useState(
    null as null | Record<string, any>
  );

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = useCallback(() => setShowModal(true), []);
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCurrentCategoria(null);
  }, []);

  const novaCategoria = useCallback(() => {
    setCurrentCategoria(null);
    handleShowModal();
  }, [handleShowModal]);

  const editarCategoria = useCallback(
    (categoria: any) => {
      setCurrentCategoria(categoria);
      handleShowModal();
    },
    [handleShowModal]
  );

  const loadCategorias = useCallback(() => {
    categoriaApi.all().then((data) => {
      setCategorias(data);
    });
  }, [categoriaApi]);

  const salvarCategoria = useCallback(
    async (event: SubmitEvent) => {
      event.preventDefault();
      const data = Object.fromEntries(
        new FormData(event.target as HTMLFormElement).entries()
      ) as Record<string, any>;

      // FIXME: deve ser tratado no backend
      data.auditoria = { dataRegistro: new Date() };

      try {
        await categoriaApi.createOrUpdateOne(data);
        handleCloseModal();
        loadCategorias();
      } catch (err) {
        console.error(err);
        alert("Erro ao salvar categoria");
      }

      event.preventDefault();
    },
    [categoriaApi, handleCloseModal, loadCategorias]
  );

  const excluirCategoria = useCallback(
    async (id: string) => {
      try {
        await categoriaApi.delete(id);
        loadCategorias();
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir categoria");
      }
    },
    [categoriaApi, loadCategorias]
  );

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        setCategorias,
        novaCategoria,
        editarCategoria,
        salvarCategoria,
        loadCategorias,
        excluirCategoria,
        showModal,
        handleCloseModal,
        currentCategoria,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}

export function useCategorias() {
  return useContext(CategoriasContext);
}
