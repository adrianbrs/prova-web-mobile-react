import { Button, Container, Form, Table } from "react-bootstrap";
import { usePatrimonios } from "../../context/PatrimoniosContext";
import ModalForm from "../../components/ModalForm";

function PatrimoniosPage() {

    const {
        patrimonios,
        novoPatrimonio,
        editarPatrimonio,
        showModal,
        handleCloseModal,
        salvarPatrimonio,
        excluirPatrimonio
    } = usePatrimonios();

    return (
        <Container className="mt-4">
            <h1>Cadastro de Patrimonio</h1>

            <Button variant="secondary" onClick={novoPatrimonio}>Novo</Button>

            <br /><br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Descricao</th>
                        <th>Preco</th>
                        <th>Departamento</th>
                        <th>Categorias</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patrimonios.map(
                            (patrimonio: any) => {
                                return <tr key={patrimonio.id}>
                                    <td>{patrimonio.id}</td>
                                    <td>{patrimonio.nome}</td>
                                    <td>{patrimonio.status}</td>
                                    <td>{patrimonio.descricao}</td>
                                    <td>{patrimonio.descricao}</td>
                                    <td>{patrimonio.departamento?.nome || '-'}</td>
                                    <td>{patrimonio.categorias?.map((cat: any) => cat.nome).join(', ') || '-'}</td>
                                    <td>
                                        <Button variant="outline-secondary" onClick={() => editarPatrimonio(patrimonio)}>Editar</Button> {' '}
                                        <Button variant="outline-secondary" onClick={() => excluirPatrimonio(patrimonio.id)}>Excluir</Button>
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
                <Form id='myForm' onSubmit={salvarPatrimonio}>

                </Form>
            </ModalForm>
        </Container>
    )
}

export default PatrimoniosPage;