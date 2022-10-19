import { Button, Container, Form, Table } from "react-bootstrap";
import ModalForm from "../../components/ModalForm";
import { useCategorias } from "../../context/CategoriasContext";

function CategoriasPage() {

    const {
        categorias,
        novaCategoria,
        editarCategoria,
        showModal,
        handleCloseModal,
        salvarCategoria,
        excluirCategoria
    } = useCategorias();

    return (
        <Container className="mt-4">
            <h1>Cadastro de Categoria</h1>

            <Button variant="secondary" onClick={novaCategoria}>Novo</Button>

            <br /><br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Data registro</th>
                        <th>Data última edição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map(
                            (categoria: any) => {
                                return <tr key={categoria.id}>
                                    <td>{categoria.id}</td>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.auditoria.dataRegistro}</td>
                                    <td>{categoria.auditoria.dataUltEdicao || '-'}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => editarCategoria(categoria)}>Editar</Button> {' '}
                                        <Button variant="outline-secondary" onClick={() => excluirCategoria(categoria.id)}>Excluir</Button>
                                    </td>
                                </tr>
                            }
                        )
                    }
                </tbody>
            </Table>


            <ModalForm
                title='Edição Registro'
                showModal={showModal}
                closeModal={handleCloseModal}
            >
                <Form id='myForm' onSubmit={salvarCategoria}>

                </Form>
            </ModalForm>
        </Container>
    )
}

export default CategoriasPage;