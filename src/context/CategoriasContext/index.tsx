import { createContext, useContext, useState, useEffect, PropsWithChildren, useCallback } from "react";
import { useApi } from "../../hooks/api";

const CategoriasContext = createContext({} as Record<string, any>)

export default function CategoriasProvider({ children }: PropsWithChildren) {
    const categoriaApi = useApi('categoria')

    const [categorias, setCategorias] = useState([] as any[])

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    function novaCategoria() {
        handleShowModal();
    }

    function editarCategoria(departament: any) {
        handleShowModal();
    }

    function salvarCategoria(event: Event) {

        handleCloseModal();
        event.preventDefault();
    }

    const excluirCategoria = async (id: string) => {
        try {
            await categoriaApi.delete(id);
            alert('Categoria excluido com sucesso')
            loadCategorias();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir categoria')
        }
    }

    const loadCategorias = useCallback(() => {
        categoriaApi.all().then(data => {
            setCategorias(data);
        })
    }, [categoriaApi])

    useEffect(
        () => {
            loadCategorias();
        }, [loadCategorias]
    )

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
            }}
        >
            {children}
        </CategoriasContext.Provider>
    );
}

export function useCategorias() {
    return useContext(CategoriasContext)
}