import { createContext, useContext, useState, useEffect, PropsWithChildren, useCallback } from "react";
import { useApi } from "../../hooks/api";

const PatrimoniosContext = createContext({} as Record<string, any>)

export default function PatrimoniosProvider({ children }: PropsWithChildren) {
    const patrimonioApi = useApi('patrimonio')

    const [patrimonios, setPatrimonio] = useState([] as any[])

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    function novoPatrimonio() {
        handleShowModal();
    }

    function editarPatrimonio(patrimonio: any) {
        handleShowModal();
    }

    function salvarPatrimonio(event: Event) {

        handleCloseModal();
        event.preventDefault();
    }

    const excluirPatrimonio = async (id: string) => {
        try {
            await patrimonioApi.delete(id);
            alert('Patrimônio excluido com sucesso')
            loadPatrimonio();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir patrimônio')
        }
    }

    const loadPatrimonio = useCallback(() => {
        patrimonioApi.all().then(async (data) => {
            setPatrimonio(data);
        })
    }, [patrimonioApi])

    useEffect(
        () => {
            loadPatrimonio();
        }, [loadPatrimonio]
    )

    return (
        <PatrimoniosContext.Provider
            value={{
                patrimonios,
                setPatrimonio,
                novoPatrimonio,
                editarPatrimonio,
                salvarPatrimonio,
                loadPatrimonio,
                excluirPatrimonio,
                showModal,
                handleCloseModal,
            }}
        >
            {children}
        </PatrimoniosContext.Provider>
    );
}

export function usePatrimonios() {
    return useContext(PatrimoniosContext)
}