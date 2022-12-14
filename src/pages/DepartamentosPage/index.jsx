import { Button, Container, Form, Table } from "react-bootstrap";
import { useDepartamentos } from "../../context/DepartamentosContext";
import ModalForm from "../../components/ModalForm";

function DepartamentosPage() {
  const {
    departamentos,
    novoDepartamento,
    editarDepartamento,
    showModal,
    handleCloseModal,
    salvarDepartamento,
    excluirDepartamento,
    currentDepartamento,
  } = useDepartamentos();

  return (
    <Container className="mt-4">
      <h1>Cadastro de Departamento</h1>

      <Button variant="secondary" onClick={novoDepartamento}>
        Novo
      </Button>

      <br />
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => {
            return (
              <tr key={departamento.id}>
                <td>{departamento.id}</td>
                <td>{departamento.nome}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => editarDepartamento(departamento)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => excluirDepartamento(departamento.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <ModalForm
        title="Edição Registro"
        showModal={showModal}
        closeModal={handleCloseModal}
        formId="departamento-form"
      >
        <Form id="departamento-form" onSubmit={salvarDepartamento}>
          {currentDepartamento ? (
            <input type="hidden" value={currentDepartamento.id} name="id" />
          ) : null}

          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome do departamento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome..."
              defaultValue={currentDepartamento?.nome}
              name="nome"
              required
            />
          </Form.Group>
        </Form>
      </ModalForm>
    </Container>
  );
}

export default DepartamentosPage;
