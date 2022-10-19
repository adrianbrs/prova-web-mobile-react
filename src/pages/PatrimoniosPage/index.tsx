import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { usePatrimonios } from "../../context/PatrimoniosContext";
import ModalForm from "../../components/ModalForm";
import { useDepartamentos } from "../../context/DepartamentosContext";
import { useCategorias } from "../../context/CategoriasContext";
import React, { Fragment, useCallback, useEffect, useState } from "react";

function PatrimoniosPage() {
  const {
    patrimonios,
    novoPatrimonio,
    editarPatrimonio,
    showModal,
    handleCloseModal,
    salvarPatrimonio,
    excluirPatrimonio,
    currentPatrimonio,
  } = usePatrimonios();

  const { departamentos } = useDepartamentos();
  const { categorias } = useCategorias();

  const [selectedCategorias, setSelectedCategorias] = useState<any[]>([]);

  useEffect(() => {
    setSelectedCategorias(
      currentPatrimonio?.categorias?.length
        ? currentPatrimonio?.categorias
        : [null]
    );
  }, [currentPatrimonio]);

  const idsCategoriasUsadas = new Set(
    selectedCategorias.filter((cat) => !!cat).map((cat) => cat.id)
  );
  const categoriasDisponiveis = categorias.filter(
    (cat: any) => !idsCategoriasUsadas.has(cat.id)
  );

  const hasSelection = selectedCategorias.filter((cat) => !!cat).length > 0;
  const canAddMore =
    hasSelection && selectedCategorias.length < categorias.length;

  const handleAddCategoria = useCallback(
    (index: number) => {
      if (!categoriasDisponiveis.length) {
        return;
      }
      const newSelection = selectedCategorias.slice();
      newSelection.splice(index, 0, null);
      setSelectedCategorias(newSelection);
    },
    [selectedCategorias, categoriasDisponiveis]
  );

  const handleRemoveCategoria = useCallback(
    (index: number) => {
      let newSelection = selectedCategorias.slice();

      if (selectedCategorias.length === 1) {
        newSelection = [null];
      } else {
        newSelection.splice(index, 1);
      }

      setSelectedCategorias(newSelection);
    },
    [selectedCategorias]
  );

  const handleSelection = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
      const id = event.target.value;
      const newSelection = selectedCategorias.slice();
      newSelection[index] = categorias.find(
        (cat: any) => String(cat.id) === String(id)
      );
      setSelectedCategorias(newSelection);
    },
    [selectedCategorias, categorias]
  );

  return (
    <Container className="mt-4">
      <h1>Cadastro de Patrimonio</h1>

      <Button variant="secondary" onClick={novoPatrimonio}>
        Novo
      </Button>

      <br />
      <br />

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
          {patrimonios.map((patrimonio: any) => {
            return (
              <tr key={patrimonio.id}>
                <td>{patrimonio.id}</td>
                <td>{patrimonio.nome}</td>
                <td>{patrimonio.status}</td>
                <td>{patrimonio.descricao}</td>
                <td>{patrimonio.preco}</td>
                <td>{patrimonio.departamento?.nome || "-"}</td>
                <td>
                  {patrimonio.categorias
                    ?.map((cat: any) => cat.nome)
                    .join(", ") || "-"}
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => editarPatrimonio(patrimonio)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => excluirPatrimonio(patrimonio.id)}
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
        formId="patrimonios-form"
      >
        <Form id="patrimonios-form" onSubmit={salvarPatrimonio}>
          {currentPatrimonio ? (
            <input type="hidden" value={currentPatrimonio.id} name="id" />
          ) : null}

          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome do patrimônio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome..."
              defaultValue={currentPatrimonio?.nome}
              name="nome"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descrição..."
              defaultValue={currentPatrimonio?.descricao}
              name="descricao"
              required
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="preco">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.0"
                  step={0.1}
                  min={0.0}
                  defaultValue={currentPatrimonio?.preco}
                  name="preco"
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="departamento">
                <Form.Label>Departamento</Form.Label>
                <Form.Select
                  aria-label="Departamento"
                  required
                  name="departamento"
                  defaultValue={currentPatrimonio?.departamento?.id}
                >
                  <option disabled>Escolha um departamento</option>

                  {(departamentos || []).map((dep: any) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <hr />

            <h5>Informe as Categorias</h5>

            <input
              type="hidden"
              name="categorias"
              value={JSON.stringify(
                selectedCategorias.filter((cat) => !!cat).map((cat) => cat.id)
              )}
            />

            <Form.Group className="mb-3" controlId="departamento">
              <Form.Label>Categorias</Form.Label>

              {selectedCategorias.map((selectedCat, i) => (
                <Fragment key={selectedCat?.id ?? i}>
                  <InputGroup className="mb-3">
                    <Form.Select
                      aria-label="Categoria"
                      defaultValue={selectedCat?.id ?? ""}
                      onChange={(event) => handleSelection(event, i)}
                    >
                      <option disabled></option>

                      {(categorias || []).map((cat: any) => (
                        <option
                          key={cat.id}
                          value={cat.id}
                          disabled={idsCategoriasUsadas.has(cat.id)}
                        >
                          {cat.nome}
                        </option>
                      ))}
                    </Form.Select>

                    <Button
                      disabled={!canAddMore}
                      onClick={() => handleAddCategoria(i)}
                    >
                      +
                    </Button>

                    <Button
                      disabled={!hasSelection}
                      onClick={() => handleRemoveCategoria(i)}
                    >
                      -
                    </Button>
                  </InputGroup>
                </Fragment>
              ))}
            </Form.Group>
          </Row>
        </Form>
      </ModalForm>
    </Container>
  );
}

export default PatrimoniosPage;
