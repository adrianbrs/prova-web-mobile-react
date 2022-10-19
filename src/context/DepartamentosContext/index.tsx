import React, { createContext, useContext, useState, useEffect, PropsWithChildren, useCallback } from "react";
import { useApi } from "../../hooks/api";

const DepartamentosContext = createContext({} as Record<string, any>)

export default function DepartamentosProvider({ children }: PropsWithChildren) {
    const departamentoApi = useApi('departamento')

    const [departamentos, setDepartamentos] = useState([] as any[])

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    function novoDepartamento() {
        handleShowModal();
    }

    function editarDepartamento(departament: any) {
        handleShowModal();
    }

    function salvarDepartamento(event: Event) {

        handleCloseModal();
        event.preventDefault();
    }

    const excluirDepartamento = async (id: string) => {
        try {
            await departamentoApi.delete(id);
            alert('Departamento excluido com sucesso')
            loadDepartamentos();
        } catch (err) {
            console.error(err);
            alert('Erro ao excluir departamento')
        }
    }

    const loadDepartamentos = useCallback(() => {
        departamentoApi.all().then(data => {
            setDepartamentos(data);
        })
    }, [departamentoApi])

    useEffect(
        () => {
            loadDepartamentos();
        }, [loadDepartamentos]
    )

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
            }}
        >
            {children}
        </DepartamentosContext.Provider>
    );
}

export function useDepartamentos() {
    return useContext(DepartamentosContext)
}