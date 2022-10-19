import { Alert, Card, Container } from "react-bootstrap";
import { useCategorias } from "../../context/CategoriasContext";
import { useDepartamentos } from "../../context/DepartamentosContext";
import { usePatrimonios } from '../../context/PatrimoniosContext'

function DashboardPage() {
    const { departamentos } = useDepartamentos();
    const { categorias } = useCategorias();
    const { patrimonios } = usePatrimonios();

    return (
        <Container className="mt-5 mb-2">
            <Alert variant='success'>
                <Alert.Heading>
                    Olá, Seja Bem-Vindo
                </Alert.Heading>

                Selecione a opção desejada no menu acima.
            </Alert>

            <div class="row">
                <div className="col-12 col-lg-4 mb-3">
                    <Card bg="dark" text="white">
                        <Card.Header>Departamentos</Card.Header>
                        <Card.Body>
                            <Card.Title>{departamentos.length}</Card.Title>
                            <Card.Text>
                                departamentos cadastrados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-12 col-lg-4 mb-3">
                    <Card bg="light" text="dark">
                        <Card.Header>Categorias</Card.Header>
                        <Card.Body>
                            <Card.Title>{categorias.length}</Card.Title>
                            <Card.Text>
                                categorias cadastrados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-12 col-lg-4 mb-3">
                    <Card bg="success" text="white">
                        <Card.Header>Patrimônios</Card.Header>
                        <Card.Body>
                            <Card.Title>{patrimonios.length}</Card.Title>
                            <Card.Text>
                                patrimônios cadastrados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
}

export default DashboardPage;