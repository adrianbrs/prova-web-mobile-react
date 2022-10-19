import { Button, Container, Form, Table } from "react-bootstrap";
import { useCategorias } from "../../context/CategoriasContext";
import ModalForm from "../../components/ModalForm";

function CategoriasPage() {
  const {
    categorias,
    novaCategoria,
    editarCategoria,
    showModal,
    handleCloseModal,
    salvarCategoria,
    excluirCategoria,
    currentCategoria,
  } = useCategorias();

  return (
    <Container className="mt-4">
      <h1>Cadastro de Categoria</h1>

      <Button variant="secondary" onClick={novaCategoria}>
        Novo
      </Button>

      <br />
      <br />

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
          {categorias.map((categoria: any) => {
            return (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nome}</td>
                <td>{categoria.auditoria.dataRegistro}</td>
                <td>{categoria.auditoria.dataUltEdicao || "-"}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => editarCategoria(categoria)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => excluirCategoria(categoria.id)}
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
        formId="categorias-form"
      >
        <Form id="categorias-form" onSubmit={salvarCategoria}>
          {currentCategoria ? (
            <input type="hidden" value={currentCategoria.id} name="id" />
          ) : null}

          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome da categoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome..."
              defaultValue={currentCategoria?.nome}
              name="nome"
              required
            />
          </Form.Group>
        </Form>
      </ModalForm>
    </Container>
  );
}

export default CategoriasPage;
